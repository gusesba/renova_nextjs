import Image from 'next/image';
import { useRef, useState } from 'react';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import MyTable from '../../components/table/MyTable';

import { NextPageWithLayout } from '../page';
export interface IClient {}

const Client: NextPageWithLayout<IClient> = () => {
  const [selectedRows, _setSelectedRows] = useState([] as Array<number>);
  const selectedRowsRef = useRef(selectedRows);

  const setSelectedRows = (data: any) => {
    selectedRowsRef.current = data;
    _setSelectedRows(data);
  };

  return (
    <>
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
              <div className="font-bold text-[1.5rem] mb-2">
                Gustavo Esmanhotto Bareta
              </div>
              <p className="text-gray-700 text-base text-[1rem] font-semibold">
                (41) 99717-3484
              </p>
            </div>
          </div>
        </div>
        <div className="mr-[1rem] w-[20rem]">
          <div className="max-w-sm rounded overflow-hidden shadow-md relative h-[13rem]">
            <div className="px-6 py-4">
              <div className="font-bold text-[2rem] mb-2">Compras</div>
              <hr className="mb-[2rem] text-gray-400" />
              <p className="text-gray-700 text-base text-[2.5rem] font-semibold">
                50
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
                30
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
                50
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
                30
              </p>
            </div>
            <div className=" font-semibold text-green-600 absolute bottom-[1rem] right-[1rem]">
              Vendas Aumentaram
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-[2rem] space-x-[4rem]">
        <span className="text-gray-700 text-base text-[1.3em] font-semibold">
          Estoque
        </span>
        <span className="text-gray-700 text-base text-[1.3em] font-semibold">
          Vendidos
        </span>
        <span className="text-gray-700 text-base text-[1.3em] font-semibold">
          Comprados
        </span>
      </div>
      <div className="mb-[2rem] ml-auto mr-auto">
        <MyTable
          headers={['ID', 'Nome', 'Telefone']}
          url={'/client'}
          fields={{ id: true, name: true, phone: true }}
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
