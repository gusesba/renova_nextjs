import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import ChangeClientForm from '../../components/forms/ChangeClientForm';
import EditForm from '../../components/forms/EditProductForm';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import MyModal from '../../components/modal/MyModal';
import MyTable from '../../components/table/MyTable';
import { baseURL } from '../../config/config';
import AlertContext from '../../contexts/AlertContext';
import { printEtiqueta } from '../../printers/printers';

import { NextPageWithLayout } from '../page';
export interface IClient {}

const Client: NextPageWithLayout<IClient> = () => {
  const [modal, setModal] = useState('changeClient');
  const [selectedRows, _setSelectedRows] = useState([] as Array<number>);
  const selectedRowsRef = useRef(selectedRows);
  const [selected, setSelected] = useState('stock');
  const [clientId, setClientId] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [values, setValues] = useState({
    dateMin: new Date('01-01-2000').toString(),
    dateMax: new Date(Date.now()).toString(),
  });
  const [upload, setUpload] = useState(0);

  const [header, setHeader] = useState({
    name: 'Nome',
    phone: 'Telefone',
    buys: 0,
    sells: 0,
    totalBuys: '0',
    totalSells: '0',
  });

  const { setAlerts } = useContext(AlertContext) as any;

  const handleDelete = () => {
    const body = {
      ids: selectedRowsRef.current,
    };

    fetch(`${baseURL}${selected == 'stock' ? '/product' : '/sell'}`, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data.count);
          setAlerts((oldAlerts: any) => {
            return [
              ...oldAlerts,
              {
                variant: 'success',
                message: data.count + ' ' + name + ' Excluídos',
              },
            ];
          });
          setTimeout(() => {
            setAlerts((oldAlerts: any) => {
              return oldAlerts.slice(1);
            });
          }, 3000);
          setSelectedRows([]);
          document
            .querySelectorAll('[type="checkbox"]')
            .forEach((checkbox: any) => (checkbox.checked = false));
        }
      });
  };

  const setSelectedRows = (data: any) => {
    selectedRowsRef.current = data;
    _setSelectedRows(data);
  };

  useEffect(() => {
    fetch(baseURL + '/client', {
      body: JSON.stringify({
        action: 'GETCLIENTHEADER',
        id: clientId,
        dateMax: values.dateMax,
        dateMin: values.dateMin,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setHeader(data);
        }
      });
  }, [clientId, values.dateMax, values.dateMin, upload]);

  const onChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <MyModal
        show={modalShow}
        setShow={setModalShow}
        title={modal == 'changeClient' ? 'Mudar Cliente' : 'Editar Produto'}
        submitText={modal == 'changeClient' ? 'Mudar' : 'Editar'}
        size={modal == 'changeClient' ? undefined : 'lg'}
      >
        {modal == 'changeClient' ? (
          <ChangeClientForm setClientId={setClientId} />
        ) : (
          <EditForm id={selectedRows[0]} setUpload={setUpload} />
        )}
      </MyModal>
      <section>
        <div className="flex mt-[1.5rem] justify-center">
          <div className="mr-[1rem] w-[20rem] ">
            <div className="max-w-sm rounded overflow-hidden shadow-md relative h-[27rem]">
              <Image
                src={'/client.png'}
                alt="client image"
                width={150}
                height={150}
                className="ml-auto mr-auto mt-[1rem]"
              />
              <div className="px-6 py-4 text-center">
                <div className="flex font-bold text-[1.5rem] mb-2 items-center justify-center">
                  {header.name}{' '}
                  <span
                    onClick={() => setModalShow(true)}
                    className="bg-blue-900 text-white p-[0.3em] ml-[0.2em] mt-[0.2em] rounded-full cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-down-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
                      />
                    </svg>
                  </span>
                </div>
                <p className="text-gray-700 text-base text-[1rem] font-semibold">
                  {header.phone}
                </p>

                <div className="flex justify-around">
                  <Form.Group className="mb-3 w-[48%]" controlId="formDateMin">
                    <Form.Label>Data Min</Form.Label>

                    <Form.Control
                      type="date"
                      placeholder="Data Mínima"
                      value={values.dateMin}
                      name={'dateMin'}
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 w-[48%]" controlId="formDateMax">
                    <Form.Label>Max</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Data Máxima"
                      value={values.dateMax}
                      name={'dateMax'}
                      onChange={onChange}
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
          </div>
          <div className="mr-[1rem] w-[20rem]">
            <div className="max-w-sm rounded overflow-hidden shadow-md relative h-[13rem]">
              <div className="px-6 py-4">
                <div className="font-bold text-[2rem] mb-2">Compras</div>
                <hr className="mb-[2rem] text-gray-400" />
                <p className="text-gray-700 text-base text-[2.5rem] font-semibold">
                  {header.buys}{' '}
                  <span className="text-gray-500 text-base text-[0.4em] font-semibold">
                    Peças
                  </span>
                </p>
              </div>
              <div className=" font-semibold text-green-600 absolute bottom-[1rem] right-[1rem]">
                Vendas Aumentaram
              </div>
            </div>
            <div className="mt-[1rem] max-w-sm rounded overflow-hidden shadow-md relative h-[13rem]">
              <div className="px-6 py-4">
                <div className="font-bold text-[2rem] mb-2">Valor Comprado</div>
                <hr className="mb-[2rem] text-gray-400" />
                <p className="text-gray-700 text-base text-[2.5rem] font-semibold">
                  {header.totalBuys}{' '}
                  <span className="text-gray-500 text-base text-[0.4em] font-semibold">
                    R$
                  </span>
                </p>
              </div>
              <div className=" font-semibold text-green-600 absolute bottom-[1rem] right-[1rem]">
                Vendas Aumentaram
              </div>
            </div>
          </div>

          <div className="w-[20rem]">
            <div className="max-w-sm rounded overflow-hidden shadow-md relative h-[13rem]">
              <div className="px-6 py-4">
                <div className="font-bold text-[2rem] mb-2">Vendas</div>
                <hr className="mb-[2rem] text-gray-400" />
                <p className="text-gray-700 text-base text-[2.5rem] font-semibold">
                  {header.sells}{' '}
                  <span className="text-gray-500 text-base text-[0.4em] font-semibold">
                    Peças
                  </span>
                </p>
              </div>
              <div className=" font-semibold text-green-600 absolute bottom-[1rem] right-[1rem]">
                Vendas Aumentaram
              </div>
            </div>
            <div className="mt-[1rem] max-w-sm rounded overflow-hidden shadow-md relative h-[13rem]">
              <div className="px-6 py-4">
                <div className="font-bold text-[2rem] mb-2">Valor Vendido</div>
                <hr className="mb-[2rem] text-gray-400" />
                <p className="text-gray-700 text-base text-[2.5rem] font-semibold">
                  {header.totalSells}{' '}
                  <span className="text-gray-500 text-base text-[0.4em] font-semibold">
                    R$
                  </span>
                </p>
              </div>
              <div className=" font-semibold text-green-600 absolute bottom-[1rem] right-[1rem]">
                Vendas Aumentaram
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="flex mt-[2rem] space-x-[4rem]">
          <div
            className="cursor-pointer"
            onClick={() => {
              setSelected('stock');
            }}
          >
            <span
              className={
                selected == 'stock'
                  ? 'text-blue-800 text-base text-[1.3em] font-semibold'
                  : 'text-gray-700 text-base text-[1.3em] font-semibold'
              }
            >
              Estoque
            </span>
            {selected == 'stock' ? (
              <hr className="w-[3em] text-blue-800 h-[0.35em] bg-blue-800 rounded-md" />
            ) : null}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setSelected('sells');
            }}
          >
            <span
              className={
                selected == 'sells'
                  ? 'text-blue-800 text-base text-[1.3em] font-semibold'
                  : 'text-gray-700 text-base text-[1.3em] font-semibold'
              }
            >
              Vendidos
            </span>
            {selected == 'sells' ? (
              <hr className="w-[3em] text-blue-800 h-[0.35em] bg-blue-800 rounded-md" />
            ) : null}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setSelected('buys');
            }}
          >
            <span
              className={
                selected == 'buys'
                  ? 'text-blue-800 text-base text-[1.3em] font-semibold'
                  : 'text-gray-700 text-base text-[1.3em] font-semibold'
              }
            >
              Comprados
            </span>
            {selected == 'buys' ? (
              <hr className="w-[3em] text-blue-800 h-[0.35em] bg-blue-800 rounded-md" />
            ) : null}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setSelected('borrowed');
            }}
          >
            <span
              className={
                selected == 'borrowed'
                  ? 'text-blue-800 text-base text-[1.3em] font-semibold'
                  : 'text-gray-700 text-base text-[1.3em] font-semibold'
              }
            >
              Emprestados
            </span>
            {selected == 'borrowed' ? (
              <hr className="w-[3em] text-blue-800 h-[0.35em] bg-blue-800 rounded-md" />
            ) : null}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setSelected('borrow');
            }}
          >
            <span
              className={
                selected == 'borrow'
                  ? 'text-blue-800 text-base text-[1.3em] font-semibold'
                  : 'text-gray-700 text-base text-[1.3em] font-semibold'
              }
            >
              Empréstimos
            </span>
            {selected == 'borrow' ? (
              <hr className="w-[3em] text-blue-800 h-[0.35em] bg-blue-800 rounded-md" />
            ) : null}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setSelected('devolution');
            }}
          >
            <span
              className={
                selected == 'devolution'
                  ? 'text-blue-800 text-base text-[1.3em] font-semibold'
                  : 'text-gray-700 text-base text-[1.3em] font-semibold'
              }
            >
              Devolvidos
            </span>
            {selected == 'devolution' ? (
              <hr className="w-[3em] text-blue-800 h-[0.35em] bg-blue-800 rounded-md" />
            ) : null}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setSelected('donated');
            }}
          >
            <span
              className={
                selected == 'donated'
                  ? 'text-blue-800 text-base text-[1.3em] font-semibold'
                  : 'text-gray-700 text-base text-[1.3em] font-semibold'
              }
            >
              Doados
            </span>
            {selected == 'donated' ? (
              <hr className="w-[3em] text-blue-800 h-[0.35em] bg-blue-800 rounded-md" />
            ) : null}
          </div>
        </div>

        <div className="mb-[2rem] ml-auto mr-auto">
          <MyTable
            headers={
              selected == 'stock'
                ? [
                    'ID',
                    'Preço',
                    'Entrada',
                    'Produto',
                    'Marca',
                    'Tamanho',
                    'Cor',
                    'Fornecedor',
                    'Descrição',
                  ]
                : selected == 'sells' || selected == 'buys'
                ? [
                    'ID',
                    'Preço',
                    'Venda',
                    'Saída',
                    'Entrada',
                    'Produto',
                    'Marca',
                    'Tamanho',
                    'Cor',
                    'Fornecedor',
                    'Descrição',
                  ]
                : [
                    'ID',
                    'Preço',
                    'Saída',
                    'Entrada',
                    'Produto',
                    'Marca',
                    'Tamanho',
                    'Cor',
                    'Fornecedor',
                    'Descrição',
                  ]
            }
            filter={
              selected == 'stock'
                ? {
                    providerId: clientId,
                    sellPrice: null,
                  }
                : selected == 'sells'
                ? {
                    providerId: clientId,
                    sellPrice: { not: null },
                    sell: {
                      createdAt: {
                        gte: new Date(values.dateMin),
                        lte: new Date(values.dateMax),
                      },
                      type: 'Venda',
                    },
                  }
                : selected == 'buys'
                ? {
                    sell: {
                      buyerId: clientId,
                      type: 'Venda',
                      createdAt: {
                        gte: new Date(values.dateMin),
                        lte: new Date(values.dateMax),
                      },
                    },
                  }
                : selected == 'borrowed'
                ? {
                    providerId: clientId,
                    sellPrice: { not: null },
                    sell: {
                      createdAt: {
                        gte: new Date(values.dateMin),
                        lte: new Date(values.dateMax),
                      },
                      type: 'Emprestimo',
                    },
                  }
                : selected == 'borrow'
                ? {
                    sell: {
                      buyerId: clientId,
                      type: 'Emprestimo',
                      createdAt: {
                        gte: new Date(values.dateMin),
                        lte: new Date(values.dateMax),
                      },
                    },
                  }
                : selected == 'devolution'
                ? {
                    providerId: clientId,
                    sellPrice: { not: null },
                    sell: {
                      createdAt: {
                        gte: new Date(values.dateMin),
                        lte: new Date(values.dateMax),
                      },
                      type: 'Devolucao',
                    },
                  }
                : {
                    providerId: clientId,
                    sellPrice: { not: null },
                    sell: {
                      createdAt: {
                        gte: new Date(values.dateMin),
                        lte: new Date(values.dateMax),
                      },
                      type: 'Doacao',
                    },
                  }
            }
            url={'/product'}
            fields={
              selected == 'stock'
                ? {
                    id: true,
                    price: true,
                    entry: true,
                    product: true,
                    brand: true,
                    size: true,
                    color: true,
                    provider: {
                      select: {
                        name: true,
                      },
                    },
                    description: true,
                  }
                : selected == 'sells' || selected == 'buys'
                ? {
                    id: true,
                    price: true,
                    sellPrice: true,
                    sell: { select: { createdAt: true } },
                    entry: true,
                    product: true,
                    brand: true,
                    size: true,
                    color: true,
                    provider: {
                      select: {
                        name: true,
                      },
                    },
                    description: true,
                  }
                : {
                    id: true,
                    price: true,
                    sell: { select: { createdAt: true } },
                    entry: true,
                    product: true,
                    brand: true,
                    size: true,
                    color: true,
                    provider: {
                      select: {
                        name: true,
                      },
                    },
                    description: true,
                  }
            }
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            upload={1}
          />
        </div>
      </section>
      <div className="group fixed flex flex-col right-[10vw] top-[90vh]">
        <div className="absolute bottom-[0] right-[-5rem] hidden flex-col pb-3 group-hover:flex w-[7.5rem] items-center">
          <button
            onClick={handleDelete}
            className="bg-[#000] text-white w-10 h-10 rounded-md hover:bg-gray-300 transition-all duration-300 mb-[13.5px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash ml-[11px]"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>

          {selected == 'stock' ? (
            <button
              onClick={() => printEtiqueta(selectedRows)}
              className="bg-[#000] text-white w-10 h-10 rounded-md hover:bg-gray-300 transition-all duration-300 mb-[13.5px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-printer ml-[11px]"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
              </svg>
            </button>
          ) : null}

          {selected == 'stock' ? (
            <button
              onClick={() => {
                if (selectedRows.length == 1) {
                  setModal('edit');
                  setModalShow(true);
                }
              }}
              className="bg-[#000] text-white w-10 h-10 rounded-md hover:bg-gray-300 transition-all duration-300 mb-[13.5px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil ml-[11px]"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
            </button>
          ) : null}
        </div>
        <button className="bg-[#000] absolute text-white w-10 h-10 rounded-md hover:bg-gray-300 group transition-all duration-300">
          C
        </button>
      </div>
    </>
  );
};

export default Client;

Client.getLayout = (page) => {
  return <PrimaryLayout pageName="Cliente">{page}</PrimaryLayout>;
};
