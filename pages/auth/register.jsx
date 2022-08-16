import Link from 'next/link';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Meta from '@/components/Meta';
import Spinner from '@/components/Spinner';
import { parseCookie } from '@/utils/index';
import { registerInputs } from '../../data';
import FormInput from '@/components/FormInput';
import styles from '@/styles/AuthForm.module.css';
import { registerUser, reset } from '@/features/auth/authSlice';

const initialState = {
  name: '',
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => ({ ...state.auth })
  );

  const [formData, setFormData] = useState(initialState);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { password, passwordConfirm } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return toast.error('Passwords do not match');
    }

    const credentials = {
      ...formData,
    };

    dispatch(registerUser({ credentials, toast }));
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
      <Meta title='User Register' />
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <form onSubmit={handleSubmit}>
          {registerInputs.map((input) => {
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
          <input type='submit' value='Register' className='btn' />
        </form>
        <p>
          Already have an account?{' '}
          <Link href='/auth/login' passHref>
            Login
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

export default Register;
