import PropTypes from 'prop-types';

const TextArea = ({ name, label, ...rest }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea {...rest} name={name} id={name}></textarea>
    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string
};

export default TextArea;
