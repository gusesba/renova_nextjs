import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import MyPage from '../../components/pages/MyPageSell';
import { NextPageWithLayout } from '../page';
export interface INew {}

const New: NextPageWithLayout<INew> = () => {
  return <MyPage />;
};

export default New;

New.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
