package cn.darkshadow.commons.dao;

import java.io.Serializable;

public interface BaseDao<T extends Serializable> {
    int deleteByPrimaryKey(String id);

    int insert(T record);

    T insertSelective(T record);

    T selectByPrimaryKey(String id);

    T updateByPrimaryKeySelective(T record);

    int updateByPrimaryKey(T record);
}
