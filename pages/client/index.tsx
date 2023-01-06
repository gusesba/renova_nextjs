import Image from 'next/image';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';

import { NextPageWithLayout } from '../page';
export interface IClient {}

const Client: NextPageWithLayout<IClient> = () => {
  return (
    <>
      <div className="flex mt-[1.5rem]">
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
    </>
  );
};

export default Client;

Client.getLayout = (page) => {
  return <PrimaryLayout pageName="Cliente">{page}</PrimaryLayout>;
};
