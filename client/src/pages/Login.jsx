import "../styles/DefaultLayout.css";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { message } from "antd";

const NormalLoginForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    // try {
    //   // dispatch({
    //   //   type: SHOW_LOADING,
    //   // });

    //   await axios.post("/api/users/login");
    //   message.success("user login successfully");
    //   navigate("/");
    // } catch (error) {
    //   console.log("kuch to gadbad h login mein !!!!!!!");
    // }

    const { userId, password } = values;

    const userNameValue = "admin";
    const passwordValue = "admin123";

    if (userId === userNameValue && password === passwordValue) {
      // await axios.post("/api/users/login", values);
      dispatch({ type: "LOGIN_SUCCESS" });
      localStorage.setItem("isLoggedIn", true)
      message.success("User logged in successfully");
      navigate("/");
    } else {
      console.log("Invalid credentials");
    }

    // try {
    //   await axios.post("/api/users/login", values);
    //   dispatch({
    //     type: "LOGIN_SUCCESS"}),
    //     message.success("User logged in successfully");
    //   navigate("/");
    // } catch (error) {
    //   console.log("Login failed:", error);

    // }
  };

  return (
    <div className="login-page">
      <div className="background-overlay" />

      <Form
        form={form}
        name="normal_login"
        className="login-form"
        // initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <h1>Login</h1>
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

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          className="login-checkbox"
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item className="login-txt">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            // onClick={() => handleSubmit()}
          >
            Log in
          </Button>
          <span><a href="/">Home</a></span>
          {/* <span>
            Or <Link to="/register">Register Now</Link>
          </span> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default NormalLoginForm;
