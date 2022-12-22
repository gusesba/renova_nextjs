import AddProductForm from '../../components/forms/AddProductForm';
import SearchProductForm from '../../components/forms/SearchProductForm';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import MyPage from '../../components/pages/MyPageTable';
import { Product } from '../../types/types';
import { NextPageWithLayout } from '../page';
export interface ISells {
  sells: Product[];
}

const Sells: NextPageWithLayout<ISells> = () => {
  return (
    <>
      <MyPage
        filter={{ NOT: { sellId: null } }}
        name="Saídas"
        size="lg"
        AddForm={AddProductForm}
        SearchForm={SearchProductForm}
        headers={[
          'ID',
          'Preço',
          'Preço Venda',
          'Tipo',
          'Comprador',
          'Produto',
          'Marca',
          'Tamanho',
          'Cor',
          'Fornecedor',
          'Descrição',
          'Entrada',
        ]}
        fields={{
          id: true,
          price: true,
          sellPrice: true,
          sell: {
            select: {
              type: true,
              buyer: {
                select: {
                  name: true,
                },
              },
            },
          },
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
        url="/sell"
      />
    </>
  );
};

export default Sells;

Sells.getLayout = (page) => {
  return <PrimaryLayout pageName="Saídas">{page}</PrimaryLayout>;
};
