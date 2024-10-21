

import dynamic from 'next/dynamic';

const TaskCreateComponent = dynamic(() => import('../../components/TaskCreate'), {
  ssr: false
});

const Page = () => <TaskCreateComponent />;

export default Page;


