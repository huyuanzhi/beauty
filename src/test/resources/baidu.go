package pan

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"net/http/cookiejar"
	"net/url"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"
)

type Baidu struct {
	client     *http.Client //保存百度网盘登录的cookie信息
	name       string       //用户
	pass       string       //密码
	code       string       //验证码
	token      string       //token
	authToken  string       //authtoken,登录时解除安全验证要用到
	pubKey     string       //加密密码的pubkey
	key        string       //加密密码的key
	codeString string       //如果不为空，表示需要验证码
	bdstoken   string       //在分享的时候需要用到 bdstoken
	Ltoken     string       //验证安全后，要获取cookie信息时要用到
	Lstr       string       //验证安全后，要获取cookie信息时要用到
	Nick       string       //获取用户昵称
}

//创建一个百度网盘实例
func NewBaidu() *Baidu {
	jar, err := cookiejar.New(nil)

	if err != nil {
		log.Println(err.Error())
	}

	//	proxy, err := url.Parse("http://127.0.0.1:9999")
	//	if err != nil {
	//		log.Println(err.Error())
	//	}

	return &Baidu{
		client: &http.Client{
			Jar: jar,
			//			Transport: &http.Transport{
			//				Proxy: http.ProxyURL(proxy),
			//			},
		},
	}
}

//设置账号
func (this *Baidu) SetName(name string) {
	this.name = name
}

//设置密码
func (this *Baidu) SetPass(pass string) {
	this.pass = pass
}

//设置验证码
func (this *Baidu) SetCode(code string) {
	this.code = code
}

//设置账号和密码
func (this *Baidu) SetNamePass(name string, pass string) {
	this.SetName(name)
	this.SetPass(pass)
}

func (this *Baidu) commonHeader(request *http.Request) {
	request.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36")
	request.Header.Set("Referer", "https://pan.baidu.com")
	request.Header.Set("Connection", "keep-alive")

}

func (this *Baidu) getHtmlWithoutCookie(urlStr string) (string, error) {
	request, err := http.NewRequest("GET", urlStr, nil)
	if err != nil {
		return "", err
	}
	request.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36")
	request.Header.Set("Connection", "keep-alive")

	jar, err := cookiejar.New(nil)
	if err != nil {
		return "", err
	}

	//	proxy, err := url.Parse("http://127.0.0.1:9999")
	//	if err != nil {
	//		log.Println(err.Error())
	//	}

	client := http.Client{
		Jar: jar,
		//		Transport: &http.Transport{
		//			Proxy: http.ProxyURL(proxy),
		//		},
	}
	res, err := client.Do(request)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()

	html, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return "", err
	}
	return string(html), nil
}

//获取网页源码，自动处理cookie信息
func (this *Baidu) getHtml(urlStr string) (string, error) {
	request, err := http.NewRequest("GET", urlStr, nil)
	if err != nil {
		return "", err
	}

	this.commonHeader(request)

	res, err := this.client.Do(request)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()

	html, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return "", err
	}
	return string(html), nil
}

//获取首页，获得基本的cookie信息
func (this *Baidu) getIndex() (err error) {
	_, err = this.getHtml("https://pan.baidu.com")
	return
}

//获取token
func (this *Baidu) getToken() (err error) {

	//获取token的地址
	tokenUrl := "https://passport.baidu.com/v2/api/?getapi&tpl=netdisk&subpro=netdisk_web&apiver=v3&tt=1474734220102&class=login&gid=7C8F771-9AEB-4286-B97C-2841FDA7E067&logintype=basicLogin&callback=bd__cbs__xxxsf"

	html, err := this.getHtml(tokenUrl)
	if err != nil {
		return
	}
	reg, err := regexp.Compile(`"token" : "(.*?)"`)
	if err != nil {
		return
	}

	token := reg.FindStringSubmatch(string(html))
	if token == nil {
		return errors.New("token获取失败")
	} else {
		this.token = token[1]
	}

	//获取codeString
	reg, err = regexp.Compile(`"codeString" : "(.*?)"`)
	if err != nil {
		return
	}

	codeString := reg.FindStringSubmatch(string(html))
	if token == nil {
		return errors.New("codeString获取失败")
	} else {
		this.codeString = codeString[1]
	}

	return nil
}

