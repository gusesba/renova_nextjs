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
        name="Produto"
        size="lg"
        ModalBody={AddProductForm}
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
        fields={[
          'id',
          'price',
          'product',
          'brand',
          'size',
          'color',
          'providerId',
          'description',
          'entry',
        ]}
        url="/product "
      />
    </>
  );
};

export default Products;

Products.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
