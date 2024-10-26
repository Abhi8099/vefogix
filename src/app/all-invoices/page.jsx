import Loader from '@/components/common/Loader';
import dynamic from 'next/dynamic';

const AllInvoice = dynamic(() => import('../../components/AllInvoice'), {
  ssr: false,
  loading: () => <Loader/>

});

const Page = () => <AllInvoice />;

export default Page;


