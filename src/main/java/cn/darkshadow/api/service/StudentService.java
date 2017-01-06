package cn.darkshadow.api.service;

import cn.darkshadow.api.domain.Student;
import cn.darkshadow.commons.service.BaseService;

import java.util.List;
import java.util.Map;

/**
 * @author: huyuanzhi
 * @version: 1.0
 * @date: 2017/1/6
 * @project: beauty
 * @packageName: cn.darkshadow.api.service
 * @description: XXXXXX
 */
public interface StudentService extends BaseService<Student> {

    List<Student> findAll();


    void batchSave(List<Student> dataList);
}
