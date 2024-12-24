import React from 'react';
import { Collapse, Typography } from 'antd';
const { Title } = Typography

const items = [
    {
        key: '1',
        label: 'Homestay là gì?',
        children: <div> <strong>1. Homestay là gì?</strong><br />
            Homestay là cách tuyệt vời để du khách có thể ở lại trong môi trường nhà ở địa phương. Thông thường, bạn sẽ thuê một phòng tại nhà của người chủ nhà và trải nghiệm cuộc sống hàng ngày của họ.
        </div>,
    },
    {
        key: '2',
        label: 'Làm thế nào để đặt homestay?',
        children: <div>  <strong>2. Làm thế nào để đặt homestay?</strong><br />
            Để đặt homestay, bạn có thể chọn trực tuyến trên trang web đặt phòng hoặc liên hệ trực tiếp với chủ nhà qua các kênh liên lạc được cung cấp.
        </div>,
    },
    {
        key: '3',
        label: 'An toàn và thoải mái khi ở homestay?',
        children: <div>  <strong>3. Làm thế nào để đảm bảo an toàn và thoải mái khi ở homestay?</strong><br />
            Trước khi đặt, hãy đọc đánh giá từ những người khác đã ở lại homestay đó. Bạn cũng có thể liên hệ với chủ nhà để biết thêm thông tin về an ninh và tiện nghi.
        </div>,
    },
    {
        key: '4',
        label: 'Homestay có phù hợp cho gia đình?',
        children: <div> <strong>4. Homestay có phù hợp cho gia đình?</strong><br />
            Nhiều homestay chào đón gia đình và cung cấp các tiện nghi phù hợp. Trước khi đặt, hãy kiểm tra xem chỗ ở có đủ chỗ cho tất cả các thành viên trong gia đình hay không.
        </div>,
    },
    {
        key: '5',
        label: 'Thanh toán khi đặt homestay?',
        children: <div>  <strong>5. Làm thế nào để thanh toán khi đặt homestay?</strong><br />
            Quy trình thanh toán thường được xác định bởi trang web đặt phòng hoặc chủ nhà. Bạn có thể thanh toán trực tuyến hoặc khi đến homestay.
        </div>,
    },
    {
        key: '6',
        label: 'Làm thế nào để tìm kiếm homestay phù hợp?',
        children: <div><strong>2. Làm thế nào để tìm kiếm homestay phù hợp?</strong><br />
            Bạn có thể sử dụng các trang web đặt phòng hoặc các ứng dụng di động để tìm kiếm homestay theo vị trí, tiện nghi, và đánh giá từ người đã ở trước đó.
        </div>,
    },
    {
        key: '7',
        label: 'Homestay có bao gồm bữa ăn không?',
        children: <div><strong>3. Homestay có bao gồm bữa ăn không?</strong><br />
            Chính sách ăn uống thường khác nhau tùy theo homestay. Bạn nên kiểm tra với chủ nhà xem liệu bữa ăn có được bao gồm hay không và nếu có, thì nó bao gồm những loại nào.
        </div>,
    },
    {
        key: '8',
        label: 'Có những loại homestay nào?',
        children: <div><strong>4. Có những loại homestay nào?</strong><br />
            Homestay có thể bao gồm cả phòng riêng, căn hộ đầy đủ tiện nghi hoặc thậm chí là cả ngôi nhà đầy đủ. Bạn có nhiều lựa chọn để chọn lựa dựa trên nhu cầu và sở thích cá nhân.
        </div>,
    },
    {
        key: '9',
        label: 'Làm thế nào để xác nhận tính uy tín của homestay?',
        children: <div><strong>5. Làm thế nào để xác nhận tính uy tín của homestay?</strong><br />
            Đọc đánh giá từ người khác đã ở lại homestay là cách tốt để đánh giá tính uy tín. Ngoài ra, hãy kiểm tra các chứng chỉ hoặc đánh giá trên các trang web đặt phòng để có cái nhìn toàn diện hơn.
        </div>,
    },
    {
        key: '10',
        label: 'Có thể thương lượng giá homestay được không?',
        children: <div><strong>6. Có thể thương lượng giá homestay được không?</strong><br />
            Một số chủ nhà có thể cho phép thương lượng về giá, đặc biệt là nếu bạn đặt lâu dài hoặc có nhu cầu đặc biệt. Hãy thảo luận trực tiếp với chủ nhà về khả năng thương lượng.
        </div>,
    }
];
const SupportedUser = () => {
    return (
        <section style={{ padding: '10px 300px 10px 300px' }}>
            <Title level={4}>Câu hỏi thường gặp</Title>
            <Collapse items={items} bordered={false} defaultActiveKey={['1']} />
        </section>
    )
}
export default SupportedUser;