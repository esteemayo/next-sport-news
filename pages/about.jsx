import Meta from '@/components/Meta';

const About = ({ title }) => {
  return (
    <>
      <Meta title='About Sport News' />
      <h1>{title}</h1>
      <p>
        App to find out Sport news like Football, F1, Tennis, Cricket, Boxing,
        Golf etc
      </p>
    </>
  );
};

About.defaultProps = {
  title: 'About',
};

export default About;
