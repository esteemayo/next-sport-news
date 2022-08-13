import { useState } from 'react';

import FormInput from './FormInput';
import styles from '@/styles/Form.module.css';
import { updateSport } from '@/services/sportService';
import { uploadImage } from '@/services/imageService';

const ImageUpload = ({ newsId, formData, imageUpload }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'sports');

    try {
      const res = await uploadImage(data);

      const { url } = res.data;
      const updatedNews = {
        ...formData,
        image: url,
      };

      const { status } = await updateSport(newsId, updatedNews);

      if (status === 200) {
        imageUpload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.form}>
      <h4>Upload Sport News Image</h4>
      <form onSubmit={handleSubmit}>
        <FormInput
          type='file'
          className={styles.file}
          onChange={({ target }) => setFile(target.files[0])}
        />
        <input type='submit' value='Upload' className='btn' />
      </form>
    </div>
  );
};

export default ImageUpload;
