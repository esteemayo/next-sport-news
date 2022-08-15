import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Modal from '@/components/Modal';
import TextArea from '@/components/TextArea';
import styles from '@/styles/Form.module.css';
import FormInput from '@/components/FormInput';
import ImageUpload from '@/components/ImageUpload';
import { parseCookie } from '../../../utils/index';
import { getSportById, updateSport } from '@/services/sportService';

const EditNews = ({ news, token }) => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: news.name,
    detail: news.detail,
    date: news.date,
    time: news.time,
  });
  const [imagePreview, setImagePreview] = useState(
    news.image ? news.image : null
  );

  const { name, detail, date, time } = formData;

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyFieldCheck = Object.values(formData).some((item) => item === '');

    if (emptyFieldCheck) {
      return toast.error('Please fill all input field');
    }

    try {
      const { data } = await updateSport(news._id, formData);
      router.push(`/news/${data.sport.slug}`);
    } catch (err) {
      console.log(err);
    }
  };

  const imageUpload = async () => {
    const { data } = await getSportById(news._id, token);

    setImagePreview(data.sport.image);
    setShowModal(false);
  };

  return (
    <>
      <Link href={`/news/${news.slug}`} passHref>
        Go Back
      </Link>
      <h2>Edit Sport New</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <FormInput
            name='name'
            type='text'
            label='Name'
            value={name || ''}
            onChange={handleChange}
          />
          <FormInput
            name='date'
            type='date'
            label='Date'
            value={moment(date).format('yyyy-MM-DD') || ''}
            onChange={handleChange}
          />
          <FormInput
            name='time'
            type='time'
            label='Time'
            value={time || ''}
            onChange={handleChange}
          />
        </div>
        <TextArea
          name='detail'
          label='Detail'
          value={detail || ''}
          onChange={handleChange}
        />
        <input type='submit' value='Update News' className='btn' />
      </form>
      {imagePreview ? (
        <Image src={imagePreview} width={180} height={100} alt={news.name} />
      ) : (
        <div>
          <p>No Image Available</p>
        </div>
      )}
      <div>
        <button onClick={() => setShowModal(true)} className='btn-edit'>
          Update Image
        </button>
      </div>
      {showModal && (
        <Modal onClose={setShowModal}>
          <ImageUpload
            newsId={news._id}
            formData={formData}
            imageUpload={imageUpload}
          />
        </Modal>
      )}
    </>
  );
};

export const getServerSideProps = async ({ req, params: { id } }) => {
  const { accessToken } = parseCookie(req);

  if (!accessToken) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  const { data } = await getSportById(id, accessToken);

  return {
    props: {
      news: data.sport,
      token: accessToken,
    },
  };
};

export default EditNews;
