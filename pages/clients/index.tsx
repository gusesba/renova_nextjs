import AddClientForm from '../../components/forms/AddClientForm';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import MyPage from '../../components/pages/MyPageTable';
import { Client } from '../../types/types';
import { NextPageWithLayout } from '../page';
export interface IClients {
  clients: Client[];
}

const Clients: NextPageWithLayout<IClients> = () => {
  return (
    <>
      <MyPage
        ModalBody={AddClientForm}
        headers={['ID', 'Nome', 'Telefone']}
        fields={{ id: true, name: true, phone: true }}
        url="/client"
        name="Cliente"
      />
    </>
  );
};

export default Clients;

Clients.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
