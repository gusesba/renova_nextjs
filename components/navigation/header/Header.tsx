import { Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar className="w-screen" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">Renova</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Tabelas</Nav.Link>
          <Nav.Link href="#features">Atividades</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
