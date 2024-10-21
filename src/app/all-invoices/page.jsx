

import dynamic from 'next/dynamic';

const AllInvoice = dynamic(() => import('../../components/AllInvoice'), {
  ssr: false
});

const Page = () => <AllInvoice />;

export default Page;


