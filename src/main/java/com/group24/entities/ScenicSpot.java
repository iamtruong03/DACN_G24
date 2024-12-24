package com.group24.entities;


import com.group24.entities.base.PrimaryEntity;
import com.group24.infrastructure.contant.EntityProperties;
import com.group24.infrastructure.contant.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

@Entity
@Table(name = "scenic_spot")
@Getter
@Setter
public class ScenicSpot extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_NAME)
    @Nationalized
    private String name;

    @Column(length = EntityProperties.LENGTH_NOTE, name = "[desc]")
    @Nationalized
    private String desc;

    private Status status;

    @Nationalized
    private String province;

    @Nationalized
    private String region;

}
