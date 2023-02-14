import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from '../page';
export interface IReceipt {}

const Receipt: NextPageWithLayout<IReceipt> = () => {
  return <></>;
};

export default Receipt;

Receipt.getLayout = (page) => {
  return <PrimaryLayout pageName="Recibos">{page}</PrimaryLayout>;
};
