package cn.darkshadow.config.ehcache;

import cn.darkshadow.api.service.impl.EhcacheServiceImpl;
import cn.darkshadow.config.mybatis.MybatisConfiguration;
import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.config.CacheConfiguration;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.bind.RelaxedPropertyResolver;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;

/**
 * @author: huyuanzhi
 * @version: 1.0
 * @date: 2017/1/19
 * @project: beauty
 * @packageName: cn.darkshadow.config.ehcache
 * @description: XXXXXX
 */
@org.springframework.context.annotation.Configuration
@AutoConfigureBefore({ EhcacheServiceImpl.class })
public class EhcacheConfiguration implements EnvironmentAware {

    private RelaxedPropertyResolver propertyResolver;
    private CacheManager cacheManager;

    private static Log logger = LogFactory.getLog(MybatisConfiguration.class);

    @Override
    public void setEnvironment(Environment environment) {
        this.cacheManager = CacheManager.create();
        this.propertyResolver = new RelaxedPropertyResolver(environment,
                "ehcache.");
    }

    @Bean
    public Cache cache(){
        CacheConfiguration config = new CacheConfiguration();
        try {
            config.setName(propertyResolver
                    .getProperty("name"));
            config.setMaxEntriesLocalHeap(Long.valueOf(propertyResolver
                    .getProperty("maxEntriesLocalHeap")));
            config.setOverflowToDisk(Boolean.valueOf(propertyResolver
                    .getProperty("overflowToDisk")));
            config.setEternal(Boolean.valueOf(propertyResolver
                    .getProperty("eternal")));
            config.setTimeToLiveSeconds(Long.valueOf(propertyResolver
                    .getProperty("timeToLiveSeconds")));
            config.setTimeToIdleSeconds(Long.valueOf(propertyResolver
                    .getProperty("timeToIdleSeconds")));
        }catch (Exception e){
            logger.error("Could not confiure ehcache cache");
        }
        Cache cache = new Cache(config);
        cacheManager.addCache(cache);
        return cache;
    }
}
