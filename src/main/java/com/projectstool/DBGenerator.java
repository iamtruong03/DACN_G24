package com.projectstool;

import com.group24.entities.Admin;
import com.group24.entities.ApprovalHistory;
import com.group24.entities.Booking;
import com.group24.entities.Cart;
import com.group24.entities.CartDetail;
import com.group24.entities.Comment;
import com.group24.entities.ConvenientHomestay;
import com.group24.entities.ConvenientHomestayType;
import com.group24.entities.DetailHomestay;
import com.group24.entities.Homestay;
import com.group24.entities.ImgComment;
import com.group24.entities.ImgHomestay;
import com.group24.entities.ImgScenicSpot;
import com.group24.entities.OwnerHomestay;
import com.group24.entities.Promotion;
import com.group24.entities.ScenicSpot;
import com.group24.entities.ScenicSpotHomestay;
import com.group24.entities.User;
import com.group24.infrastructure.contant.Status;
import com.group24.infrastructure.contant.StatusBooking;
import com.group24.infrastructure.contant.StatusCart;
import com.group24.infrastructure.contant.TypePromotion;
import com.group24.infrastructure.contant.role.RoleAdmin;
import com.group24.infrastructure.contant.role.RoleCustomer;
import com.group24.infrastructure.contant.role.RoleOwner;
import com.group24.repositories.AdminRepository;
import com.group24.repositories.ApprovalHistoryRepository;
import com.group24.repositories.BookingRepository;
import com.group24.repositories.CartDetailRepository;
import com.group24.repositories.CartRepository;
import com.group24.repositories.CommentRepository;
import com.group24.repositories.ConvenientHomestayRepository;
import com.group24.repositories.ConvenientHomestayTypeRepository;
import com.group24.repositories.DetailHomestayRepository;
import com.group24.repositories.HomestayRepository;
import com.group24.repositories.ImgCommentRepository;
import com.group24.repositories.ImgHomestayRepository;
import com.group24.repositories.ImgScenicSpotRepository;
import com.group24.repositories.OwnerHomestayRepository;
import com.group24.repositories.PromotionRepository;
import com.group24.repositories.ScenicSpotHomestayRepository;
import com.group24.repositories.ScenicSpotRepository;
import com.group24.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.math.BigDecimal;

@SpringBootApplication
@EnableJpaRepositories(
        basePackages = "com.group24.repositories"
)
public class DBGenerator implements CommandLineRunner {

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private ConvenientHomestayRepository convenientHomestayRepository;
    @Autowired
    private ConvenientHomestayTypeRepository convenientHomestayTypeRepository;
    @Autowired
    private HomestayRepository homestayRepository;
    @Autowired
    private ImgCommentRepository imgCommentRepository;
    @Autowired
    private ImgHomestayRepository imgHomestayRepository;
    @Autowired
    private ImgScenicSpotRepository imgScenicSpotRepository;
    @Autowired
    private OwnerHomestayRepository ownerHomestayRepository;
    @Autowired
    private PromotionRepository promotionRepository;
    @Autowired
    private ScenicSpotRepository scenicSpotRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ScenicSpotHomestayRepository scenicSpotHomestayRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ApprovalHistoryRepository approvalHistoryRepository;
    @Autowired
    private DetailHomestayRepository detailHomestayRepository;
    @Autowired
    private CartDetailRepository cartDetailRepository;

