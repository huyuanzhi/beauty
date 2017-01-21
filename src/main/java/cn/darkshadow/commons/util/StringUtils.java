package cn.darkshadow.commons.util;

/**
 * @author: huyuanzhi
 * @version: 1.0
 * @date: 2017/1/21
 * @project: beauty
 * @packageName: cn.darkshadow.commons.util
 * @description: XXXXXX
 */
public class StringUtils {

    public static String unicode2String(String unicode) {
        StringBuffer string = new StringBuffer();

        String[] hex = unicode.split("\\\\u");

        for (int i = 1; i < hex.length; i++) {
            // 转换出每一个代码点
            int data = Integer.parseInt(hex[i], 16);
            // 追加成string
            string.append((char) data);
        }
        return string.toString();
    }

    /**
     * 字符串转换unicode
     */
    public static String string2Unicode(String string) {

        StringBuffer unicode = new StringBuffer();

        for (int i = 0; i < string.length(); i++) {
            // 取出每一个字符
            char c = string.charAt(i);
            // 转换为unicode
            unicode.append("\\u" + Integer.toHexString(c));
        }
        return unicode.toString();
    }
}
