import { useState } from 'react';
import AddClientForm from '../../components/forms/AddClientForm';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import MyModal from '../../components/modal/MyModal';
import MyTable from '../../components/table/MyTable';
import { Client } from '../../types/types';
import { NextPageWithLayout } from '../page';
export interface IClients {
  clients: Client[];
}

const Clients: NextPageWithLayout<IClients> = () => {
  const [addModalShow, setAddModalShow] = useState(false);
  return (
    <section>
      <MyModal
        show={addModalShow}
        setShow={setAddModalShow}
        name="Cliente"
        ModalBody={AddClientForm}
      />
      <MyTable
        headers={['ID', 'Nome', 'Telefone']}
        url="/client"
        fields={['id', 'name', 'phone']}
      />

      <div className="group fixed flex flex-col right-[10vw] top-[90vh] ">
        <div className="absolute bottom-[0] right-[-2.5rem] hidden flex-col pb-3 group-hover:flex s">
          <button
            onClick={() => setAddModalShow(true)}
            className="bg-[#000] text-white w-10 h-10 rounded-md hover:bg-gray-300 transition-all duration-300"
          >
            +
          </button>
        </div>
        <button className="bg-[#000] absolute text-white w-10 h-10 rounded-md hover:bg-gray-300 group transition-all duration-300">
          C
        </button>
      </div>
    </section>
  );
};

export default Clients;

Clients.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
