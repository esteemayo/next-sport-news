import Link from 'next/link';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginInputs } from '../../data';
import Spinner from '@/components/Spinner';
import FormInput from '@/components/FormInput';
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
          {loginInputs.map((input) => {
            const { id, type, name, label, placeholder } = input;
            return (
              <FormInput
                key={id}
                type={type}
                name={name}
                label={label}
                placeholder={placeholder}
                onChange={({ target }) => setEmail(target.value)}
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

export default Login;
