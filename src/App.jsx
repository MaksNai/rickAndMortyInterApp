import "./App.scss";
import { Container } from "@mui/material";
// import {
//   BrowserRouter as Router,
//   Route,
//   Navigate,
//   Routes,
// } from "react-router-dom";
// import { Fragment } from "react";
import { Footer, Header, MainCharacters, MainLocations} from "./components";

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
          <MainLocations />
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
    //       </Routes>
    //       <Navigate to="/characters" />
    //       <Footer />
    //     </Container>
    //   </Router>
    // </Fragment>
  );
}

export default App;
