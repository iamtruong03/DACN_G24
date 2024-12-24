package com.group24.entities;

import com.group24.entities.base.PrimaryEntity;
import com.group24.infrastructure.contant.StatusApproval;
import com.group24.infrastructure.contant.EntityProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

@Entity
@Table(name = "approval_history")
@Getter
@Setter
public class ApprovalHistory extends PrimaryEntity {

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;

    @ManyToOne
    @JoinColumn(name = "homestay_id")
    private Homestay homestay;

    @Column(length = EntityProperties.LENGTH_NOTE, name = "[desc]")
    @Nationalized
    private String desc;

    private StatusApproval status;

}