func (this *Baidu) NeedCode() bool {
	if this.codeString == "" {
		return false
	}
	return true
}

//直接返回验证码数据
func (this *Baidu) GetCodeImg() []byte {
	//

	codeImgUrl := "https://passport.baidu.com/cgi-bin/genimage?" + this.codeString
	request, err := http.NewRequest("GET", codeImgUrl, nil)
	if err != nil {
		return []byte("")
	}

	this.commonHeader(request)

	res, err := this.client.Do(request)
	if err != nil {
		return []byte("")
	}
	defer res.Body.Close()

	content, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return []byte("")
	}

	return content

}

//下载验证码图片到指定路径
func (this *Baidu) GetCodeImgToFile(path string) {
	//

	codeImgUrl := "https://passport.baidu.com/cgi-bin/genimage?" + this.codeString
	request, err := http.NewRequest("GET", codeImgUrl, nil)
	if err != nil {
		log.Println(err.Error())
	}

	this.commonHeader(request)

	res, err := this.client.Do(request)
	if err != nil {
		log.Println(err.Error())
	}
	defer res.Body.Close()
	f, err := os.Create(path)
	if err != nil {
		panic(err)
	}
	defer f.Close()
	io.Copy(f, res.Body)

}

//获取加密密码的key
func (this *Baidu) getPubKey() (err error) {
	keyUrl := "https://passport.baidu.com/v2/getpublickey?token=" + this.token + "&tpl=netdisk&subpro=netdisk_web&apiver=v3&tt=1474734231123&gid=7C8F771-9AEB-4286-B97C-2841FDA7E067&callback=bd__cbs__o0l6at"

	html, err := this.getHtml(keyUrl)

	if err != nil {
		return
	}

	reg, err := regexp.Compile(`"pubkey":'(.*?)',"key":'(.*?)'`)
	if err != nil {
		return
	}

	ms := reg.FindStringSubmatch(string(html))
	if ms == nil {
		return errors.New("获取pubkey和key失败")
	} else {
		this.pubKey = ms[1]
		this.key = ms[2]
		//转义\/  \n
		this.pubKey = strings.Replace(this.pubKey, `\/`, `/`, -1)
		this.pubKey = strings.Replace(this.pubKey, `\n`, "\n", -1)
	}

	return nil
}

//登录初始化操作，比如获取token，pubkey，验证码等
func (this *Baidu) LoginInit() (err error) {
	err = this.getIndex()
	if err != nil {
		return
	}

	err = this.getToken()
	if err != nil {
		return
	}

	err = this.getPubKey()
	if err != nil {
		return
	}

	return
}

/*
* 4 验证码错误
* 5 账号有异地登录检验，需要安全验证
* 6 账号或密码错误
* 7 密码错误次数过多，要求安全验证
* 8 百度账号不存在
* 9 获取认证信息失败
 */
