import React from 'react';
import './footeruser.css';
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon
} from 'mdb-react-ui-kit';
import {
  FacebookOutlined,
  TwitterOutlined,
  GoogleOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  GithubOutlined,
  PhoneFilled
} from '@ant-design/icons';
import logotravel from '../../assets/svg/Rectangle 16.svg';
import logovnpay from '../../assets/svg/Rectangle 20.svg';
import logoPaypal from '../../assets/img/PAYPAL.jpg';

export default function FooterUser() {
  return (
    <MDBFooter style={{ backgroundColor: 'white', overflowX: 'hidden', width: '100%' }}>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom' style={{ overflowY: 'hidden' }}></section>
      <div class='ff'>
        <br />
        <br />
        <div class='row'>
          <div class='col-4'>
            <MDBIcon icon='gem' className='me-3' />
            <img
              src='https://res.cloudinary.com/dcwkiozwf/image/upload/v1700721918/homestay_images/lebvlnajzlmrpxxjps8i.png'
              alt=''
              style={{ with: '100px', height: '100px' }}
            />
          </div>

          <div class='col-4'>
            <h3>KẾT NỐI VỚI CHÚNG TÔI</h3>
            <p>
              <PhoneFilled style={{ fontSize: '24px' }} /> : 0865069125
            </p>
            <p>
              <FacebookOutlined style={{ fontSize: '24px' }} /> :
              https://www.facebook.com/
            </p>
          </div>
          <div class='col-4'>
            <h3>© TravelVivu2023</h3>
            <div>
              <a href='' className='me-4 text-reset'>
                <FacebookOutlined style={{ fontSize: '24px' }} />
              </a>
              <a href='' className='me-4 text-reset'>
                <TwitterOutlined style={{ fontSize: '24px' }} />
              </a>
              <a href='' className='me-4 text-reset'>
                <GoogleOutlined style={{ fontSize: '24px' }} />
              </a>
              <a href='' className='me-4 text-reset'>
                <InstagramOutlined style={{ fontSize: '24px' }} />
              </a>
              <a href='' className='me-4 text-reset'>
                <LinkedinOutlined style={{ fontSize: '24px' }} />
              </a>
              <a href='' className='me-4 text-reset'>
                <GithubOutlined style={{ fontSize: '24px' }} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class='footer'>
        <div class='footer1'>
          <div class='row'>
            <div class='col-3'>
              <div class='col3'>
                <h1 class='lzd-footer-title'>
                  TravelVivu - NỀN TẢNG ĐẶT PHÒNG TRỰC TUYẾN UY TÍN TẠI VIỆT NAM
                </h1>
                <span>
                  TravelVivu là nền tảng thương mại điện tử đang và tiếp tục
                  phát triển để thúc đẩy sự phát triển tại khu vực thông qua
                  Thương mại &amp; Công nghệ. Hiện nay, với nền tảng logistics
                  và hệ thống thanh toán lớn nhất khu vực, TravelVivu trở thành
                  một phần trong đời sống của người tiêu dùng và hướng đến mục
                  tiêu phục vụ cho mọi khách hàng trên toàn khu vực Đông Nam Á
                  vào năm 2035.
                </span>
                <p>
                  <span>
                    Tại Việt Nam, TravelVivu mong muốn trong tương lai sẽ là nền
                    tảng Thương mại điện tử quen thuộc của hàng triệu người tiêu
                    dùng bởi sự đa dạng hàng đầu về chủng loại sản phẩm, ứng
                    dụng công nghệ mua sắm và giải trí thông minh cùng khả năng
                    logistics.
                  </span>
                </p>
              </div>
            </div>
            <div class='col-3'>
              <div class='col3'>
                <span>
                  mạnh mẽ về dịch vụ chăm sóc khách hàng tối ưu. Đáng chú ý, bên
                  cạnh các chương trình ưu đãi trực tuyến hấp dẫn hàng tháng hấp
                  dẫn thường xuyên, TravelVivu Việt Nam còn thu hút người dùng
                  với các sự kiện săn sale siêu lớn trong năm, đây được xem là
                  các thời điểm đặt phòng không thể bỏ lỡ của các tín đồ đi du
                  lục và nghỉ dưỡng trên toàn quốc.
                  <br />
                  Hãy truy cập website hoặc tải ngay ứng dụng Lazada để gia tăng
                  thêm nhiều trải nghiệm độc đáo cho hành trình mua sắm - giải
                  trí tuyệt vời và siêu tiết kiệm ngay hôm nay!
                </span>
                <br />
                <h1 class='bm'>Mong muốn tương lai</h1>
                <p>
                  <span>
                    Mong muốn vươn tới xa hơn để mọi người dùng tận hưởng tốt và
                    tin tưởng trang web
                  </span>
                </p>
              </div>
            </div>
            <div class='col-3'>
              <div class='col3'>
                <h1 class='lzd-footer-title'>
                  Các khu vực nổi bật và có địa điểm du lịch đẹp đáng để đi
                </h1>
                <h4>
                  <a href='../App.js'>Hà Nội</a>
                </h4>
                <p>
                  <span>
                    Hồ tây, hồ gươm, lăng bác, phố cổ, bảo tàng quân đội việt
                    nam ,...
                  </span>
                </p>
                <h4>
                  <a href='../App.js'>Hồ Chí Minh</a>
                </h4>
                <p>
                  <span>
                    Khu di tích lịch sử Địa đạo Củ Chi, Nhà thờ Đức Bà Sài Gòn,
                    Dinh Độc Lập, Bảo tàng Lịch sử Thành phố Hồ Chí Minh, Chợ
                    Bến Thành,...
                  </span>
                </p>
                <h4>
                  <a href='../App.js'>Sapa</a>
                </h4>
                <p>
                  <span>
                    Cát Cát, nhà thờ đá Sapa, thác bạc, chơj tình Sapa, Swing
                    SaPa, Ham Rong Mountain, Phan Xi Păng, Tu Viện Cổ Tả
                    Phìn,...
                  </span>
                </p>
                <h4>
                  <a href='../App.js'>Hội An</a>
                </h4>
                <p>
                  <span>
                    Chợ hội an, Cù lao tràng, làng gốm thanh hóa, đảo kí ức hội
                    an, bãi biển Cửa Đại,...
                  </span>
                </p>
                <h4>
                  <a href='../App.js'>Hải Phòng</a>
                </h4>
                <p>
                  <span>
                    nhà hát lớn hải phòng, Vịnh hạ long, chùa đỏ, đền Phú Xá,
                    bảo tàng hải quân, chùa Tháp Cuồng Long
                  </span>
                </p>
                <h4>
                  <a href='../App.js'>Ninh Bình</a>
                </h4>
                <p>
                  <span>
                    Tràng An, Tam Cốc – Bích Động, Cố đô Hoa Lư, Hang Múa, chùa
                    Bãi Đình, động Am Tiên,...
                  </span>
                </p>
              </div>
            </div>
            <div class='col-3'>
              <div class='col3'>
                <h4>
                  <a href='../App.js'>
                    NÊN ĐI ĐẾN NHỮNG NƠI NÀY 1 LÀN TRONG ĐỜI
                  </a>
                </h4>
                <p>
                  <span>
                    Vịnh hạ long, Sapa, Phố cổ, Tràng tiền, lăng bác. Một số địa
                    điểm nổi tiếng nhất nước ta và là noi ta nên đến để biếtnơi
                    ta đang sống có những gì và đẹp ra sao.
                  </span>
                  <h4>
                    <a>PHƯƠNG THỨC THANH TOÁN</a>
                  </h4>
                  <span>
                    <MDBIcon icon='home' className='me-2' />
                    <img src={logovnpay} className='imgThanhToan' />
                    <img style={{ height: '48px', width: '87px', marginLeft: '5px' }} src={logoPaypal} className='imgThanhToan' />
                  </span>
                </p>
              </div>
            </div>
            <div className='text-center p-4'>
              Mọi nội dung được đảm bảo chính xác và bảo mật. Chịu trách nhiệm bởi
              công ty TravelVivu
            </div>
          </div>
        </div>
      </div>

      {/* <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Liên lạc với chúng tôi: 0865069125</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <FacebookOutlined style={{ fontSize: '24px' }} />
          </a>
          <a href='' className='me-4 text-reset'>
            <TwitterOutlined style={{ fontSize: '24px' }} />
          </a>
          <a href='' className='me-4 text-reset'>
            <GoogleOutlined style={{ fontSize: '24px' }} />
          </a>
          <a href='' className='me-4 text-reset'>
            <InstagramOutlined style={{ fontSize: '24px' }} />
          </a>
          <a href='' className='me-4 text-reset'>
            <LinkedinOutlined style={{ fontSize: '24px' }} />
          </a>
          <a href='' className='me-4 text-reset'>
            <GithubOutlined style={{ fontSize: '24px' }} />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon='gem' className='me-3' />
                <img src={logotravel} style={{}} />
              </h6>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Địa điểm</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Hà Nội
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  TP.Hồ Chí Minh
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Vũng Tàu
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Đà Lạt
                </a>
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Sản Phẩm</h6>
              <p>
                <a href='#!' className='text-reset'>
                  homestay
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Dịch Vụ
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Ưu đãi
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Trợ giúp
                </a>
              </p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                Phương thức thanh toán
              </h6>
              <p>
                <MDBIcon icon='home' className='me-2' />
                <img src={logovnpay} />
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className='text-center p-4'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
      >
        Mọi nội dung được đảm bảo chính xác và bảo mật. Chịu trách nhiệm bởi
        công ty TravelVivu
      </div> */}
    </MDBFooter>
  );
}
