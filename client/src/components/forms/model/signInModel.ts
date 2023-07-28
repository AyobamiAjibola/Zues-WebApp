import * as Yup from 'yup';

const fields = {
  email: {
    name: 'email',
    label: 'email*',
    error: {
      invalid: 'Invalid email.',
      required: 'Email is required',
    },
  },
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
};

const initialValues = {
  email: '',
  password: '',
};

const schema = Yup.object().shape({
  email: Yup.string().required(fields.email.error.required).label(fields.email.label),
  password: Yup.string()
    .required(fields.password.error.required)
    .label(fields.password.label),
});

const signInModel = {
  fields,
  initialValues,
  schema,
};

export default signInModel;
