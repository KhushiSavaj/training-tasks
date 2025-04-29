import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import styles from "./FormHandling.module.scss";

interface FormValues {
  name: string;
  age: number | string;
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Please enter your name")
    .matches(/^[A-Za-z ]+$/, "Name can only alphabets"),
  age: Yup.number()
    .required("Please enter your age")
    .integer("Age can only digits"),
  email: Yup.string()
    .trim()
    .required("Please enter your email")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Please enter your password")
    .matches(/^\S*$/, "Whitespace is not allowed")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must contain at least minimum 8 characters, 1 uppercase, 1 lowercase, 1 digit and 1 special character"
    ),
});

const FormHandling = (props: any) => {
  const { task } = props;
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values: FormValues) => {
    setSubmittedData(values);
    formik.resetForm();
  };

  return (
    <div className={styles.container}>
      <div className={styles.taskDetails}>
        <div className={styles.taskName}>
          {task?.id}.{task?.title}
        </div>
        <div className={styles.taskDescription}>{task?.description}</div>
      </div>
      <form onSubmit={formik.handleSubmit} className={styles.formSection}>
        <div className={styles.fieldsGrid}>
          <div className={styles.field}>
            <label className={styles.label}>{`Name`}</label>
            <input
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your name"
              className={`${styles.inputField} ${
                formik.touched.name && formik.errors.name
                  ? styles.inValidInput
                  : ""
              }`}
            />
            {formik.touched.name && formik.errors.name && (
              <div className={styles.error}>{formik.errors.name}</div>
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>{`Age`}</label>
            <input
              name="age"
              type="number"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your age"
              className={`${styles.inputField} ${
                formik.touched.age && formik.errors.age
                  ? styles.inValidInput
                  : ""
              }`}
            />
            {formik.touched.age && formik.errors.age && (
              <div className={styles.error}>{formik.errors.age}</div>
            )}
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>{`Email`}</label>
          <input
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your email"
            className={`${styles.inputField} ${
              formik.touched.email && formik.errors.email
                ? styles.inValidInput
                : ""
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <div className={styles.error}>{formik.errors.email}</div>
          )}
        </div>
        <div className={styles.field}>
          <label className={styles.label}>{`Password`}</label>
          <div
            className={`${styles.passwordInput} ${
              formik.touched.password && formik.errors.password
                ? styles.inValidInput
                : ""
            }`}
          >
            <input
              name="password"
              type={isVisible ? "password" : "text"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password"
              className={styles.inputFieldPassword}
            />
            <div
              className={styles.passwordIcon}
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <VisibilityOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
            </div>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className={styles.error}>{formik.errors.password}</div>
          )}
        </div>
        <button type="submit" className={styles.submit}>
          {`Submit`}
        </button>
      </form>
      {submittedData && (
        <div className={styles.result}>
          <div className={styles.resultHeading}>{`Submitted Data`} </div>
          <div className={styles.resultFieldName}>
            <strong>{`Name:`}</strong> {submittedData.name}
          </div>
          <div className={styles.resultFieldName}>
            <strong>{`Age:`}</strong> {submittedData.age}
          </div>
          <div className={styles.resultFieldName}>
            <strong>{`Email:`}</strong> {submittedData.email}
          </div>
          <div className={styles.resultFieldName}>
            <strong>{`Password:`}</strong> {submittedData.password}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormHandling;
