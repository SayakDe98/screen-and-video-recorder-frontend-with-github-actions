import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Signup.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { signup } from "../utils/signup";
import Card from "./Card";
import TopBar from "./TopBar";
import { authActions } from "../store/auth-slice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
        name: "",
        email: "",
        password: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      const { data } = await signup({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      if (data.success) {
        resetForm();
        toast.success(data.message);
        dispatch(authActions.login(data.data.token));
        navigate("/");
      } else {
        toast.error(data.message);
      }
    },
  });
  return (
    <>
    <TopBar />
      <form onSubmit={formik.handleSubmit} className={style.form}>
        <Card>
          <div className={style.name}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{
                border: "0px",
                boxShadow:
                  "0 2px 7px 0 rgba(0, 0, 0, 0.1), 0 2px 7px 0 rgba(0, 0, 0, 0.1)",
              }}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className={style.errors}>{formik.errors.name}</div>
            ) : null}
          </div>
          <div className={style.email}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{
                border: "0px",
                boxShadow:
                  "0 2px 7px 0 rgba(0, 0, 0, 0.1), 0 2px 7px 0 rgba(0, 0, 0, 0.1)",
              }}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className={style.errors}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className={style.password}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{
                border: "0px",
                boxShadow:
                  "0 2px 7px 0 rgba(0, 0, 0, 0.1), 0 2px 7px 0 rgba(0, 0, 0, 0.1)",
              }}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className={style.errors}>{formik.errors.password}</div>
            ) : null}
          </div>
          <button type="submit" style={{ cursor: "pointer" }} disabled={!formik.errors}>
            Sign up
          </button>
          <div className={style.navigateLogin}>
            <span className={style.navigateLogin}>
              Already have an Account?
            </span>
            <Link to="/login" className={style.navigateLoginButton}>
              Log in
            </Link>
          </div>
        </Card>
      </form>
      <ToastContainer />
    </>
  );
};

export default Signup;
