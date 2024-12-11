import { Layout, Typography, Card } from "antd";

const { Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card>
          <Title>Labas, Pasauli!</Title>
        </Card>
      </Content>
    </Layout>
  );
}

export default App;
