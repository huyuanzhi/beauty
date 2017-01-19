package cn.darkshadow.api.service;

/**
 * @author: huyuanzhi
 * @version: 1.0
 * @date: 2017/1/19
 * @project: beauty
 * @packageName: cn.darkshadow.api.service
 * @description: XXXXXX
 */
public interface EhcacheService {

    <T> T get(String key);

    <T> void set(String key,T value);

    <T> void set(String key,T value,int timeToLiveSeconds);

    boolean remove(String key);

    boolean removeAll();
}
