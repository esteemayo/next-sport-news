import Head from 'next/head';

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width,initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta charSet='utf-8' />
      <link rel='icon' href='/favicon.ico' />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: 'Sport News | Find Latest Sport News',
  description: 'A website that brings you latest news about sports',
  keywords: 'football, f1, tennis, cricket, badminton, boxing, golf, netball',
};

export default Meta;
