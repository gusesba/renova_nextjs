import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import MyTable from '../../components/table/MyTable';
import { NextPageWithLayout } from '../page';

const Clients: NextPageWithLayout = () => {
  return (
    <>
      <MyTable
        headers={['ID', 'Nome', 'Telefone']}
        rows={[
          [1, 'Gustavo Esmanhotto Bareta', '41997173484'],
          [2, 'Elaine Esmanhotto Bareta', '41998742498'],
        ]}
      />
    </>
  );
};

export default Clients;

Clients.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
