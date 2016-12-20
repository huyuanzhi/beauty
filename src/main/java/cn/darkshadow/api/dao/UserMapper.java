package cn.darkshadow.api.dao;

import cn.darkshadow.api.domain.User;
import cn.darkshadow.commons.dao.BaseDao;

import java.util.List;

public interface UserMapper extends BaseDao<User> {

    List<User> findAll();

    User findOneByUsername(String username);

    void changePassword(User user);
}