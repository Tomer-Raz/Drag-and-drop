import "./Header.css";
import { Layout } from "antd";

const { Header } = Layout;

const HeaderComp = () => {
  return (
    <Header
      style={{
        textAlign: "center",
        backgroundColor: "white",
        fontSize: "22px",
      }}
    >
      <div>Header</div>
    </Header>
  );
};

export default HeaderComp;
