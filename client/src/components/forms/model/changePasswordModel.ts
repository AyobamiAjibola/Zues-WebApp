import * as Yup from 'yup';

const fields = {
  password: {
    name: 'password',
    label: 'Password*',
    error: {
      invalid: `Password must contain 8 to 20 characters,
         and at least One, uppercase letter, lowercase letter, 
         and number`,
      required: 'Password is required',
    },
  },
  confirmPassword: {
    name: 'confirmPassword',
    label: 'Confirm Password*',
    error: {
      invalid: `Confirm Password must contain 8 to 20 characters,
         and at least One, uppercase letter, lowercase letter, 
         and number`,
      required: 'Confirm Password is required',
    },
  },
};

const initialValues = {
  password: '',
  confirmPassword: ''
};

const schema = Yup.object().shape({
  password: Yup.string()
    .required(fields.password.error.required)
    .label(fields.password.label),
  confirmPassword: Yup.string()
    .required(fields.confirmPassword.error.required)
    .label(fields.confirmPassword.label),
});

const changePasswordModel = {
  fields,
  initialValues,
  schema,
};

export default changePasswordModel;
