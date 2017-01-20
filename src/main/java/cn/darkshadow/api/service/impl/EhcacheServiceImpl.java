package cn.darkshadow.api.service.impl;

import cn.darkshadow.api.service.EhcacheService;
import cn.darkshadow.commons.util.ObjectUtils;
import net.sf.ehcache.Cache;
import net.sf.ehcache.Element;
import org.springframework.stereotype.Service;

import javax.inject.Inject;

/**
 * @author: huyuanzhi
 * @version: 1.0
 * @date: 2017/1/19
 * @project: beauty
 * @packageName: cn.darkshadow.api.service.impl
 * @description: XXXXXX
 */
@Service
public class EhcacheServiceImpl implements EhcacheService {

    @Inject
    private Cache cache;

    @Override
    public <T> T get(String key) {
        try {
            if (null != cache && null != cache.get(key)) {
                return (T) cache.get(key).getObjectValue();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public <T> void set(String key, T value) {
        try {
            if (cache != null) {
                cache.put(new Element(key, value));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public <T> void set(String key, T value, int timeToLiveSeconds) {
        try {
            if (cache != null) {
                Element var4 = new Element(key, value);
                var4.setTimeToLive(timeToLiveSeconds);
                cache.put(var4);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public boolean remove(String key) {
        try {
            if (cache != null) {
                return cache.remove(key);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean removeAll() {
        try {
            if (cache != null) {
                cache.removeAll();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
