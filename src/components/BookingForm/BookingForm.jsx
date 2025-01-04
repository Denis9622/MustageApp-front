import { Formik, useField, Form, Field, ErrorMessage } from 'formik';
import styles from './BookingForm.module.css';
import { appointmentSchema } from '../Validation/ValidationSchema';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({ name, ...props }) => {
  const [field, , helpers] = useField(name);

  return (
    <DatePicker
      selected={(field.value && new Date(field.value)) || null}
      onChange={val => helpers.setValue(val)}
      placeholderText="Booking date*"
      {...props}
    />
  );
};

const BookingForm = () => (
  <div className={styles.formContainer}>
    <h2 className={styles.title}>Book your campervan now</h2>
    <p className={styles.textclass}>
      Stay connected! We are always ready to help you.
    </p>
    <Formik
      initialValues={{
        name: '',
        email: '',
        bookingDate: '',
        comment: '',
      }}
      validationSchema={appointmentSchema}
      onSubmit={values => {
        console.log('Booking request data:', values);
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <Field
              type="text"
              name="name"
              placeholder="Name*"
              className={styles.input}
            />
            <ErrorMessage name="name" component="p" className={styles.error} />
          </div>
          <div className={styles.formGroup}>
            <Field
              type="email"
              name="email"
              placeholder="Email*"
              className={styles.input}
            />
            <ErrorMessage name="email" component="p" className={styles.error} />
          </div>
          <div className={styles.formGroup}>
            <DateInput name="bookingDate" className={styles.input} />
            <ErrorMessage
              name="bookingDate"
              component="p"
              className={styles.error}
            />
          </div>
          <div className={styles.formGroup}>
            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              className={styles.input}
            />
            <ErrorMessage
              name="comment"
              component="p"
              className={styles.error}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Send
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default BookingForm;
