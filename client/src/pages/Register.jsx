import React, { useState } from "react";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from "antd";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const navigate = useNavigate();
  const onFinish = (values) => {
    const payload = {
      email: values.email,
      password: values.password,
      phone: values.phone,
    };
    handleSubmit(payload);
  };

  const handleSubmit = async (values) => {
    try {
      // dispatch({
      //   type: SHOW_LOADING,
      // });

      await axios.post("/api/users/register", values);
      message.success("Register Successfully");
      navigate("/login");
    } catch (error) {
      console.log("kuch to gadbad h !!!!!!!");
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
      layout="vertical"
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          { type: "email", message: "The input is not valid E-mail!" },
          { required: true, message: "Please input your E-mail!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="agreement" valuePropName="checked">
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={() => handleSubmit()}>
          Register
        </Button>
        Or
        <Link to="/login">Login Now</Link>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