func (this *Baidu) Login() (errno int, err error) {

	loginUrl := "https://passport.baidu.com/v2/api/?login"

	postData := &url.Values{
		//asdfasf
		"staticpage":      {"http://pan.baidu.com/res/static/thirdparty/pass_v3_jump.html"},
		"charset":         {"utf-8"},
		"token":           {this.token},
		"tpl":             {"netdisk"},
		"subpro":          {"netdisk_web"},
		"apiver":          {"v3"},
		"tt":              {fmt.Sprint(time.Now().UnixNano() / 1e6)},
		"codestring":      {this.codeString},
		"safeflg":         {"0"},
		"u":               {"http://pan.baidu.com/disk/home"},
		"isPhone":         {""},
		"detect":          {"1"},
		"gid":             {"B41EE9D-E95C-465C-8993-54D367414B3A"},
		"quick_user":      {"0"},
		"logintype":       {"basicLogin"},
		"logLoginType":    {"pc_loginBasic"},
		"idc":             {""},
		"loginmerge":      {"true"},
		"foreignusername": {""},
		"username":        {this.name},
		"password":        {this.encodePass([]byte(this.pass), []byte(this.pubKey))},
		"verifycode":      {this.code},
		"mem_pass":        {"on"},
		"rsakey":          {this.key},
		"crypttype":       {"12"},
		"ppui_logintime":  {"302722"},
		"countrycode":     {""},
		"callback":        {"parent.bd__pcbs__thto43"},
	}

	var err_no int
	err = func() (err error) {
		request, err := http.NewRequest("POST", loginUrl, strings.NewReader(postData.Encode()))

		this.commonHeader(request)
		request.Header.Set("Content-Type", "application/x-www-form-urlencoded")
		request.Header.Set("Origin", "https://pan.baidu.com/")
		request.Header.Set("Connection", "keep-alive")
		request.Header.Set("Upgrade-Insecure-Requests", "1")

		resp, err := this.client.Do(request)
		if err != nil {
			return
		}
		defer resp.Body.Close()

		html, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			return
		}

		//获取登录错误码
		reg, err := regexp.Compile(`err_no=([\-0-9]+)`)
		if err != nil {
			return
		}

		err_noStr := reg.FindStringSubmatch(string(html))
		if err_noStr == nil {
			return
		}

		err_no, err = strconv.Atoi(err_noStr[1])
		if err != nil {
			return
		}

		//账号存在风险，提示用户自己解封
		if err_no == 120021 {

			var reg *regexp.Regexp
			reg, err = regexp.Compile(`&authtoken=(.*?)&`)
			if err != nil {
				return
			}

			authToken := reg.FindStringSubmatch(string(html))
			if authToken == nil {
				err_no = -1
				err = errors.New("codeString获取失败")
				return
			}

			this.authToken = unescape(authToken[1])

			err = errors.New("您的帐号在异地登录，请先进行安全验证。")
			return

		} else if err_no == 120019 { //密码错误过多，要求验证
			err = errors.New("账号密码错误次数过多，请先进行安全验证。")
			return
		} else if err_no == 257 { //如果需要验证码,需要获取codestring，因为获取验证码需要这个值

			var reg *regexp.Regexp
			reg, err = regexp.Compile(`&codeString=(.*?)&`)
			if err != nil {
				return
			}

			codeString := reg.FindStringSubmatch(string(html))
			if codeString == nil {
				err_no = -1
				err = errors.New("codeString获取失败")
				return
			}

			this.codeString = codeString[1]

			err = errors.New("需要提供验证码")
			return
		} else if err_no == 6 {

			err = errors.New("验证码错误")
			return

		} else if err_no == 7 || err_no == 4 {

			err = errors.New("账号或密码错误")
			return
		} else if err_no == 2 {
			err = errors.New("百度账号不存在，请检查账号是否正确")
			return
		}

		//登录后获取百度网盘的cookie认证信息
		err = this.getAuth()
		if err != nil {
			err_no = 9
			return
		}

		err_no = 0

		return
	}()

	if err_no == 257 || err_no == 6 {
		errno = 4
		err = errors.New("验证码错误")
	} else if err_no == 120021 {
		//表示需要安全验证
		errno = 5

	} else if err_no == 7 || err_no == 4 {
		//表示账号或密码错误
		errno = 6

	} else if err_no == 120019 { //密码错误过多，要求验证
		errno = 7
	} else if err_no == 2 { //百度账号不存在
		errno = 8
	} else if err_no == 0 { //登录成功
		errno = 0
	} else {
		errno = err_no
		err = errors.New("未知错误,请联系管理员")
	}

	return
}

func (this *Baidu) getAuth() error {
	//urlStr := "https://pan.baidu.com/disk/home"

	urlStr := "https://passport.baidu.com/v3/login/api/auth/?return_type=3&tpl=netdisk&u=https%3A%2F%2Fpan.baidu.com%2Fdisk%2Fhome"

	content, err := this.getHtml(urlStr)
	if err != nil {
		return err
	}

	reg, err := regexp.Compile(`"bdstoken":"(.*?)"`)

	if err != nil {
		return err
	}

	bdstoken := reg.FindStringSubmatch(content)
	if bdstoken == nil {
		return errors.New("bdstoken获取失败")
	}

	this.bdstoken = bdstoken[1]

	//获取昵称

	reg, err = regexp.Compile(`initPrefetch\('.*?'.*?'(.*?)'`)

	if err != nil {
		return err
	}

	nick := reg.FindStringSubmatch(content)
	if nick == nil {
		return errors.New("昵称获取失败")
	}

	this.Nick = nick[1]

	return nil
}