    public void run(String... args) throws Exception {

        //scenic spot
        ScenicSpot scenicSpot1 = new ScenicSpot();
        scenicSpot1.setName("Quat Lam");
        scenicSpot1.setProvince("Nam Dinh");
        scenicSpot1.setRegion("Mien Bac");
        scenicSpotRepository.save(scenicSpot1);

        ScenicSpot scenicSpot2 = new ScenicSpot();
        scenicSpot2.setName("Ho Hoan Kiem");
        scenicSpot2.setProvince("Ha Noi");
        scenicSpot2.setRegion("Mien Bac");
        scenicSpotRepository.save(scenicSpot2);

        ScenicSpot scenicSpot3 = new ScenicSpot();
        scenicSpot3.setName("TP Ho Chi Minh");
        scenicSpot3.setProvince("TP Ho Chi Minh");
        scenicSpot3.setRegion("Mien Nam");
        scenicSpotRepository.save(scenicSpot3);

        //img scenic spot
        ImgScenicSpot imgScenicSpot1 = new ImgScenicSpot();
        imgScenicSpot1.setScenicSpot(scenicSpot1);
        imgScenicSpot1.setImgUrl("abcxyz");
        imgScenicSpotRepository.save(imgScenicSpot1);

        ImgScenicSpot imgScenicSpot2 = new ImgScenicSpot();
        imgScenicSpot2.setScenicSpot(scenicSpot1);
        imgScenicSpot2.setImgUrl("qwerty");
        imgScenicSpotRepository.save(imgScenicSpot2);

        ImgScenicSpot imgScenicSpot3 = new ImgScenicSpot();
        imgScenicSpot3.setScenicSpot(scenicSpot2);
        imgScenicSpot3.setImgUrl("abcxyz");
        imgScenicSpotRepository.save(imgScenicSpot3);

        //admin
        Admin admin1 = new Admin();
        admin1.setCode("AD01");
        admin1.setName("Tran Quang Huy");
        admin1.setEmail("huytq@gmail.com");
        admin1.setAddress("Lang son");
        admin1.setGender(true);
        admin1.setPhoneNumber("0123456777");
        admin1.setUsername("huytq@gmail.com");
        admin1.setPassword("12345678");
        admin1.setAvatarUrl("avcqeqw");
        admin1.setRole(RoleAdmin.ADMIN);
        adminRepository.save(admin1);

        Admin admin2 = new Admin();
        admin2.setCode("AD02");
        admin2.setName("Nguen Quoc Cuong");
        admin2.setEmail("cuongnq@gmail.com");
        admin2.setAddress("Lang son");
        admin2.setGender(true);
        admin2.setPhoneNumber("0123456333");
        admin2.setUsername("cuongnq@gmail.com");
        admin2.setPassword("12345678");
        admin2.setAvatarUrl("xyzjkl");
        admin2.setRole(RoleAdmin.ADMIN);
        adminRepository.save(admin2);

        //user
        User user1 = new User();
        user1.setCode("US01");
        user1.setName("Vuong Tien Sang");
        user1.setAddress("Ha Noi");
        user1.setGender(true);
        user1.setPhoneNumber("0123456789");
        user1.setEmail("sangvt@gmail.com");
        user1.setUsername("sangvt@gmail.com");
        user1.setPassword("12345678");
        user1.setRole(RoleCustomer.CUSTOMER);
        userRepository.save(user1);

        User user2 = new User();
        user2.setCode("US02");
        user2.setName("Vuong Tien Tuan");
        user2.setAddress("Ha Noi");
        user2.setGender(true);
        user2.setPhoneNumber("0987654321");
        user2.setEmail("tuanvt@gmail.com");
        user2.setUsername("tuanvt@gmail.com");
        user2.setPassword("12345678");
        user2.setRole(RoleCustomer.CUSTOMER);
        userRepository.save(user2);

        //owner homestay
        OwnerHomestay ownerHomestay1 = new OwnerHomestay();
        ownerHomestay1.setCode("OH01");
        ownerHomestay1.setName("Nguyen Quoc Cuong");
        ownerHomestay1.setPhoneNumber("0987654321");
        ownerHomestay1.setEmail("cuongnguyen@gmail.com");
        ownerHomestay1.setUsername("cuongnguyen.nd2015@gmail.com");
        ownerHomestay1.setPassword("12345678");
        ownerHomestay1.setGender(true);
        ownerHomestay1.setRole(RoleOwner.OWNER);
        ownerHomestayRepository.save(ownerHomestay1);

        OwnerHomestay ownerHomestay2 = new OwnerHomestay();
        ownerHomestay2.setCode("OH02");
        ownerHomestay2.setName("Nguyen Van Ly");
        ownerHomestay2.setPhoneNumber("0987654414");
        ownerHomestay2.setEmail("lynv@gmail.com");
        ownerHomestay2.setUsername("lynv@gmail.com");
        ownerHomestay2.setPassword("12345678");
        ownerHomestay2.setGender(false);
        ownerHomestay2.setRole(RoleOwner.OWNER);
        ownerHomestayRepository.save(ownerHomestay2);

        //promotion
        Promotion promotion1 = new Promotion();
        promotion1.setName("Chao mung ngay 20/10");
        promotion1.setType(TypePromotion.TIEN);
        promotion1.setValue(50000.0);
        promotionRepository.save(promotion1);

        //cart
        Cart cart1 = new Cart();
        cart1.setUser(user1);
        cartRepository.save(cart1);

        Cart cart2 = new Cart();
        cart2.setUser(user2);
        cartRepository.save(cart2);

        //homestay
        Homestay homestay1 = new Homestay();
        homestay1.setName("Fpoly Homestay");
        homestay1.setAddress("Đường Trịnh Văn Bô, Nam Từ Liêm, Hà Nội");
        homestay1.setPromotion(promotion1);
        homestay1.setStatus(Status.KHONG_HOAT_DONG);
        homestay1.setOwnerHomestay(ownerHomestay1);
        homestay1.setPoint(5.0);
        homestay1.setPrice(new BigDecimal(1200000));
        homestay1.setNumberPerson(10);
        homestay1.setRoomNumber(3);
        homestay1.setStartDate(1705251600000L);
        homestay1.setEndDate(1735578000000L);
        homestayRepository.save(homestay1);

        Homestay homestay2 = new Homestay();
        homestay2.setName("H2 homestay");
        homestay2.setAddress("số nhà 11 ngõ 465 Đường Hoàng Hoa Thám, Ba Đình, Hà Nội, Quận Ba Đình, Hà Nội");
        homestay2.setPromotion(promotion1);
        homestay2.setOwnerHomestay(ownerHomestay1);
        homestay2.setPoint(4.5);
        homestay2.setPrice(new BigDecimal(1500000));
        homestay2.setNumberPerson(12);
        homestay2.setStatus(Status.KHONG_HOAT_DONG);
        homestay2.setRoomNumber(2);
        homestay2.setStartDate(1705251600000L);
        homestay2.setEndDate(1735578000000L);
        homestayRepository.save(homestay2);

        Homestay homestay3 = new Homestay();
        homestay3.setName("Sweet Home Homestay");
        homestay3.setAddress("41 An Thượng 3, Đà Nẵng, Việt Nam");
        homestay3.setPromotion(promotion1);
        homestay3.setOwnerHomestay(ownerHomestay1);
        homestay3.setPoint(4.0);
        homestay3.setPrice(new BigDecimal(1000000));
        homestay3.setNumberPerson(8);
        homestay3.setStatus(Status.KHONG_HOAT_DONG);
        homestay3.setRoomNumber(4);
        homestay3.setStartDate(1705251600000L);
        homestay3.setEndDate(1735578000000L);
        homestayRepository.save(homestay3);

        Homestay homestay4 = new Homestay();
        homestay4.setName("Cozy Homestay");
        homestay4.setAddress("100 Cô Giang 21, Quận 1, TP.Hồ Chí Minh, Việt Nam");
        homestay4.setPromotion(promotion1);
        homestay4.setOwnerHomestay(ownerHomestay2);
        homestay4.setPoint(3.0);
        homestay4.setPrice(new BigDecimal(2000000));
        homestay4.setNumberPerson(12);
        homestay4.setStatus(Status.KHONG_HOAT_DONG);
        homestay4.setRoomNumber(2);
        homestay4.setStartDate(1705251600000L);
        homestay4.setEndDate(1735578000000L);
        homestayRepository.save(homestay4);

        Homestay homestay5 = new Homestay();
        homestay5.setName("Melissa Homestay Nha Trang");
        homestay5.setAddress("100A Trần Phú, Lộc Thọ, Nha Trang, Khánh Hòa, Việt Nam");
        homestay5.setPromotion(promotion1);
        homestay5.setOwnerHomestay(ownerHomestay2);
        homestay5.setPoint(3.9);
        homestay5.setPrice(new BigDecimal(800000));
        homestay5.setNumberPerson(10);
        homestay5.setStatus(Status.KHONG_HOAT_DONG);
        homestay5.setRoomNumber(5);
        homestay5.setStartDate(1705251600000L);
        homestay5.setEndDate(1735578000000L);
        homestayRepository.save(homestay5);

        //cart_detail
        CartDetail cartDetail1 = new CartDetail();
        cartDetail1.setCart(cart1);
        cartDetail1.setStatus(StatusCart.HOAT_DONG);
        cartDetail1.setHomestay(homestay1);
        cartDetail1.setStartDate(1706148473L);
        cartDetail1.setEndDate(1706321273L);
        cartDetailRepository.save(cartDetail1);

        CartDetail cartDetail2 = new CartDetail();
        cartDetail2.setCart(cart2);
        cartDetail2.setStatus(StatusCart.HOAT_DONG);
        cartDetail2.setHomestay(homestay4);
        cartDetail2.setStartDate(1706148473L);
        cartDetail2.setEndDate(1706321273L);
        cartDetailRepository.save(cartDetail2);

        //img Homestay
        ImgHomestay imgHomestay1 = new ImgHomestay();
        imgHomestay1.setImgUrl("xyzqeqr");
        imgHomestay1.setHomestay(homestay1);
        imgHomestayRepository.save(imgHomestay1);

        ImgHomestay imgHomestay2 = new ImgHomestay();
        imgHomestay2.setImgUrl("asdfgh");
        imgHomestay2.setHomestay(homestay2);
        imgHomestayRepository.save(imgHomestay2);

        ImgHomestay imgHomestay3 = new ImgHomestay();
        imgHomestay3.setImgUrl("qwertyu");
        imgHomestay3.setHomestay(homestay3);
        imgHomestayRepository.save(imgHomestay3);

        ImgHomestay imgHomestay4 = new ImgHomestay();
        imgHomestay4.setImgUrl("ghjklli");
        imgHomestay4.setHomestay(homestay4);
        imgHomestayRepository.save(imgHomestay4);

        ImgHomestay imgHomestay5 = new ImgHomestay();
        imgHomestay5.setImgUrl("ruiootpp");
        imgHomestay5.setHomestay(homestay5);
        imgHomestayRepository.save(imgHomestay5);

        //Scenic Spot Homestay
        ScenicSpotHomestay scenicSpotHomestay1 = new ScenicSpotHomestay();
        scenicSpotHomestay1.setScenicSpot(scenicSpot2);
        scenicSpotHomestay1.setHomestay(homestay1);
        scenicSpotHomestayRepository.save(scenicSpotHomestay1);

        ScenicSpotHomestay scenicSpotHomestay2 = new ScenicSpotHomestay();
        scenicSpotHomestay2.setScenicSpot(scenicSpot3);
        scenicSpotHomestay2.setHomestay(homestay4);
        scenicSpotHomestayRepository.save(scenicSpotHomestay2);

        //comment
        Comment comment1 = new Comment();
        comment1.setComment("Good");
        comment1.setUser(user1);
        comment1.setHomestay(homestay1);
        comment1.setPoint(4.0);
        commentRepository.save(comment1);

        Comment comment2 = new Comment();
        comment2.setComment("Very Good");
        comment2.setUser(user2);
        comment2.setHomestay(homestay1);
        comment2.setPoint(3.0);
        commentRepository.save(comment2);

        Comment comment3 = new Comment();
        comment3.setComment("Not ok");
        comment3.setUser(user1);
        comment3.setHomestay(homestay5);
        comment3.setPoint(4.8);
        commentRepository.save(comment3);

        Comment comment4 = new Comment();
        comment4.setComment("Good");
        comment4.setUser(user1);
        comment4.setHomestay(homestay3);
        comment4.setPoint(3.5);
        commentRepository.save(comment4);

        Comment comment5 = new Comment();
        comment5.setComment("Not Bad");
        comment5.setUser(user2);
        comment5.setHomestay(homestay4);
        comment5.setPoint(3.8);
        commentRepository.save(comment5);

        //img comment
        ImgComment imgComment1 = new ImgComment();
        imgComment1.setImgUrl("acbxaqwe");
        imgComment1.setComment(comment1);
        imgCommentRepository.save(imgComment1);

        //Convenient Homestay Type
        ConvenientHomestayType convenientHomestayType1 = new ConvenientHomestayType();
        convenientHomestayType1.setName("Type 1");
        convenientHomestayTypeRepository.save(convenientHomestayType1);

        ConvenientHomestayType convenientHomestayType2 = new ConvenientHomestayType();
        convenientHomestayType2.setName("Type 2");
        convenientHomestayTypeRepository.save(convenientHomestayType2);


        //Convenient homestay
        ConvenientHomestay convenientHomestay1 = new ConvenientHomestay();
        convenientHomestay1.setName("Wifi mien phi");
        convenientHomestay1.setConvenientHomestayType(convenientHomestayType1);
        convenientHomestayRepository.save(convenientHomestay1);

        ConvenientHomestay convenientHomestay4 = new ConvenientHomestay();
        convenientHomestay4.setName("Ho boi");
        convenientHomestay4.setConvenientHomestayType(convenientHomestayType1);
        convenientHomestayRepository.save(convenientHomestay4);

        ConvenientHomestay convenientHomestay5 = new ConvenientHomestay();
        convenientHomestay5.setName("Cho do xe");
        convenientHomestay5.setConvenientHomestayType(convenientHomestayType2);
        convenientHomestayRepository.save(convenientHomestay5);

        // detail homestay
        DetailHomestay detailHomestay1 = new DetailHomestay();
        detailHomestay1.setConvenientHomestay(convenientHomestay1);
        detailHomestay1.setHomestay(homestay1);
        detailHomestayRepository.save(detailHomestay1);

        DetailHomestay detailHomestay2 = new DetailHomestay();
        detailHomestay2.setConvenientHomestay(convenientHomestay1);
        detailHomestay2.setHomestay(homestay2);
        detailHomestayRepository.save(detailHomestay2);

        DetailHomestay detailHomestay3 = new DetailHomestay();
        detailHomestay3.setConvenientHomestay(convenientHomestay1);
        detailHomestay3.setHomestay(homestay3);
        detailHomestayRepository.save(detailHomestay3);

        DetailHomestay detailHomestay4 = new DetailHomestay();
        detailHomestay4.setConvenientHomestay(convenientHomestay1);
        detailHomestay4.setHomestay(homestay4);
        detailHomestayRepository.save(detailHomestay4);

        DetailHomestay detailHomestay5 = new DetailHomestay();
        detailHomestay5.setConvenientHomestay(convenientHomestay1);
        detailHomestay5.setHomestay(homestay5);
        detailHomestayRepository.save(detailHomestay5);

        DetailHomestay detailHomestay6 = new DetailHomestay();
        detailHomestay6.setConvenientHomestay(convenientHomestay4);
        detailHomestay6.setHomestay(homestay1);
        detailHomestayRepository.save(detailHomestay6);

        DetailHomestay detailHomestay7 = new DetailHomestay();
        detailHomestay7.setConvenientHomestay(convenientHomestay4);
        detailHomestay7.setHomestay(homestay2);
        detailHomestayRepository.save(detailHomestay7);

        DetailHomestay detailHomestay8 = new DetailHomestay();
        detailHomestay8.setConvenientHomestay(convenientHomestay5);
        detailHomestay8.setHomestay(homestay1);
        detailHomestayRepository.save(detailHomestay8);

        //booking
        Booking booking1 = new Booking();
        booking1.setUser(user1);
        booking1.setTotalPrice(new BigDecimal(1200000));
        booking1.setPromotion(promotion1);
        booking1.setHomestay(homestay1);
        booking1.setStartDate(1705716473L);
        booking1.setEndDate(1705975673L);
        booking1.setStatus(StatusBooking.THANH_CONG);
        bookingRepository.save(booking1);

        Booking booking2 = new Booking();
        booking2.setUser(user2);
        booking2.setTotalPrice(new BigDecimal(1200000));
        booking2.setHomestay(homestay2);
        booking2.setStatus(StatusBooking.THANH_CONG);
        booking2.setStartDate(1705198073L);
        booking2.setEndDate(1705543673L);
        bookingRepository.save(booking2);


        // approval history
        ApprovalHistory approvalHistory1 = new ApprovalHistory();
        approvalHistory1.setAdmin(admin1);
        approvalHistory1.setHomestay(homestay1);
        approvalHistoryRepository.save(approvalHistory1);

        ApprovalHistory approvalHistory2 = new ApprovalHistory();
        approvalHistory2.setAdmin(admin1);
        approvalHistory2.setHomestay(homestay2);
        approvalHistoryRepository.save(approvalHistory2);

        ApprovalHistory approvalHistory3 = new ApprovalHistory();
        approvalHistory3.setAdmin(admin1);
        approvalHistory3.setHomestay(homestay3);
        approvalHistoryRepository.save(approvalHistory3);

        ApprovalHistory approvalHistory4 = new ApprovalHistory();
        approvalHistory4.setAdmin(admin1);
        approvalHistory4.setHomestay(homestay4);
        approvalHistoryRepository.save(approvalHistory4);

        ApprovalHistory approvalHistory5 = new ApprovalHistory();
        approvalHistory5.setAdmin(admin1);
        approvalHistory5.setHomestay(homestay5);
        approvalHistoryRepository.save(approvalHistory5);
    }

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(DBGenerator.class);
        ctx.close();
    }

}