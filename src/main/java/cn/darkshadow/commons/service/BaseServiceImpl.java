package cn.darkshadow.commons.service;

import cn.darkshadow.commons.util.IdGen;
import cn.darkshadow.commons.dao.BaseDao;
import cn.darkshadow.commons.domain.AbstractEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

@Transactional
public abstract class BaseServiceImpl<T extends AbstractEntity>
		implements BaseService<T> {

	protected abstract BaseDao<T> getDao();

	@Override
	public int deleteByPrimaryKey(String id) {
		Assert.notNull(id);
		return getDao().deleteByPrimaryKey(id);
	}

	@Override
	public int insert(T record) {
		Assert.notNull(record);
		String id = record.getId()==null? IdGen.uuid():record.getId();
		record.setId(id);
		return getDao().insert(record);
	}

	@Override
	public T insertSelective(T record) {
		insert(record);
		return record;
	}

	@Override
	public T selectByPrimaryKey(String id) {
		Assert.notNull(id);
		return getDao().selectByPrimaryKey(id);
	}

	@Override
	public T updateByPrimaryKeySelective(T record) {
		updateByPrimaryKey(record);
		return getDao().selectByPrimaryKey(record.getId());
	}

	@Override
	public int updateByPrimaryKey(T record) {
		Assert.notNull(record);
		return getDao().updateByPrimaryKey(record);
	}
}
