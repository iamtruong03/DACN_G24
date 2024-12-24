import styled from 'styled-components';
import { Typography } from 'antd'
import { MDBBtn } from 'mdb-react-ui-kit';
import imgHD from '../../assets/img/KMhoptac.png'
import { Link } from 'react-router-dom';


const { Title } = Typography

const HomePartner = () => {
  const ColorBox = styled.div`
    width: 100%;
    height: 350px;
    background: linear-gradient(45deg, #FFFAF0, #FF6F61, #FF0099, #BF00FF, #3700FF, #00A8FF, #00FFD1, #7FFF00);
    background-size: 200% 200%;
    border-bottom-left-radius: 200px;
    animation: changeGradient 10s infinite;

    @keyframes changeGradient {
        0% {
            background-position: 0% 50%;
        }
        100% {
            background-position: 100% 50%;
        }
  }
`
  return (
    <section style={{ marginBottom: 50 }}>
      <ColorBox>
        <div style={{ padding: '80px 30px 0px 30px', marginBottom: 50 }}>
          <Title style={{ textAlign: 'center', color: 'white' }}>GHI DANH NHÀ CỦA BẠN TRÊN TravelVIVU</Title>
          <Title level={5} style={{ textAlign: 'center', color: 'white' }}>Độc giả toàn cầu, trọng điểm châu Á. Nhận các đặt phòng bạn đã bỏ lỡ bằng cách ghi danh miễn phí trên TravelVIVU, ngay hôm nay!

          </Title>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: 500, height: 230, backgroundColor: 'white',
            borderRadius: 15, boxShadow: '0 0 3px 3px #ACAEB1', marginRight: 30, padding: '30px 30px 0px 30px'
          }}>
            <Title level={3} >Homestay</Title>
            <p>Những căn nhà nhỏ được trang trí thành một không gian lưu trú riêng biệt dành cho khách</p>
            <Link to={"/hop-tac/login"}>
              <MDBBtn style={{ top: 30 }}>Đăng nhập để cộng tác với chúng tôi</MDBBtn>
            </Link>
          </div>
          <div style={{
            width: 500, height: 230, backgroundColor: 'white',
            borderRadius: 15, boxShadow: '0 0 3px 3px #ACAEB1', padding: '30px 30px 0px 30px'
          }}>
            <Title level={3} >Căn hộ của người dân</Title>
            <p>Những căn hộ được trang trí lại thành một không gian đặc biệt cho du
              khách đặc biệt là những nơi có tiềm năng như các điểm du lịch nổi tiếng</p>
            <Link to={"/hop-tac/login"}>
              <MDBBtn style={{ top: 8 }}>Đăng nhập để cộng tác với chúng tôi</MDBBtn>
            </Link>
          </div>
        </div>
      </ColorBox>
      <div style={{ marginTop: 200, padding: '0px 200px 0 200px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Có nhiều lý do để đăng thông tin chỗ nghỉ lên TravelVIVU!
        </Title>
        <div style={{ display: 'flex', justifyContent: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: '49.5%', height: 210, backgroundColor: '#e3edff', borderRadius: 12, padding: '10px 10px 0px 10px' }}>
            <div style={{ width: 50, height: 50, backgroundColor: '#04aae0', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg width="30" height="30" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 13C9.55229 13 10 13.4477 10 14C10 14.5523 9.55229 15 9 15H6.5C6.22386 15 6 15.2239 6 15.5C6 15.7455 6.17688 15.9496 6.41012 15.9919L6.5 16H10.4564L15.9813 14.4253C16.4357 14.2958 16.9165 14.5183 17.1118 14.9485C17.2899 15.3406 17.175 15.7979 16.8464 16.061L16.7516 16.1277L11.4204 19.407C10.8602 19.7517 10.2247 19.9521 9.5707 19.9924L9.32469 20H4V13H9ZM3 13V20H1C0.447715 20 0 19.5523 0 19V14C0 13.4477 0.447715 13 1 13H3ZM10 0C14.4183 0 18 3.58172 18 8C18 9.80084 17.405 11.4627 16.4008 12.7997L11.3874 14.2V13.7236C11.3874 12.6693 10.5715 11.8055 9.53665 11.7291L9.38739 11.7236L2.91752 11.7235C2.33162 10.6113 2 9.34439 2 8C2 3.58172 5.58172 0 10 0ZM9.92124 2C9.67807 2 9.48021 2.19777 9.48021 2.44093V3.17754C8.33874 3.30725 7.63377 3.99997 7.63377 5.00036C7.63377 5.63355 7.91638 6.11402 8.4737 6.42861C8.7346 6.57498 9.02395 6.68159 9.4164 6.7738L10.2229 6.95568C10.6364 7.05395 10.7223 7.09239 10.8994 7.19409C11.1472 7.33118 11.2776 7.57595 11.2776 7.90245C11.2776 8.54337 10.7683 8.92602 9.91528 8.92602C9.38115 8.92602 8.94217 8.74922 8.71109 8.44111C8.60901 8.3098 8.56014 8.20061 8.52949 8.03678C8.48356 7.79086 8.269 7.61246 8.01944 7.61246L7.95405 7.61646C7.80897 7.63485 7.67766 7.71428 7.59388 7.83439C7.50947 7.95522 7.48015 8.10706 7.51338 8.2509C7.58535 8.56247 7.68076 8.77481 7.85374 9.00803C8.19011 9.46104 8.75134 9.74126 9.48021 9.8213V10.5592C9.48021 10.8022 9.67807 11 9.92124 11C10.1643 11 10.3622 10.8022 10.3622 10.5592V9.82317C11.5863 9.69612 12.2861 8.99381 12.2861 7.88663C12.2861 6.90074 11.7772 6.36113 10.5408 6.05743L9.51493 5.82829C9.36691 5.79176 9.31819 5.77198 9.21608 5.73048C8.80793 5.56416 8.62589 5.33388 8.62589 4.98401C8.62589 4.4346 9.12137 4.06545 9.85887 4.06545C10.3276 4.06545 10.6933 4.2052 10.9164 4.4696C11.0042 4.57657 11.0552 4.66994 11.0969 4.80241C11.1651 5.01821 11.3606 5.1633 11.5834 5.1633L11.6195 5.16202L11.6703 5.15592C11.8198 5.13451 11.951 5.04833 12.03 4.9196C12.1099 4.78944 12.1275 4.63165 12.0783 4.48648C12.0113 4.28898 11.93 4.13803 11.7978 3.96541C11.4819 3.54438 10.9865 3.27625 10.3622 3.18767V2.44093C10.3622 2.19777 10.1643 2 9.92124 2Z" fill="white"></path></svg>
            </div><br />
            <Title level={3}>Nhận đặt phòng nhanh chóng
            </Title>
            <p>Thống kê của chúng tôi cho thấy, hầu hết các tin cho thuê phòng/thuê chỗ mới sẽ nhận được đặt phòng trong vòng 3 tháng đầu tiên sau khi tham gia cộng đồng của chúng tôi.</p>
          </div>
          <div style={{ width: '49.5%', height: 210, backgroundColor: '#d8f5d5', borderRadius: 20, padding: '10px 10px 0px 10px' }}>
            <div style={{ width: 50, height: 50, backgroundColor: '#09b057', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 0L14.506 2.96974L18 1.60727L18.8478 5.38912L22.3919 6.00022L21.3538 9.58106L24 12.0004L21.3538 14.4198L22.3919 17.9998L18.8478 18.6109L18 22.3927L14.506 21.0312L12 24L9.49404 21.0312L6 22.3927L5.15307 18.6109L1.6081 17.9998L2.64622 14.4198L0 12.0004L2.64622 9.58106L1.6081 6.00022L5.15307 5.38912L6 1.60727L9.49404 2.96974L12 0ZM16.4496 7H14.6996L7.69959 17H9.44959L16.4496 7ZM15.5041 13C14.6159 13 13.9996 13.8421 13.9996 15.005C13.9996 16.1679 14.6068 17 15.4951 17C16.3833 17 16.9996 16.1679 16.9996 14.995C16.9996 13.8421 16.3923 13 15.5041 13ZM8.50412 7C7.61591 7 6.99959 7.84211 6.99959 9.00501C6.99959 10.1679 7.60684 11 8.49506 11C9.38328 11 9.99959 10.1679 9.99959 8.99499C9.99959 7.84211 9.39234 7 8.50412 7Z" fill="white"></path></svg>                        </div><br />
            <Title level={3}>Nổi bật so với các đối thủ cạnh tranh
            </Title>
            <p>Thống kê của chúng tôi cho thấy, hầu hết các tin cho thuê phòng/thuê chỗ mới sẽ nhận được đặt phòng trong vòng 3 tháng đầu tiên sau khi tham gia cộng đồng của chúng tôi.</p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <div style={{ width: '33%', height: 210, backgroundColor: '#ffdede', borderRadius: 12, padding: '10px 10px 0px 10px' }}>
            <div style={{ width: 50, height: 50, backgroundColor: '#e03126', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 14C20.0899 14 23 16.9101 23 20.5V22H16.9999L17 19C17 17.1804 16.46 15.487 15.5316 14.0711C15.8471 14.0245 16.1707 14 16.5 14ZM8 12C11.866 12 15 15.134 15 19V22H1V19C1 15.134 4.13401 12 8 12ZM16.5 5C18.433 5 20 6.567 20 8.5C20 10.433 18.433 12 16.5 12C14.567 12 13 10.433 13 8.5C13 6.567 14.567 5 16.5 5ZM8 2C10.2091 2 12 3.79086 12 6C12 8.20914 10.2091 10 8 10C5.79086 10 4 8.20914 4 6C4 3.79086 5.79086 2 8 2Z" fill="white"></path></svg>                        </div><br />
            <Title level={3}>Tiếp cận khách hàng quốc tế
            </Title>
            <p>Chúng tôi kết nối tới tất cả mọi người từ trong và ngoài nước có nhu cầu du lịch tại Việt Nam.</p>
          </div>
          <div style={{ width: '33%', height: 210, backgroundColor: '#f0edff', borderRadius: 20, padding: '10px 10px 0px 10px' }}>
            <div style={{ width: 50, height: 50, backgroundColor: '#a2479b', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 0L14.506 2.96974L18 1.60727L18.8478 5.38912L22.3919 6.00022L21.3538 9.58106L24 12.0004L21.3538 14.4198L22.3919 17.9998L18.8478 18.6109L18 22.3927L14.506 21.0312L12 24L9.49404 21.0312L6 22.3927L5.15307 18.6109L1.6081 17.9998L2.64622 14.4198L0 12.0004L2.64622 9.58106L1.6081 6.00022L5.15307 5.38912L6 1.60727L9.49404 2.96974L12 0ZM16.4496 7H14.6996L7.69959 17H9.44959L16.4496 7ZM15.5041 13C14.6159 13 13.9996 13.8421 13.9996 15.005C13.9996 16.1679 14.6068 17 15.4951 17C16.3833 17 16.9996 16.1679 16.9996 14.995C16.9996 13.8421 16.3923 13 15.5041 13ZM8.50412 7C7.61591 7 6.99959 7.84211 6.99959 9.00501C6.99959 10.1679 7.60684 11 8.49506 11C9.38328 11 9.99959 10.1679 9.99959 8.99499C9.99959 7.84211 9.39234 7 8.50412 7Z" fill="white"></path></svg>                        </div><br />
            <Title level={3}>Đăng thông tin các homestay tại toàn quốc
            </Title>
            <p>Có các ưu đãi lớn dành cho các đối tác quyết định hợp tác với chúng tôi.</p>
          </div>
          <div style={{ width: '33%', height: 210, backgroundColor: '#fbf3d9', borderRadius: 20, padding: '10px 10px 0px 10px' }}>
            <div style={{ width: 50, height: 50, backgroundColor: '#fdb816', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 0L14.506 2.96974L18 1.60727L18.8478 5.38912L22.3919 6.00022L21.3538 9.58106L24 12.0004L21.3538 14.4198L22.3919 17.9998L18.8478 18.6109L18 22.3927L14.506 21.0312L12 24L9.49404 21.0312L6 22.3927L5.15307 18.6109L1.6081 17.9998L2.64622 14.4198L0 12.0004L2.64622 9.58106L1.6081 6.00022L5.15307 5.38912L6 1.60727L9.49404 2.96974L12 0ZM16.4496 7H14.6996L7.69959 17H9.44959L16.4496 7ZM15.5041 13C14.6159 13 13.9996 13.8421 13.9996 15.005C13.9996 16.1679 14.6068 17 15.4951 17C16.3833 17 16.9996 16.1679 16.9996 14.995C16.9996 13.8421 16.3923 13 15.5041 13ZM8.50412 7C7.61591 7 6.99959 7.84211 6.99959 9.00501C6.99959 10.1679 7.60684 11 8.49506 11C9.38328 11 9.99959 10.1679 9.99959 8.99499C9.99959 7.84211 9.39234 7 8.50412 7Z" fill="white"></path></svg>                        </div><br />
            <Title level={3}>Hỗ trợ
            </Title>
            <p>Nhận hỗ trợ thông qua tài liệu trực tuyến, tiện ích hỗ trợ trên YCS và Quản lý Chủ nhà, email và trò chuyện.</p>
          </div>
        </div>
      </div>
      <div style={{ justifyContent: 'center', marginTop: 30 }}>
        <img src={imgHD} style={{ width: '80%', display: 'flex', marginLeft: 'auto', marginRight: 'auto' }} />
      </div>
    </section>
  )
}
export default HomePartner