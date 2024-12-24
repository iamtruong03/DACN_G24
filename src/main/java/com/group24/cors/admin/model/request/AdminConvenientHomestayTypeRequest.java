package com.group24.cors.admin.model.request;

import com.group24.cors.common.base.PageableRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminConvenientHomestayTypeRequest extends PageableRequest {

    String id;

    String nameType;

    String descType;

}
