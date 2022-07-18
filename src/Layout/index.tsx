import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import styles from "./styles.module.sass";

const { Header, Content } = Layout;
const activeStyle = {
  color: "#1890ff",
};

const pageLayout = () => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Menu
          theme="light"
          mode="horizontal"
          items={[
            {
              key: "1",
              label: (
                <NavLink
                  to="/"
                  style={({ isActive }) => (isActive ? activeStyle : {})}
                >
                  精灵问答
                </NavLink>
              ),
            },
            {
              key: "2",
              label: (
                <NavLink
                  to="/calc"
                  style={({ isActive }) => (isActive ? activeStyle : {})}
                >
                  计算器
                </NavLink>
              ),
            },
          ]}
        />
      </Header>
      <Layout>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default pageLayout;