/*
{"errno":'110000',
"msg":'',
"forgot":'http:\/\/passport.baidu.com\/?getpassappeal&tpl=&code=0f58ea1dff176b132e30f3fc94f0f0c53d40c7fd&bdToken=b450b1852db74e4a046c791dcfa854a5&from=verify',
"data":
{
	"mobile":'187******85',
	"email":'',
	"softtoken":'',
	"password":'',
	"original_mobile":'',
	"original_email":''
},
"countrycode":""}
*/
type vertifyInfoData struct {
	Mobile          string
	Email           string
	Softtoken       string
	Password        string
	Original_mobile string
	Original_email  string
}
type VertifyInfo struct {
	Errno       string
	Msg         string
	Forgot      string
	Data        vertifyInfoData
	countrycode string
}

//如果不需要发送验证信息，直接返回json数据
type VertifyInfoExt struct {
	Errno  int
	Errmsg string
}

//获取安全验证信息，获取使用手机验证，邮箱验证等信息
func (this *Baidu) VertifyGetApi() (info *VertifyInfo, err error) {

	if this.authToken == "" {
		info = nil
		err = errors.New("authToken不能为空")
		return
	}

	//https://passport.baidu.com/v2/sapi/authwidgetverify?authtoken=24d9LLgNL9ry3Mwz1%2Fa7DLSsRTOwNikrdE4r5xpnWDdAouoohOdwvc9nMn3gd4e5JGZF76GIlCZvfwey9bR3ZIEJFPeWxtCbfkBSi7YYJ%2FRn5gUsFVLMPy9CGVFz2DFSSjl7gk6cgzfAAFlo5vEpYlAfBbPOPh3SpLB%2FQWZp918Ss1DJPv%2FBwpBKZQtbmVqTSrd0G60tUrHxGCZkeoTDWKFqM4KWVEBy%2FF0z%2FPtNAJiLS8IyAGaKBxnfdsgfJ7KCT90av%2FW5sql4b74%2BbNR3kDltCt7yKoOzCPDoehHmqLDV0cHwdvSo4xog%2B6QKuqcDaggEruwaK%2B0TYZSo0dPjK4tosdA7f3o
	//&type=&jsonp=1&apiver=v3&verifychannel=&action=getapi&vcode=
	//&questionAndAnswer=&needsid=&rsakey=&countrycode=&subpro=netdisk_web&callback=bd__cbs__n0hoem HTTP/1.1
	params := &url.Values{
		"authtoken":         {this.authToken},
		"type":              {""},
		"jsonp":             {"1"},
		"apiver":            {"v3"},
		"verifychannel":     {""},
		"action":            {"getapi"},
		"vcode":             {""},
		"questionAndAnswer": {""},
		"needsid":           {""},
		"rsakey":            {""},
		"countrycode":       {""},
		"subpro":            {"netdisk_web"},
		"callback":          {"bd__cbs__n0hoem"},
	}

	getapiUrl := "https://passport.baidu.com/v2/sapi/authwidgetverify?" + params.Encode()

	html, err := this.getHtml(getapiUrl)
	if err != nil {
		return
	}

	reg, err := regexp.Compile(`\((.*?)\)`)
	if err != nil {
		return
	}

	strs := reg.FindStringSubmatch(html)
	if strs == nil {
		err = errors.New("没获取到对应的json数据")
		return
	}
	jsonStr := strs[1]
	//把json中的单引号替换成双引号
	jsonStr = strings.Replace(jsonStr, `'`, `"`, -1)

	var info1 VertifyInfo
	err = json.Unmarshal([]byte(jsonStr), &info1)
	if err != nil {
		return
	}

	info = &info1

	return

}

