import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { addInputs } from '../../data';
import TextArea from '@/components/TextArea';
import styles from '@/styles/Form.module.css';
import FormInput from '@/components/FormInput';
import { createSport } from '@/services/sportService';

const initialState = {
  name: '',
  detail: '',
  date: '',
  time: '',
};

const Add = () => {
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState(initialState);

  const handleChange = (input) => {
    const { name, value } = input;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyFieldCheck = Object.values(formData).some((item) => item === '');

    if (emptyFieldCheck) {
      return toast.error('Please fill all input field');
    }

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'sports');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/learnhowtocode/image/upload',
        data
      );

      const { url } = res.data;

      const newsData = {
        ...formData,
        image: url,
      };

      const {
        data: { sport },
      } = await createSport({ ...newsData });

      router.push(`/news/${sport.slug}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Link href='/news' passHref>
        Go Back
      </Link>
      <h2>Add Sport New</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          {addInputs.map((input) => {
            const { id, name, type, label } = input;
            return (
              <FormInput
                key={id}
                type={type}
                name={name}
                label={label}
                onChange={({ target }) =>
                  type === 'file'
                    ? setFile(target.files[0])
                    : handleChange(target)
                }
              />
            );
          })}
        </div>
        <TextArea
          name='detail'
          label='Detail'
          onChange={({ target }) => handleChange(target)}
        />

        <input type='submit' value='Add News' className='btn' />
      </form>
    </>
  );
};

export default Add;
