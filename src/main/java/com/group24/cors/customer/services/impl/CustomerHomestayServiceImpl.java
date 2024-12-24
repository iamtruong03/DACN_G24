package com.group24.cors.customer.services.impl;

import com.group24.cors.common.base.PageableObject;
import com.group24.cors.customer.model.request.CustomerHomestayRequest;
import com.group24.cors.customer.repository.CustomerDetailHomestayRepository;
import com.group24.cors.customer.repository.CustomerHomestayRepository;
import com.group24.cors.customer.repository.CustomerLoginRepository;
import com.group24.cors.customer.services.CustomerHomestayService;
import com.group24.entities.DetailHomestay;
import com.group24.entities.Homestay;
import com.group24.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class CustomerHomestayServiceImpl implements CustomerHomestayService {

    @Autowired
    private CustomerHomestayRepository customerHomestayRepository;

    @Autowired
    private CustomerDetailHomestayRepository customerDetailHomestayRepository;

    @Autowired
    private CustomerLoginRepository customerLoginRepository;

    @Override
    public PageableObject<Homestay> getListHomestay(CustomerHomestayRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<Homestay> res = customerHomestayRepository.getAllHomestay(pageable);
        return new PageableObject<>(res);
    }

    @Override
    public Homestay getHomestayById(CustomerHomestayRequest request) {
        return customerHomestayRepository.findHomestayById(request.getHomestayId());
    }

    private List<String> getHomestayByConvenient(List<String> convenientHomestayList, List<Homestay> homestayList) {
        List<DetailHomestay> lists = new ArrayList<>();
        List<String> homestayIdList = new ArrayList<>();
        List<DetailHomestay> detailHomestayList = customerDetailHomestayRepository.findAll();
        if (convenientHomestayList == null || convenientHomestayList.isEmpty()) {
            return null;
        } else {
            for (DetailHomestay detailHomestay : detailHomestayList) {
                for (String convenientHomestay : convenientHomestayList) {
                    if (detailHomestay.getConvenientHomestay().getId().equals(convenientHomestay)) {
                        lists.add(detailHomestay);
                    }
                }
            }

            for (DetailHomestay detailHomestay : lists) {
                for (Homestay homestay : homestayList) {
                    if (detailHomestay.getHomestay().getId().equals(homestay.getId())) {
                        homestayIdList.add(homestay.getId());
                    }
                }
            }
            return homestayIdList;
        }
    }

    @Override
    public PageableObject<Homestay> findAllBetweenDate(CustomerHomestayRequest request) {
        List<Homestay> res = new ArrayList<>();
        List<Homestay> lists = customerHomestayRepository.findAllBetweenDate(request);
        Set<Homestay> uniqueHomestays = new HashSet<>();
        if (getHomestayByConvenient(request.getConvenientHomestayList(), lists) == null) {
            for (Homestay homestay : lists) {
                if ((homestay.getName().contains(request.getNameOrAddress()) || homestay.getAddress().contains(request.getNameOrAddress()))
                        && (homestay.getNumberPerson() >= request.getNumberPerson())
                        && (homestay.getRoomNumber() >= request.getRoomNumber())
                        && (homestay.getPrice().compareTo(request.getPriceMin()) > 0)
                        && (homestay.getPrice().compareTo(request.getPriceMax()) < 0)
                ) {
                    uniqueHomestays.add(homestay);
                }
            }
        } else {
            for (Homestay homestay : lists) {
                for (String homestayIdByConvenient : getHomestayByConvenient(request.getConvenientHomestayList(), lists))
                    if ((homestay.getName().contains(request.getNameOrAddress()) || homestay.getAddress().contains(request.getNameOrAddress()))
                            && (homestay.getNumberPerson() >= request.getNumberPerson())
                            && (homestay.getRoomNumber() >= request.getRoomNumber())
                            && (homestay.getId().equals(homestayIdByConvenient))
                            && (homestay.getPrice().compareTo(request.getPriceMin()) > 0)
                            && (homestay.getPrice().compareTo(request.getPriceMax()) < 0)
                    ) {
                        uniqueHomestays.add(homestay);
                    }
            }
        }
        res.addAll(uniqueHomestays);

        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), res.size());
        List<Homestay> res1 = res.subList(start, end);
        return new PageableObject<>(new PageImpl<>(res1, pageable, res.size()));
    }

    @Override
    public User getCustomerByToken(String token) {
        return customerLoginRepository.findUserByToken(token);
    }

    @Override
    public PageableObject<Homestay> searchHomestayByPromotion(CustomerHomestayRequest request) {
        List<Homestay> lists = customerHomestayRepository.findAllBetweenDate(request);
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), lists.size());
        List<Homestay> res1 = lists.subList(start, end);
        return new PageableObject<>(new PageImpl<>(res1, pageable, lists.size()));
    }
}