//https://passport.baidu.com/v2/sapi/authwidgetverify?authtoken=24d9LLgNL9ry3Mwz1%2Fa7DLSsRTOwNikrdE4r5xpnWDdAouoohOdwvc9nMn3gd4e5JGZF76GIlCZvfwey9bR3ZIEJFPeWxtCbfkBSi7YYJ%2FRn5gUsFVLMPy9CGVFz2DFSSjl7gk6cgzfAAFlo5vEpYlAfBbPOPh3SpLB%2FQWZp918Ss1DJPv%2FBwpBKZQtbmVqTSrd0G60tUrHxGCZkeoTDWKFqM4KWVEBy%2FF0z%2FPtNAJiLS8IyAGaKBxnfdsgfJ7KCT90av%2FW5sql4b74%2BbNR3kDltCt7yKoOzCPDoehHmqLDV0cHwdvSo4xog%2B6QKuqcDaggEruwaK%2B0TYZSo0dPjK4tosdA7f3o&type=mobile&jsonp=1&apiver=v3&verifychannel=&action=send&vcode=&questionAndAnswer=&needsid=&rsakey=&countrycode=&subpro=netdisk_web&callback=bd__cbs__naxbeo HTTP/1.1
//发送手机验证码
//tp 发送的验证码类型，如果为空，默认mobile类型，表示否送手机验证码
func (this *Baidu) VertifySend(tp string) (err error) {

	if this.authToken == "" {
		err = errors.New("authToken不能为空")
		return
	}

	if tp == "" {
		tp = "mobile"
	}

	params := &url.Values{
		"authtoken":         {this.authToken},
		"type":              {tp},
		"jsonp":             {"1"},
		"apiver":            {"v3"},
		"verifychannel":     {""},
		"action":            {"send"},
		"vcode":             {""},
		"questionAndAnswer": {""},
		"needsid":           {""},
		"rsakey":            {""},
		"countrycode":       {""},
		"subpro":            {"netdisk_web"},
		"callback":          {"bd__cbs__naxbeo"},
	}

	getapiUrl := "https://passport.baidu.com/v2/sapi/authwidgetverify?" + params.Encode()

	html, err := this.getHtml(getapiUrl)
	if err != nil {
		return
	}

	reg, err := regexp.Compile(`\((.*?)\)`)
	if err != nil {
		return
	}

	strs := reg.FindStringSubmatch(html)
	if strs == nil {
		err = errors.New("没获取到对应的json数据")
		return
	}
	jsonStr := strs[1]

	//把json中的单引号替换成双引号
	jsonStr = strings.Replace(jsonStr, `'`, `"`, -1)

	type T struct {
		Errno string `json:"errno" binding:"required"`
		Msg   string `json:"msg" binding:"required"`
	}

	var t T
	err = json.Unmarshal([]byte(jsonStr), &t)

	if err != nil {
		return
	}

	//如果发送失败
	if t.Errno != "110000" {
		err = errors.New(t.Msg)
		return
	}

	return

}

//检测安全验证码
// vcode用户收到的验证码
// ty 验证码类型 如 mobile email等
func (this *Baidu) VertifyCheck(ty, vcode string) (err error) {

	if this.authToken == "" {
		err = errors.New("authToken不能为空")
		return
	}

	params := &url.Values{
		"authtoken":         {this.authToken},
		"type":              {ty},
		"jsonp":             {"1"},
		"apiver":            {"v3"},
		"verifychannel":     {""},
		"action":            {"check"},
		"vcode":             {vcode},
		"questionAndAnswer": {""},
		"needsid":           {""},
		"rsakey":            {""},
		"countrycode":       {""},
		"subpro":            {"netdisk_web"},
		"callback":          {"bd__cbs__u441ac"},
	}

	getapiUrl := "https://passport.baidu.com/v2/sapi/authwidgetverify?" + params.Encode()

	html, err := this.getHtml(getapiUrl)
	if err != nil {
		return
	}

	//bd__cbs__u441ac({"errno":'110000',"msg":'',"authsid":''})

	reg, err := regexp.Compile(`\((.*?)\)`)
	if err != nil {
		return
	}

	strs := reg.FindStringSubmatch(html)
	if strs == nil {
		err = errors.New("没获取到对应的json数据")
		return
	}
	jsonStr := strs[1]

	//把json中的单引号替换成双引号
	jsonStr = strings.Replace(jsonStr, `'`, `"`, -1)

	type T struct {
		Errno string `json:"errno" binding:"required"`
		Msg   string `json:"msg" binding:"required"`
	}

	var t T
	err = json.Unmarshal([]byte(jsonStr), &t)

	if err != nil {
		return
	}

	//如果发送失败
	if t.Errno != "110000" {
		err = errors.New("验证码错误")
		return
	}

	//获取验证后的登录信息
	this.getVertifyAuth()
	this.getAuth()

	return

}

