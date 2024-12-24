package com.group24.entities;

import com.group24.entities.base.PrimaryEntity;
import com.group24.infrastructure.contant.EntityProperties;
import com.group24.infrastructure.contant.Status;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "homestay")
@Getter
@Setter
public class Homestay extends PrimaryEntity {

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "promotion_id")
    @JsonIgnoreProperties("homestays")
    private Promotion promotion;

    @Nationalized
    private String address;

    @Nationalized
    private String timeCheckIn;

    @Nationalized
    private String timeCheckOut;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private OwnerHomestay ownerHomestay;

    @Column(length = EntityProperties.LENGTH_NAME)
    @Nationalized
    private String name;

    private Double point;

    private Double acreage;

    private Integer roomNumber;

    private Status status;

    private Long startDate;

    private Long endDate;

    private Double CancellationPolicy;

    @Column(length = EntityProperties.LENGTH_NOTE, name = "[desc]")
    @Nationalized
    private String desc;

    private BigDecimal price;

    private Integer numberPerson;

    @OneToMany(mappedBy = "homestay", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ImgHomestay> images;

    @OneToMany(mappedBy = "homestay", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<DetailHomestay> detailHomestays;

    @Nationalized
    private String email;

    @Nationalized
    private String phoneNumber;

    @OneToMany(mappedBy = "homestay", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("homestay")
    private List<Comment> comment;
}
