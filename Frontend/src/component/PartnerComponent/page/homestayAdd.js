import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Typography
} from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Title } = Typography
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const HomeStayAdd = () => {
  return (
    <div>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Tên">
          <Input />
        </Form.Item>
        <Form.Item label="Địa chỉ cụ thể">
          <Input />
        </Form.Item>
        <Form.Item label="Thành Phố">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Thời hạn đăng">
          <RangePicker />
        </Form.Item>
        <Form.Item label="Giá">
          <Input />
        </Form.Item>
        <Form.Item label="Số người ở ">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Mô tả">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Button type="primary" >Add</Button>
      </Form>
    </div>
  )
}
export default HomeStayAdd();