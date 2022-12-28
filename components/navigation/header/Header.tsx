import Link from 'next/link';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export interface IHeader {
  pageName?: string;
}

const Header: React.FC<IHeader> = ({ pageName }) => {
  return (
    <Navbar className="w-screen h-[9vh]" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">Renova</Navbar.Brand>
        <Nav className="me-auto">
          <NavDropdown title="Tabelas" id="collasible-nav-dropdown">
            <NavDropdown.Item>
              <Link
                className="no-underline text-black dropdown-item"
                href="/clients"
              >
                Clientes
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link
                className="no-underline text-black dropdown-item"
                href="/products"
              >
                Estoque
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link
                className="no-underline text-black dropdown-item"
                href="/sells"
              >
                Saídas
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Atividades" id="collasible-nav-dropdown">
            <NavDropdown.Item>
              <Link
                className="no-underline text-black dropdown-item"
                href="/sells/new"
              >
                Efetuar Venda
              </Link>
            </NavDropdown.Item>
          </NavDropdown>

          <h2 className="absolute left-[45vw]">{pageName}</h2>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
