import './App.scss';
import { Container } from '@mui/material';
import { Header } from './components';
import { Main } from './components';

function App() {
  console.log('ap')
  return (
    <Container maxWidth="xl" className="container">
      <Header></Header>
      <Main></Main>
      <footer>Footer</footer>
    </Container>
  );
}

export default App;
