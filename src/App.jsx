import "./App.scss";
import { Container } from "@mui/material";
import { Footer, Header, Main } from "./components";

function App() {
  return (
    <Container
      className="container"
      maxWidth="false"
      disableGutters
      sx={{
        display: "flex",
      }}
    >
      <Header />
      <Main />
      <Footer />
    </Container>
  );
}

export default App;
