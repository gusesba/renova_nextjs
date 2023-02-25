import Link from 'next/link';
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { baseURL } from '../../../config/config';

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
            <NavDropdown.Item>
              <Link
                className="no-underline text-black dropdown-item"
                href="/client"
              >
                Fechamento Cliente
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link
                className="no-underline text-black dropdown-item"
                href="/sells/receipt"
              >
                Recibos
              </Link>
            </NavDropdown.Item>

            <span
              onClick={(e) => {
                e.preventDefault();
                const excel = document.getElementById('excel');
                if (excel) {
                  excel.hidden = !excel.hidden;
                }
              }}
              className="text-black dropdown-item"
            >
              Excel
            </span>

            <div id="excel" hidden>
              <Form.Group
                className="w-[90%] ml-[5%] mb-3"
                controlId="formDateMin"
              >
                <Form.Label className="ml-[0.5rem]">Date Min</Form.Label>
                <Form.Control id="dateMin" type="date" name="dateMin" />
              </Form.Group>
              <Form.Group
                className="w-[90%] ml-[5%] mb-3"
                controlId="formDateMax"
              >
                <Form.Label className="ml-[0.5rem]">Date Max</Form.Label>
                <Form.Control id="dateMax" type="date" name="dateMax" />
              </Form.Group>
              <Button
                onClick={() => {
                  const dateMin = document.getElementById(
                    'dateMin'
                  ) as HTMLInputElement;
                  const dateMax = document.getElementById(
                    'dateMax'
                  ) as HTMLInputElement;
                  const dateMinValue = dateMin.value;
                  const dateMaxValue = dateMax.value;
                  fetch(baseURL + '/client/excel', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      dateMin: dateMinValue,
                      dateMax: dateMaxValue,
                    }),
                  }).then((data: any) => {
                    const reader = data.body.getReader();
                    const chunks: any = [];

                    return reader
                      .read()
                      .then(function processResult(result: any) {
                        if (result.done) {
                          const blob = new Blob(chunks, {
                            type: 'application/octet-stream',
                          });
                          const url = URL.createObjectURL(blob);

                          const link = document.createElement('a');
                          link.download = 'fechamento.xlsx';
                          link.href = url;

                          document.body.appendChild(link);
                          link.click();

                          document.body.removeChild(link);
                          URL.revokeObjectURL(url);

                          return;
                        }

                        chunks.push(result.value);
                        return reader.read().then(processResult);
                      });
                  });
                }}
                className="ml-[5%] w-[90%]"
                variant="primary"
              >
                Baixar
              </Button>
            </div>
          </NavDropdown>

          <h2 className="absolute left-[45vw]">{pageName}</h2>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
