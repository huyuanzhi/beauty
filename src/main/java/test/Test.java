package test;

import cn.darkshadow.Application;
import cn.darkshadow.api.domain.Student;
import cn.darkshadow.api.service.StudentService;
import cn.darkshadow.commons.util.IdGen;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
public class Test {

    @Autowired
    private StudentService studentService;


    public void findAll() {
        List students = studentService.findAll();
    }

    public static void main(String[] args) {
        String id = IdGen.uuid();
        System.out.println(id);
    }

    @org.junit.Test
    public void into() throws Exception {
        long begin = System.currentTimeMillis();
        List<String> fileList = new ArrayList();
        loadAllFiles("E:/学校数据", fileList);
        System.out.println(fileList.size());
        List<Student> dataList = new ArrayList<>();
        for (String p : fileList) {
            readExcel(p, dataList);
        }
        long future = System.currentTimeMillis();
        System.out.println("读取数据总量" + dataList.size() + ",耗时：" + (future - begin) / 1000 + "s");
        System.out.println(dataList.size());
        int length = dataList.size();
        int pageSize = 500;
        int page = (length / pageSize);
        for (int i = 0; i <= page; i++) {
            if (i == page) {
                studentService.batchSave(dataList.subList(i * pageSize, length));
            } else {
                studentService.batchSave(dataList.subList(i * pageSize, (i + 1) * pageSize));
            }
        }
    }

    public static List<Map> readExcel(String path, List list) throws Exception {
        Workbook workbook = getWorkbook(path);
        if (workbook != null) {
            for (int sheet = 0; sheet < workbook.getNumberOfSheets(); sheet++) {
                Sheet s = workbook.getSheetAt(sheet);
                if (s == null || s.getLastRowNum() == 0) {
                    continue;
                }
                boolean flag = false;
                int startRow = 0;
                for (int rowNum = 0; rowNum <= 5; rowNum++) {
                    Row row = s.getRow(rowNum);
                    if (row != null) {
                        for (int i = 0; i < row.getLastCellNum(); i++) {
                            Cell temp = row.getCell(i);
                            if (getValue(temp).contains("姓名") || getValue(temp).contains("身份证")) {
                                flag = true;
                                startRow = rowNum + 1;
                                break;
                            }
                        }
                    }
                    if (flag) {
                        break;
                    }
                }
                if (!flag) {
                    System.out.println("文件路径：" + path + "sheet:" + sheet);
                    return list;
                }
                Row beginRow = s.getRow(startRow - 1);
                int nameCell = 0, noCell = 0, cardCell = 0, sexCell = 0, claCell = 0;
                for (int i = 0; i < beginRow.getLastCellNum(); i++) {
                    Cell propertyCell = beginRow.getCell(i);
                    if (getValue(propertyCell).contains("姓名")) {
                        nameCell = i;
                    } else if (getValue(propertyCell).contains("身份证")) {
                        cardCell = i;
                    } else if (getValue(propertyCell).contains("性")) {
                        sexCell = i;
                    } else if (getValue(propertyCell).contains("学籍")) {
                        noCell = i;
                    } else if (getValue(propertyCell).contains("级")) {
                        claCell = i;
                    }
                }
                Student stu;
                for (int rowNum = startRow; rowNum <= s.getLastRowNum(); rowNum++) {
                    Row row = s.getRow(rowNum);
                    if (row != null) {
                        Cell name = row.getCell(nameCell);
                        Cell no = row.getCell(noCell);
                        Cell cardId = row.getCell(cardCell);
                        Cell sex = row.getCell(sexCell);
                        Cell cla = row.getCell(claCell);
                        stu = new Student();
                        stu.setStudentId(IdGen.uuid());
                        stu.setStuName(getValue(name));
                        stu.setXueJiFuHao(getValue(no));
                        stu.setStuCardId(getValue(cardId));
                        stu.setSex(getValue(sex));
                        stu.setClassName(getValue(cla));
                        list.add(stu);
                    }
                }
            }
        }
        return list;
    }

    public static Workbook getWorkbook(String path) throws Exception {
        Workbook workbook = null;
        InputStream is = new FileInputStream(path);
        if (path.endsWith("xls")) {
            workbook = new HSSFWorkbook(is);
        }
        if (path.endsWith("xlsx")) {
            workbook = new XSSFWorkbook(is);
        }
        return workbook;
    }


    private static String getValue(Cell cell) {
        if (cell == null) {
            return "";
        }
        switch (cell.getCellTypeEnum()) {
            case _NONE:
                return "";
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case NUMERIC:
                return String.valueOf(cell.getNumericCellValue());
            case FORMULA:
                return String.valueOf(cell.getCellFormula());
            case STRING:
                return String.valueOf(cell.getStringCellValue());
            case BLANK:
                return "";
            default:
                return String.valueOf(cell.getStringCellValue());
        }
    }

    public static void loadAllFiles(String path, List fileList) throws Exception {
        File root = new File(path);
        File[] leaf = root.listFiles();
        for (File f : leaf) {
            if (f.isDirectory()) {
                loadAllFiles(f.getCanonicalPath(), fileList);
            }
            if (f.isFile()) {
                fileList.add(f.getCanonicalPath());
            }
        }
    }
}
