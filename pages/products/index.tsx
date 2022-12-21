import AddProductForm from '../../components/forms/AddProductForm';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import MyPage from '../../components/pages/MyPageTable';
import { Product } from '../../types/types';
import { NextPageWithLayout } from '../page';
export interface IProducts {
  products: Product[];
}

const Products: NextPageWithLayout<IProducts> = () => {
  return (
    <>
      <MyPage
        filter={{ sellId: null }}
        name="Produto"
        size="lg"
        AddForm={AddProductForm}
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
        url="/product "
      />
    </>
  );
};

export default Products;

Products.getLayout = (page) => {
  return <PrimaryLayout pageName="Produtos">{page}</PrimaryLayout>;
};
