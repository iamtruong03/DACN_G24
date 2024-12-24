package com.group24.entities;

import com.group24.entities.base.PrimaryEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

@Entity
@Table(name = "img_homestay")
@Getter
@Setter
public class ImgHomestay extends PrimaryEntity {

    @ManyToOne
    @JoinColumn(name = "homestay_id")
    @JsonBackReference
    private Homestay homestay;

    @Nationalized
    private String imgUrl;

}
