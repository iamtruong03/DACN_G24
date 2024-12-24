package com.group24.infrastructure.contant;

public enum Message {

    SUCCESS("Success"),
    NOT_EXISTS("Không tồn tại"),
    NAME_EXISTS("Tên đã tồn tại"),
    PAYMENT_ERROR("Thanh toán thất bại"),
    NOT_PAYMENT("Không thể tiếp tục thanh toán");

    private String message;

    Message(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
