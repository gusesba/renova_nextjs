import Link from 'next/link';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar className="w-screen" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">Renova</Navbar.Brand>
        <Nav className="me-auto">
          <NavDropdown title="Tabelas" id="collasible-nav-dropdown">
            <NavDropdown.Item>
              <Link className="no-underline text-black" href="/clients">
                Clientes
              </Link>
            </NavDropdown.Item>

            <NavDropdown.Item>
              <Link className="no-underline text-black" href="/products">
                Estoque
              </Link>
            </NavDropdown.Item>

            <NavDropdown.Item>
              <Link className="no-underline text-black" href="/sells">
                Saídas
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#features">Atividades</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
