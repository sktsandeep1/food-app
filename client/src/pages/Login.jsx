import "../styles/DefaultLayout.css";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch } from "react-redux";

const NormalLoginForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      // dispatch({
      //   type: SHOW_LOADING,
      // });

      await axios.post("/api/users/login");
      message.success("user login successfully");
      navigate("/");
    } catch (error) {
      console.log("kuch to gadbad h !!!!!!!");
    }
  };

  return (
    <Form
      form={form}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="userId"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Username"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={() => handleSubmit()}
        >
          Log in
        </Button>
        Or <Link to="/register">Register Now</Link>
      </Form.Item>
    </Form>
  );
};

export default NormalLoginForm;
