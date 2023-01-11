import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import ChangeClientForm from '../../components/forms/ChangeClientForm';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import MyModal from '../../components/modal/MyModal';
import MyTable from '../../components/table/MyTable';
import { baseURL } from '../../config/config';

import { NextPageWithLayout } from '../page';
export interface IClient {}

const Client: NextPageWithLayout<IClient> = () => {
  const [selectedRows, _setSelectedRows] = useState([] as Array<number>);
  const selectedRowsRef = useRef(selectedRows);
  const [selected, setSelected] = useState('stock');
  const [clientId, setClientId] = useState(22);
  const [modalShow, setModalShow] = useState(false);
  const [values, setValues] = useState({
    dateMin: new Date('01-01-2000').toString(),
    dateMax: new Date(Date.now()).toString(),
  });

  const [header, setHeader] = useState({
    name: 'Nome',
    phone: 'Telefone',
    buys: 0,
    sells: 0,
    totalBuys: '0',
    totalSells: '0',
  });

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
  }, [clientId, values.dateMax, values.dateMin]);

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
        title={'Mudar Cliente'}
        submitText={'Mudar'}
      >
        <ChangeClientForm setClientId={setClientId} />
      </MyModal>
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
      </div>

      <div className="mb-[2rem] ml-auto mr-auto">
        <MyTable
          headers={[
            'ID',
            'Preço',
            'Produto',
            'Marca',
            'Tamanho',
            'Cor',
            'Fornecedor',
            'Descrição',
            'Entrada',
          ]}
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
                  },
                }
              : {
                  sell: {
                    buyerId: clientId,
                    createdAt: {
                      gte: new Date(values.dateMin),
                      lte: new Date(values.dateMax),
                    },
                  },
                }
          }
          url={'/product'}
          fields={{
            id: true,
            price: true,
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
            entry: true,
          }}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          upload={1}
        />
      </div>
    </>
  );
};

export default Client;

Client.getLayout = (page) => {
  return <PrimaryLayout pageName="Cliente">{page}</PrimaryLayout>;
};