//获取解除安全验证之后的cookie信息
func (this *Baidu) getVertifyAuth() (err error) {

	if this.authToken == "" {
		err = errors.New("authToken不能为空")
		return
	}

	params := &url.Values{
		"u":        {"https://pan.baidu.com/disk/home"},
		"tpl":      {"netdisk"},
		"ltoken":   {""},
		"lstr":     {""},
		"apiver":   {"v3"},
		"callback": {"bd__cbs__bomevz"},
		"tt":       {fmt.Sprint(time.Now().UnixNano() / 1e6)},
	}

	getAuthUrl := "https://passport.baidu.com/v2/?loginproxy&" + params.Encode()

	_, err = this.getHtml(getAuthUrl)
	if err != nil {
		return
	}

	//本该验证是否获取cookie成功的，作者比较懒。。。就不写了

	return

}

//{"errno":0,"request_id":6903411998516071887,"shareid":299406549,"link":"https:\/\/pan.baidu.com\/share\/link?shareid=299406549&uk=1548454236","shorturl":"https:\/\/pan.baidu.com\/s\/1i4TIw6p","ctime":1477294814,"premis":false}

type BaiduUrlInfo struct {
	Errno      int    `json:"errno"`
	Request_id int64  `json:"request_id"`
	Shareid    int64  `json:"shareid"`
	Link       string `json:"link"`
	Shorturl   string `json:"shorturl"`
	Ctime      int32  `json:"ctime"`
	Premis     bool   `json:"premis"`
}

type BaiduPanInfo struct {
	Errno          int   `json:"errno"`
	Is_show_window int   `json:"is_show_window"`
	Total          int64 `json:"total"`
	Free           int64 `json:"free"`
	Request_id     int64 `json:"request_id"`
	Expire         bool  `json:"expire"`
	Used           int64 `json:"used"`
}

type BdItem struct {
	Local_mtime     int64  `json:"local_mtime"`
	Path            string `json:"path"`
	Server_mtime    int64  `json:"server_mtime"`
	Server_ctime    int64  `json:"server_ctime"`
	Isdir           int    `json:isdir`
	Server_filename string `json:"server_filename"`
	Fs_id           int64  `json:"fs_id"`
	Unlist          int    `json:"unlist"`
	Dir_empty       int    `json:"dir_empty"`
	Oper_id         int    `json:"oper_id"`
	Category        int    `json:"category"`
	Size            int64  `json:"size"`
}

type BdList struct {
	Errno    int      `json:"errno"`
	Has_more int      `json:"has_more"`
	List     []BdItem `json:"list"`
}

//获取文件列表
func (this *Baidu) List(path string, page, num int) (*BdList, error) {

	//默认第一页
	if page <= 0 {
		page = 1
	}

	//不让一次载入过多的文件
	if num <= 0 || num > 100 {
		num = 100
	}

	html, _ := this.getHtml("https://pan.baidu.com/api/list?dir=" + url.QueryEscape(path) + "&bdstoken=" + this.token + "&logid=&num=" + strconv.Itoa(num) + "&order=time&desc=1&clienttype=0&showempty=0&web=1&page=" + strconv.Itoa(page) + "&channel=chunlei&web=1&app_id=250528")

	dat := &BdList{}
	if err := json.Unmarshal([]byte(html), dat); err == nil {
		return dat, nil
	} else {
		return nil, err
	}
}

//获取网盘空间大小信息
func (this *Baidu) Quota() (*BaiduPanInfo, error) {
	urlStr := "https://pan.baidu.com/api/quota?checkexpire=1&checkfree=1&channel=chunlei&web=1&app_id=250528&bdstoken=" + this.token + "&logid=MTQ3NzIyMDczOTY5MjAuMTk4NzYyODc2Mjg3MjI2NDQ=&clienttype=0"

	html, err := this.getHtml(urlStr)
	if err != nil {
		return nil, err
	}

	bdInfo := &BaiduPanInfo{}

	err = json.Unmarshal([]byte(html), bdInfo)
	if err != nil {
		return nil, err
	}

	return bdInfo, nil

}

