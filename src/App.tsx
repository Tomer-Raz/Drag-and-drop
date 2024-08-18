import React from "react";
import { Breadcrumb, Layout, theme } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import HeaderComp from "./components/Header/Header";
import CustomContent from "./components/Content/Content/Content";

const { Content, Footer } = Layout;

const Option1: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <HeaderComp />
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>About</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content for Option 1
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Footer Text</Footer>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout>
          <Routes>
            <Route path="/home" element={<Option1 />} />
            <Route path="/demo" element={<CustomContent />} />
          </Routes>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
