import Link from 'next/link';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Meta from '@/components/Meta';
import { loginInputs } from '../../data';
import Spinner from '@/components/Spinner';
import { parseCookie } from '@/utils/index';
import FormInput from '@/components/FormInput';
import styles from '@/styles/AuthForm.module.css';
import { loginUser, reset } from '@/features/auth/authSlice';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => ({ ...state.auth })
  );

  const [formData, setFormData] = useState(null);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = {
      ...formData,
    };

    dispatch(loginUser({ credentials, toast }));
  };

  useEffect(() => {
    isError && toast.error(message);
    user && isSuccess && router.push('/auth/dashboard');
    dispatch(reset());
  }, [user, isError, isSuccess, message, router, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Meta title='User Login' />
      <div className={styles.auth}>
        <h1>
          <FaUser /> Login
        </h1>
        <form onSubmit={handleSubmit}>
          {loginInputs.map((input) => {
            const { id, type, name, label, placeholder } = input;
            return (
              <FormInput
                key={id}
                type={type}
                name={name}
                label={label}
                placeholder={placeholder}
                onChange={handleChange}
              />
            );
          })}
          <input type='submit' value='Login' className='btn' />
        </form>
        <p>
          Don&apos;t have an account?{' '}
          <Link href='/auth/register' passHref>
            Register
          </Link>
        </p>
      </div>
    </>
  );
};

export const getServerSideProps = ({ req }) => {
  const { accessToken } = parseCookie(req);

  if (accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
