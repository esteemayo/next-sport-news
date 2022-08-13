import PropTypes from 'prop-types';

const FormInput = ({ name, label, className, ...rest }) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} />
    </div>
  );
};

FormInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

export default FormInput;
