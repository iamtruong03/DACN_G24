package com.group24.entities;

import com.group24.entities.base.PrimaryEntity;
import com.group24.infrastructure.contant.EntityProperties;
import com.group24.infrastructure.contant.StatusPromotion;
import com.group24.infrastructure.contant.TypePromotion;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.util.List;

@Entity
@Table(name = "promotion")
@Getter
@Setter
public class Promotion extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_NAME)
    @Nationalized
    private String name;

    private Long startDate;

    private Long endDate;

    private TypePromotion type;

    private Double value;

    private StatusPromotion statusPromotion;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private OwnerHomestay idOwnerHomestay;

    @OneToMany(mappedBy = "promotion", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("promotion")
    private List<Homestay> homestays;

}
