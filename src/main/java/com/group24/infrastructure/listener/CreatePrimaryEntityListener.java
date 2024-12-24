package com.group24.infrastructure.listener;

import com.group24.entities.base.PrimaryEntity;
import jakarta.persistence.PrePersist;

import java.util.UUID;

public class CreatePrimaryEntityListener {

    @PrePersist
    private void onCreate(PrimaryEntity entity){
        entity.setId(UUID.randomUUID().toString());
    }

}
