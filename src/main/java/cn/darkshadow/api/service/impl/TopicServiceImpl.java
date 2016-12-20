package cn.darkshadow.api.service.impl;

import cn.darkshadow.api.dao.TopicMapper;
import cn.darkshadow.api.domain.Topic;
import cn.darkshadow.api.service.TopicService;
import cn.darkshadow.commons.dao.BaseDao;
import cn.darkshadow.commons.service.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * @author: huyuanzhi
 * @version: 1.0
 * @date: 2016/12/1
 * @project: beauty
 * @packageName: cn.darkshadow.api.service.impl
 * @description: XXXXXX
 */
@Service
@Transactional
public class TopicServiceImpl extends BaseServiceImpl<Topic> implements TopicService {

    @Autowired
    private TopicMapper topicDao;
    @Override
    protected BaseDao<Topic> getDao() {
        return topicDao;
    }
}
