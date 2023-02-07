package com.apollo.enums;

public enum AppHttpCodeEnum {
    // 成功
    SUCCESS(200,"success"),
    // 登录
    NEED_LOGIN(401,"You need to log in and perform this operation"),
    NO_OPERATOR_AUTH(403,"Operation without Permission"),
    SYSTEM_ERROR(500,"error occurred"),
    USERNAME_EXIST(501,"The user name already exists"),
     PHONENUMBER_EXIST(502,"The mobile phone number already exists"),
    EMAIL_EXIST(503, "The mailbox already exists.\n"),
    REQUIRE_USERNAME(504, "The user name is required"),
    CONTENT_NOT_NULL(506, "Comment content cannot be empty"),
    FILE_TYPE_ERROR(507, "The file type is incorrect. Please upload the png file"),
    USERNAME_NOT_NULL(508, "The user name cannot be empty"),
    NICKNAME_NOT_NULL(509, "Nicknames cannot be empty"),
    PASSWORD_NOT_NULL(510, "The password cannot be empty"),
    EMAIL_NOT_NULL(511, "The mailbox cannot be empty"),
    NICKNAME_EXIST(512, "Nicknames already exist"),
    LOGIN_ERROR(505,"The user name or password is incorrect");
    int code;
    String msg;

    AppHttpCodeEnum(int code, String errorMessage){
        this.code = code;
        this.msg = errorMessage;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
