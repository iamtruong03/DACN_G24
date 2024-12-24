package com.group24.entities;

import com.group24.entities.base.PrimaryEntity;
import com.group24.infrastructure.contant.EntityProperties;
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

import java.util.List;

@Entity
@Table(name = "comment")
@Getter
@Setter
public class Comment extends PrimaryEntity {

    @ManyToOne
    @JoinColumn(name = "homestay_id")
    @JsonIgnoreProperties("comment")
    private Homestay homestay;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Double point;

    @Column(length = EntityProperties.LENGTH_NOTE)
    @Nationalized
    private String comment;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ImgComment> images;

}
