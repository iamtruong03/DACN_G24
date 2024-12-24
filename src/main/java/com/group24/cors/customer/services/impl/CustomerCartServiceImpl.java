package com.group24.cors.customer.services.impl;

import com.group24.cors.common.base.PageableObject;
import com.group24.cors.customer.model.request.CustomerBookingRequest;
import com.group24.cors.customer.model.request.CustomerCartRequest;
import com.group24.cors.customer.model.response.CustomerCartDetailResponse;
import com.group24.cors.customer.repository.CustomerCartDetailRepository;
import com.group24.cors.customer.repository.CustomerCartRepository;
import com.group24.cors.customer.repository.CustomerHomestayRepository;
import com.group24.cors.customer.services.CustomerCartService;
import com.group24.entities.Booking;
import com.group24.entities.Cart;
import com.group24.entities.CartDetail;
import com.group24.infrastructure.contant.StatusCart;
import com.group24.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CustomerCartServiceImpl implements CustomerCartService {

    @Autowired
    private CustomerCartRepository customerCartRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomerHomestayRepository homestayRepository;
    @Autowired
    private CustomerCartDetailRepository customerCartDetailRepository;

    @Override
    public PageableObject<CustomerCartDetailResponse> getAllHomestayInCart(CustomerCartRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<CustomerCartDetailResponse> res = customerCartDetailRepository.getAllHomestayInCart(pageable, request);
        return new PageableObject<>(res);
    }

    @Override
    public Cart addCart(CustomerCartRequest request) {
        Cart cart = customerCartRepository.findByUserId(request);
        if (cart == null) {
            Cart newCart = new Cart();
            newCart.setUser(userRepository.findById(request.getUserId()).get());
            customerCartRepository.save(newCart);

            CartDetail cartDetail = new CartDetail();
            cartDetail.setCart(newCart);
            cartDetail.setStartDate(request.getStartDate());
            cartDetail.setEndDate(request.getEndDate());
            cartDetail.setStatus(StatusCart.HOAT_DONG);
            cartDetail.setHomestay(homestayRepository.findById(request.getHomestayId()).get());
            customerCartDetailRepository.save(cartDetail);
        } else {
            List<CartDetail> cartDetailList = customerCartDetailRepository.listCartDetail(cart.getId());
            if (!cartDetailList.isEmpty()) {
                boolean check = false;
                for (CartDetail newCartDetail : cartDetailList) {
                    if (newCartDetail.getHomestay().getId().contains(request.getHomestayId())) {
                        CartDetail cartDetail = customerCartDetailRepository.findById(newCartDetail.getId()).get();
                        cartDetail.setEndDate(request.getEndDate());
                        cartDetail.setStartDate(request.getStartDate());
                        customerCartDetailRepository.save(cartDetail);
                        check = true;
                        break;
                    }
                }
                if (!check) {
                    CartDetail cartDetail = new CartDetail();
                    cartDetail.setCart(cart);
                    cartDetail.setStartDate(request.getStartDate());
                    cartDetail.setEndDate(request.getEndDate());
                    cartDetail.setStatus(StatusCart.HOAT_DONG);
                    cartDetail.setHomestay(homestayRepository.findById(request.getHomestayId()).get());
                    customerCartDetailRepository.save(cartDetail);
                }
            } else {
                CartDetail cartDetail = new CartDetail();
                cartDetail.setCart(cart);
                cartDetail.setStartDate(request.getStartDate());
                cartDetail.setEndDate(request.getEndDate());
                cartDetail.setStatus(StatusCart.HOAT_DONG);
                cartDetail.setHomestay(homestayRepository.findById(request.getHomestayId()).get());
                customerCartDetailRepository.save(cartDetail);
            }
        }
        return cart;
    }

    @Override
    public Boolean getOne(CustomerBookingRequest request) {
        List<Booking> listBooking = customerCartRepository.getOneBooking(request);
        if (listBooking.size() == 0) {
            return false;
        }
        return true;
    }

}
