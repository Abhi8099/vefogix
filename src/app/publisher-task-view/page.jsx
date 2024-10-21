

import dynamic from 'next/dynamic';

// Dynamic import without server-side rendering (SSR)
const MyComponent_NoSSR = dynamic(() => import('../../components/TaskView'), {
  ssr: false
});

const Page = () => <MyComponent_NoSSR />;

export default Page;
