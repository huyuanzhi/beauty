package cn.darkshadow.api.service;

import cn.darkshadow.api.domain.User;
import cn.darkshadow.commons.service.BaseService;

import java.util.List;

public interface UserService extends BaseService<User> {

    List<User> findAll();

    User findOneByUsername(String username);

    void changePassword(User user);
}
