import AddClientForm from '../../components/forms/AddClientForm';
import EditClientForm from '../../components/forms/EditClientForm';
import SearchClientForm from '../../components/forms/SearchClientForm';
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
        AddForm={AddClientForm}
        EditForm={EditClientForm}
        headers={['ID', 'Nome', 'Telefone']}
        fields={{ id: true, name: true, phone: true }}
        url="/client"
        name="Cliente"
        SearchForm={SearchClientForm}
      />
    </>
  );
};

export default Clients;

Clients.getLayout = (page) => {
  return <PrimaryLayout pageName="Clientes">{page}</PrimaryLayout>;
};
