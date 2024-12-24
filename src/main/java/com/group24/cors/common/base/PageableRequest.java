package com.group24.cors.common.base;

import com.group24.infrastructure.contant.PaginationContant;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class PageableRequest {

    private int page = PaginationContant.DEFAULT_PAGE;
    private int size = PaginationContant.DEFAULT_SIZE;

}
