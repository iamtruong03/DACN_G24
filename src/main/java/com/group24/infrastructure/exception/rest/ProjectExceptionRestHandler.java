package com.group24.infrastructure.exception.rest;

import com.group24.infrastructure.exception.ProjectExceptionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public abstract class ProjectExceptionRestHandler<Z extends Exception> extends ProjectExceptionHandler<ResponseEntity<?>, Z> {

    @Override
    protected ResponseEntity<?> wrap(Z ex) {
        return new ResponseEntity<>(wrapApi(ex), HttpStatus.BAD_REQUEST);
    }

    protected abstract Object wrapApi(Z ex);
    
}
