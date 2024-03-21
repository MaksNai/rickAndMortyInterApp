import "./App.scss";
import { Container } from "@mui/material";
// import {
//   BrowserRouter as Router,
//   Route,
//   Navigate,
//   Routes,
// } from "react-router-dom";
// import { Fragment } from "react";
import {
  Footer,
  Header,
  MainCharacters,
  MainLocations,
  MainEpisodes,
} from "./components";

// ПОКА НЕ ИСПРАВЛЕН РОУТЕР, ПЕРЕКЛЮЧЕНИЕ И ПРОСМОТР СТРАНИЦ ОСУЩЕСТВЛЯЕТСЯ ПОСРЕДСТВОМ ИЗМЕНЕНИЯ КОМПОНЕНТА НА СТРОКЕ 31

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
      <MainCharacters />
      <Footer />
    </Container>
    // <Fragment>
    //   <Router>
    //     <Container
    //       className="container"
    //       maxWidth="false"
    //       disableGutters
    //       sx={{
    //         display: "flex",
    //       }}
    //     >
    //       <Header />
    //       <Routes>
    //         <Route exact path="/characters" component={MainCharacters} />
    //         <Route exact path="/locations" component={MainLocations} />
    //       </Routes>
    //       <Navigate to="/characters" />
    //       <Footer />
    //     </Container>
    //   </Router>
    // </Fragment>
  );
}

export default App;
