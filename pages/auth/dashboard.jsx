import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { parseCookie } from '../../utils';
import NewsDashboard from '@/components/NewsDashboard';
import { deleteSport, getUserSports } from '@/services/sportService';

const Dashboard = ({ news }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Are you sure that you wanted to delete news?')) {
        await deleteSport(id);
        router.push('/news');
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <h3>My News</h3>
      {news.map((item) => {
        return (
          <NewsDashboard key={item._id} {...item} onDelete={handleDelete} />
        );
      })}
    </div>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { accessToken } = parseCookie(req);

  if (!accessToken) {
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
