import Link from 'next/link';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '@/components/Spinner';
import styles from '@/styles/AuthForm.module.css';
import { loginUser, reset } from '@/features/auth/authSlice';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => ({ ...state.auth })
  );

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = {
      email,
      password,
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
      <div className={styles.auth}>
        <h1>
          <FaUser /> Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
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

export default Login;
