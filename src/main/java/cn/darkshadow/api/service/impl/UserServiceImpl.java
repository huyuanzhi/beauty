package cn.darkshadow.api.service.impl;

import cn.darkshadow.commons.dao.BaseDao;
import cn.darkshadow.commons.service.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.darkshadow.api.dao.UserMapper;
import cn.darkshadow.api.domain.User;
import cn.darkshadow.api.service.UserService;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl extends BaseServiceImpl<User>
		implements UserService {

	@Autowired
	private UserMapper userDao;

	@Override
	protected BaseDao<User> getDao() {
		return userDao;
	}

	@Override
	public List<User> findAll() {
		return userDao.findAll();
	}

	@Override
	public User findOneByUsername(String username) {
		return userDao.findOneByUsername(username);
	}

	@Override
	public void changePassword(User user) {
		userDao.changePassword(user);
	}
}
