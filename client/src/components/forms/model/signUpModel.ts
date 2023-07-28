import * as Yup from 'yup';
import { PASSWORD_PATTERN } from '../../../config/constants';

export interface ISignUpModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const fields = {
  firstName: {
    name: 'firstName',
    label: 'First Name*',
    error: {
      invalid: 'Invalid First Name.',
      required: 'First Name is required',
    },
  },
  lastName: {
    name: 'lastName',
    label: 'Last Name*',
    error: {
      invalid: `Invalid Last Name`,
      required: 'Last Name is required',
    },
  },
  email: {
    name: 'email',
    label: 'Email*',
    error: {
      invalid: 'Invalid email.',
      required: 'Email is required',
    },
  },
  password: {
    name: 'password',
    label: 'Password*',
    error: {
      invalid: 'Invalid password',
      required: 'Password is required',
    },
  }
};

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const schema = Yup.object().shape({
  firstName: Yup.string()
    .max(80, fields.firstName.error.invalid)
    .label(fields.firstName.label)
    .required(fields.firstName.error.required),
  lastName: Yup.string()
    .max(80, fields.lastName.error.invalid)
    .label(fields.lastName.label)
    .required(fields.lastName.error.required),
  email: Yup.string()
    .email(fields.email.error.invalid)
    .label(fields.email.label)
    .required(fields.email.error.required),
  password: Yup.string()
    .required(fields.password.error.required)
    .matches(new RegExp(PASSWORD_PATTERN), fields.password.error.invalid)
    .label(fields.password.label)
});

const signUpModel = {
  fields,
  initialValues,
  schema,
};

export default signUpModel;
