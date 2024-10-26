import Loader from '@/components/common/Loader';
import dynamic from 'next/dynamic';

const TaskCreateComponent = dynamic(() => import('../../components/TaskCreate'), {
  ssr: false,
  loading: () => <Loader/>

});

const Page = () => <TaskCreateComponent />;

export default Page;


