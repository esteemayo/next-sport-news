import Link from 'next/link';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Spinner } from '@/components/Spinner';
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
    (state) => ({
      ...state.auth,
    })
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
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Name</label>
            <input id='name' type='text' name='name' onChange={handleChange} />
          </div>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              id='username'
              type='text'
              name='username'
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              name='email'
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              name='password'
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='passwordConfirm'>Confirm Password</label>
            <input
              id='passwordConfirm'
              type='password'
              name='passwordConfirm'
              onChange={handleChange}
            />
          </div>
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

export default Register;
