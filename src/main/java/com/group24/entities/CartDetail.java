package com.group24.entities;

import com.group24.entities.base.PrimaryEntity;
import com.group24.infrastructure.contant.StatusCart;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "cart_detail")
@Getter
@Setter
public class CartDetail extends PrimaryEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cart",referencedColumnName = "id")
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "homestay_id", referencedColumnName = "id")
    private Homestay homestay;

    private StatusCart status;

    private Long startDate;

    private Long endDate;

}