//分享链接,文件编号，分享文件密码
func (this *Baidu) Share(fs_ids []int64, pwd string) (*BaiduUrlInfo, error) {

	//如果不等于空，表示需要密码，就限制为4个字符
	if pwd != "" {
		if len(pwd) != 4 {
			return nil, errors.New("提取密码字符长度必须为4个字符")
		}
	}

	urlStr := "https://pan.baidu.com/share/set?channel=chunlei&clienttype=0&web=1&channel=chunlei&web=1&app_id=250528&bdstoken=" + this.bdstoken + "&logid=MTQ3NzIyMDczOTY5MjAuMTk4NzYyODc2Mjg3MjI2NDQ=&clienttype=0"

	//把文件数字编号列表转成字符列表
	fs_idstr := make([]string, 0, 10)

	for _, d := range fs_ids {
		fs_idstr = append(fs_idstr, strconv.FormatInt(d, 10))
	}

	postData := &url.Values{
		"fid_list":     {"[" + strings.Join(fs_idstr, ",") + "]"},
		"schannel":     {"0"},
		"channel_list": {"[]"},
	}

	//如果是生成带密码的链接
	if pwd != "" {
		postData.Set("schannel", "4")
		postData.Add("pwd", pwd)
	}

	request, err := http.NewRequest("POST", urlStr, strings.NewReader(postData.Encode()))

	this.commonHeader(request)
	request.Header.Set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
	request.Header.Set("X-Requested-With", "XMLHttpRequest")

	resp, err := this.client.Do(request)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	html, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	bdUrlInfo := &BaiduUrlInfo{}
	err = json.Unmarshal(html, bdUrlInfo)
	if err != nil {
		return nil, err
	}

	return bdUrlInfo, nil
}

//取消分享，shareid_list 分享后获取到的id号列表
func (this *Baidu) CancelShare(shareid_list []int64) {
	urlStr := "https://pan.baidu.com/share/cancel?bdstoken=" + this.bdstoken + "&channel=chunlei&clienttype=0&web=1&app_id=250528&logid=MTQ3NzMwNDg3NzgxNzAuNzA5ODM0NTc0Mzc2MDc5OQ=="

	//把文件数字编号列表转成字符列表
	shareid_list_str := make([]string, 0, 10)

	for _, d := range shareid_list {
		shareid_list_str = append(shareid_list_str, strconv.FormatInt(d, 10))
	}
	postData := &url.Values{
		"shareid_list": {"[" + strings.Join(shareid_list_str, ",") + "]"},
		"type":         {"1"},
	}

	request, err := http.NewRequest("POST", urlStr, strings.NewReader(postData.Encode()))

	this.commonHeader(request)
	request.Header.Set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
	request.Header.Set("X-Requested-With", "XMLHttpRequest")

	resp, err := this.client.Do(request)
	if err != nil {
		return
	}
	defer resp.Body.Close()

	_, err = ioutil.ReadAll(resp.Body)
	if err != nil {
		return
	}
}

//根据关键词查询, 返回文件列表信息和错误信息
func (this *Baidu) Search(key string, page int, num int) (*BdList, error) {

	//默认第一页
	if page <= 0 {
		page = 1
	}

	//不让一次载入过多的文件
	if num <= 0 || num > 100 {
		num = 100
	}

	searchUrl := "https://pan.baidu.com/api/search?recursion=1&order=time&desc=1&showempty=0&web=1&page=" + strconv.Itoa(page) + "&num=" + strconv.Itoa(num) + "&key=" + key + "&t=0.9965368690407208&channel=chunlei&web=1&app_id=250528&bdstoken=" + this.bdstoken + "&logid=MTQ3NzMwNTc4OTE5OTAuMzA5NTI1ODU3NzMzNTI2MDM=&clienttype=0"
	html, err := this.getHtml(searchUrl)
	if err != nil {
		return nil, err
	}

	bdList := &BdList{}
	err = json.Unmarshal([]byte(html), bdList)
	if err != nil {
		return nil, err
	}

	return bdList, nil
}

//判断分享链接是否有效
func (this *Baidu) CheckShareUrl(url string) (err error) {
	html, err := this.getHtmlWithoutCookie(url)

	if err != nil {
		return
	}

	fmt.Println(html)

	pos := strings.Index(html, "share_nofound_des")
	if pos != -1 {
		err = errors.New("链接已失效")
	}
	return
}
