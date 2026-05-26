import "../styles/DefaultLayout.css";
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import { Children, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  FileTextOutlined,
  UnorderedListOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, message, theme } from "antd";

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const Navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // to get localstorage

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleCart = () => {
    if (cartItems.length !== 0) {
      Navigate("/cart");
    } else {
      message.error("cart is empty");
    }
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      console.log("logged in");
      dispatch({ type: "LOGIN_SUCCESS" });
      console.log("dispatching login success");
    }
  }, []);

  return (
    <Layout className="main-layout-body" style={{ position: "relative" }}>
      {loading && <Spinner />}

      {isLoggedIn && (
        <Sider
          className="left-sidebar"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div
            className="sidebar-logo-vertical"
            style={{ width: "100px", display: "flex", margin: "auto" }}
          >
            {/* <ShopOutlined className="logo" /> */}
            <img src="/pos-logo.png" alt="" style={{ width: "100px" }} />
          </div>

          <Menu
            className="left-sidebar-menu"
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[window.location.pathname]}
            items={[
              {
                key: "/",
                icon: <HomeOutlined />,
                label: <Link to="/">Home</Link>,
              },
              {
                key: "/bills",
                icon: <FileTextOutlined />,
                label: <Link to="/bills">Bills</Link>,
              },
              {
                key: "/items",
                icon: <UnorderedListOutlined />,
                label: <Link to="/items">Items</Link>,
              },
              {
                key: "/customer-page",
                icon: <UserOutlined />,
                label: <Link to="/customer-page">Customers</Link>,
              },
              // {
              //   key: "/add-user",
              //   icon: <UserOutlined />,
              //   label: <Link to="/add-user">Add User</Link>,
              // },
              {
                key: "/logout",
                icon: <LogoutOutlined />,
                label: <Link to="/logout">Logout</Link>,
              },
            ]}
          />
        </Sider>
      )}

      <Layout>
        <Header
          className="nav-bar"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div>
            {isLoggedIn && (
              <Button
                className="collapsed-icon"
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            )}
            <div className="default-nav">
              {!isHomePage && (
                <div className="header-nav-home">
                  <a href="/">
                    <HomeOutlined />
                  </a>
                </div>
              )}

              <div className="header-login-btn">
                <a href="/login">
                  <UserOutlined />
                </a>
              </div>
            </div>
          </div>

          <div className="header-cart" onClick={() => handleCart()}>
            <ShoppingCartOutlined />
            <span>{cartItems.length}</span>
          </div>
        </Header>

        <Content
          className="main-products-content-area"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
