package com.group24.cors.homestayowner.model.reponse;

import org.springframework.beans.factory.annotation.Value;

public interface HomestayOwnerImgHomestayReponse {

    @Value("#{target.imgUrl}")
    String getImgUrl();

}
