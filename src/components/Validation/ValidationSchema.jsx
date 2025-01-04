import * as yup from 'yup';

export const appointmentSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .matches(/^\+380\d{9}$/, 'Phone number must be in format +380xxxxxxxxx')
    .required('Phone number is required'),
  comment: yup.string().required('Comment is required'),
  date: yup.date().required('Date is required'),
  time: yup.string().required('Time is required'),
});
