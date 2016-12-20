package cn.darkshadow.commons.service;

import java.io.Serializable;
import java.util.List;

public interface BaseService<T extends Serializable> {

    int deleteByPrimaryKey(String id);

    int insert(T record);

    T insertSelective(T record);

    T selectByPrimaryKey(String id);

    T updateByPrimaryKeySelective(T record);

    int updateByPrimaryKey(T record);
}
