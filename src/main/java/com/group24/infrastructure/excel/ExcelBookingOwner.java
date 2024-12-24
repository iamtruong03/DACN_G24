package com.group24.infrastructure.excel;

import com.group24.entities.Booking;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class ExcelBookingOwner {
    private List<Booking> bookings;
    private XSSFWorkbook workbook;
    private XSSFSheet sheet;

    public ExcelBookingOwner(List<Booking> bookingList) {
        this.bookings = bookingList;
        workbook = new XSSFWorkbook();
    }


    private void writeHeader() {
        sheet = workbook.createSheet("Booking");
        Row row = sheet.createRow(0);
        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);
        createCell(row, 0, "Tên tài khoản", style);
        createCell(row, 1, "Tên homestay", style);
        createCell(row, 2, "Ngày đặt", style);
        createCell(row, 3, "Trạng thái", style);
        createCell(row, 4, "Email người đặt", style);
        createCell(row, 5, "Tên người đặt", style);
        createCell(row, 6, "Số điện thoại người đặt", style);
        createCell(row, 7, "Tổng tiền", style);
    }

    private void createCell(Row row, int columnCount, Object valueOfCell, CellStyle style) {
        sheet.autoSizeColumn(columnCount);
        Cell cell = row.createCell(columnCount);
        if (valueOfCell instanceof Integer) {
            cell.setCellValue((Integer) valueOfCell);
        } else if (valueOfCell instanceof Long) {
            cell.setCellValue((Long) valueOfCell);
        } else if (valueOfCell instanceof String) {
            cell.setCellValue((String) valueOfCell);
        } else {
            cell.setCellValue((Boolean) valueOfCell);
        }
        cell.setCellStyle(style);
    }

//    private void write() {
//        int rowCount = 1;
//        CellStyle style = workbook.createCellStyle();
//        XSSFFont font = workbook.createFont();
//        font.setFontHeight(14);
//        style.setFont(font);
//        for (Booking songs : bookings) {
//            Row row = sheet.createRow(rowCount++);
//            int columnCount = 0;
//            createCell(row, columnCount++, songs.getUser().getUsername(), style);
//            createCell(row, columnCount++, songs.getHomestay().getName(), style);
//            createCell(row,columnCount++,songs.getStatus(),style);
//            createCell(row,columnCount++,songs.getUser().get,style);
//            createCell(row,columnCount++,songs.getDownloadPermission(),style);
//            createCell(row,columnCount++,songs.getTimePlay(),style);
//        }
//    }
//    public byte[] generateExcelBytes() throws IOException {
//        writeHeader();
//        write();
//        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
//        workbook.write(byteArrayOutputStream);
//        workbook.close();
//
//        return byteArrayOutputStream.toByteArray();
//    }

}
