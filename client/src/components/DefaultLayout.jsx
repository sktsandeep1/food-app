import "../styles/DefaultLayout.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Children, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  FileTextOutlined,
  UnorderedListOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const { cartItems } = useSelector((state) => state.rootReducer);
  const Navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  // const dispatch = useDispatch();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // to get localstorage

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout className="main-layout-body">
      <Sider
        className="left-sidebar"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <h1>Food Pos</h1>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />}>
            <Link to="/bills">Bills</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UnorderedListOutlined />}>
            <Link to="/items">Items</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<LogoutOutlined />}>
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="nav-bar"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
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

          <div className="header-cart" onClick={() => Navigate("/cart")}>
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
