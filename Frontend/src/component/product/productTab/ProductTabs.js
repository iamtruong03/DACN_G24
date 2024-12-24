import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Rate, Typography } from 'antd';
import { useSelector } from 'react-redux';
import Fuse from 'fuse.js';
import imgproduct from '../../../assets/svg/Rectangle 153.svg'
import { EnvironmentOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';

const { Title } = Typography
const { Meta } = Card;


const ProductTabs = (props) => {
    const products = useSelector((state) => state.product.products);
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);

    const [productlist, setProducts] = useState([]);

    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    useEffect(() => {
        // Set checkInDate to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setCheckInDate(tomorrow);

        // Set checkOutDate to the day after tomorrow
        const dayAfterTomorrow = new Date();
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
        setCheckOutDate(dayAfterTomorrow);
    }, []);

    useEffect(() => {
        const fuse = new Fuse(products, {
            keys: ['address'],
            includeScore: true,
            threshold: 0.4, // Điều chỉnh ngưỡng tìm kiếm tùy chọn
            ignoreLocation: true,
            distance: 100,
        });

        const results = fuse.search(props.city);

        const filteredProducts = results.map(result => result.item).filter(item => item !== undefined);


        setProducts(filteredProducts.slice(0, 6));
    }, [products, props.city]);
    const loadMore = () => {
        const startIndex = productlist.length;
        const endIndex = startIndex + 8;
        const newProducts = [...productlist, ...products.slice(startIndex, endIndex)];

        const fuse = new Fuse(newProducts, {
            keys: ['address'],
            includeScore: true,
            threshold: 0.4,
            ignoreLocation: true,
            distance: 100,
        });

        const results = fuse.search(props.city);

        const filteredProducts = results.map(result => result.item);

        setProducts(filteredProducts);
    };
    const formatPrice = (price) => {
        // Format the price with commas
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const truncateAddress = (address, maxLength) => {
        // Truncate the address if it's longer than maxLength characters
        if (address.length > maxLength) {
            return address.substring(0, maxLength) + '...';
        }
        return address;
    };
    return (
        <section style={{ padding: '0 200px 0 200px' }}>
            {
                loading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : null
            }
            {error ? <p>Error: {error}</p> : null}
            <Row style={{}}>
                {productlist.map((product) => (
                    <Col
                        xs={{ span: 24 }}
                        sm={{ span: 12 }}
                        md={{ span: 8 }}
                        lg={{ span: 6 }}
                        style={{ marginTop: '50px' }}
                        key={product.id}
                    >
                        <Link to={
                            `/homestay/detail/${product.id}?startDate=${checkInDate?.valueOf()}&endDate=${checkOutDate?.valueOf()}&numNight=1`
                        }>
                            <Card
                                hoverable
                                style={{
                                    width: 270,
                                }}
                                cover={<img alt="example" src={product.images[0]?.imgUrl} />}
                            >
                                <Meta title={product.name} />
                                <div>
                                    <br />
                                    <div style={{ display: 'flex' }}>
                                        <EnvironmentOutlined style={{ marginTop: 5 }} />&ensp;
                                        {truncateAddress(product.address, 20)} {/* Thay đổi 20 bằng số ký tự tối đa bạn muốn hiển thị */}
                                    </div>
                                    <Title level={3} style={{ color: 'red' }}>
                                        {formatPrice(product.price + product.price * 11 / 100)} VNĐ
                                    </Title>
                                </div>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
            {
                productlist.length < products.length && productlist.length > 5 && (
                    <div className="d-flex justify-content-center" style={{ marginTop: '20px' }}>
                        <button onClick={loadMore}
                            style={{
                                borderRadius: 8, backgroundColor: '#5392F9',
                                color: 'white', width: 380, height: 45, fontSize: 18, borderColor: '#5392F9'
                            }}>Xem thêm các chỗ nghỉ({props.city})</button>
                    </div>
                )
            }
        </section>
    );
}
export default ProductTabs