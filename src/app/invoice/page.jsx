

import dynamic from 'next/dynamic';

const AllInvoice = dynamic(() => import('../../components/custom-invoice'), {
  ssr: false
});

const Page = () => <AllInvoice />;

export default Page;


