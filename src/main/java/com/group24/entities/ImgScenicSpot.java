package com.group24.entities;

import com.group24.entities.base.PrimaryEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

@Entity
@Table(name = "img_scenic_spot")
@Getter
@Setter
public class ImgScenicSpot extends PrimaryEntity {

    @Nationalized
    private String imgUrl;

    @ManyToOne
    @JoinColumn(name = "scenicspot_id")
    private ScenicSpot scenicSpot;

}

