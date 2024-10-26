import Loader from '@/components/common/Loader';
import dynamic from 'next/dynamic';

// Dynamic import without server-side rendering (SSR)
const MyComponent_NoSSR = dynamic(() => import('../../components/TaskView'), {
  ssr: false,
  loading: () => <Loader/>
});

const Page = () => <MyComponent_NoSSR />;

export default Page;
