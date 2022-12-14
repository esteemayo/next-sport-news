import { lazy, Suspense } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Meta from '@/components/Meta';
import Spinner from '@/components/Spinner';
import { parseCookie } from '@/utils/index';
import { deleteSport, getUserSports } from '@/services/sportService';

const NewsDashboard = lazy(() => import('@/components/NewsDashboard'));

const Dashboard = ({ news }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteSport(id);
      router.push('/news');
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <>
      <Meta title='Dashboard' />
      <h1>Dashboard</h1>
      <h3>My News</h3>
      <Suspense fallback={<Spinner />}>
        {news.map((item) => {
          return (
            <NewsDashboard key={item._id} {...item} onDelete={handleDelete} />
          );
        })}
      </Suspense>
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { accessToken } = parseCookie(req);

  if (!accessToken || accessToken === '') {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const { data } = await getUserSports(accessToken);

  return {
    props: {
      news: data.sports,
      token: accessToken,
    },
  };
};

export default Dashboard;
