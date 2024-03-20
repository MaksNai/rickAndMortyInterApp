import './App.scss';
import { Container } from '@mui/material';
import { Header, Main } from './components';

function App() {
  return (
    <Container maxWidth="xl" className="container" sx={{
      display: 'flex'
    }}>
      <Header />
      <Main></Main>
      <footer>Footer</footer>
    </Container>
  );
}

export default App;
