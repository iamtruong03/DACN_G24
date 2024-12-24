package com.group24.entities;

import com.group24.entities.base.PrimaryEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "cart")
@Getter
@Setter
public class Cart extends PrimaryEntity {

    @OneToOne
    @JoinColumn(name = "id_user",referencedColumnName = "id")
    private User user;

}
