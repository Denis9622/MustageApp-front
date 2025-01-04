import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './BookingForm.module.css';
import { appointmentSchema } from '../Validation/ValidationSchema';

const timeOptions = [
  { value: '09:00', label: '09:00 AM' },
  { value: '09:30', label: '09:30 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '10:30', label: '10:30 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '11:30', label: '11:30 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '12:30', label: '12:30 PM' },
  { value: '13:00', label: '01:00 PM' },
];

const CustomSelect = ({ field, form, options, placeholder }) => (
  <div className={styles.formGroup}>
    <div className={styles.selectWrapper}>
      <select
        {...field}
        className={`${styles.selectInput} ${styles.selectInputWithIcon}`}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
    {form.touched[field.name] && form.errors[field.name] && (
      <p className={styles.error}>{form.errors[field.name]}</p>
    )}
  </div>
);

const BookingForm = () => (
  <div className={styles.formContainer}>
    <h2 className={styles.title}>Book your campervan now</h2>
    <Formik
      initialValues={{
        name: '',
        email: '',
        bookingDate: '',
        time: '',
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
              placeholder="Name"
              className={styles.input}
            />
            <ErrorMessage name="name" component="p" className={styles.error} />
          </div>
          <div className={styles.formGroup}>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input}
            />
            <ErrorMessage name="email" component="p" className={styles.error} />
          </div>
          <div className={styles.formGroup}>
            <Field type="date" name="bookingDate" className={styles.input} />
            <ErrorMessage
              name="bookingDate"
              component="p"
              className={styles.error}
            />
          </div>
          <div className={styles.formGroup}>
            <Field
              name="time"
              options={timeOptions}
              placeholder="Meeting Time"
              component={CustomSelect}
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
