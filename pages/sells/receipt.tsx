import AddClientForm from '../../components/forms/AddClientForm';
import EditClientForm from '../../components/forms/EditClientForm';
import SearchClientForm from '../../components/forms/SearchClientForm';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import MyPage from '../../components/pages/MyPageTable';
import { NextPageWithLayout } from '../page';
export interface IReceipt {}

const Receipt: NextPageWithLayout<IReceipt> = () => {
  return (
    <>
      <MyPage
        AddForm={AddClientForm}
        EditForm={EditClientForm}
        headers={['ID', 'Tipo', 'Comprador', 'Qtd Produtos', 'Total']}
        fields={{
          id: true,
          type: true,
          buyer: true,
          totalProducts: true,
          totalSellPrice: true,
        }}
        url="/sell/receipt"
        name="Recibos"
        SearchForm={SearchClientForm}
      />
    </>
  );
};

export default Receipt;

Receipt.getLayout = (page) => {
  return <PrimaryLayout pageName="Recibos">{page}</PrimaryLayout>;
};
