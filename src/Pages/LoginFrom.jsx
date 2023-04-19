import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function LoginForm() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [requestToken, setRequestToken] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "5840c53eacbb598c92e40f6f55ac8b70";
  const REQUEST_TOKEN_URL = `https://api.themoviedb.org/3/authentication/token/new`;
  const LOGIN_URL = `https://api.themoviedb.org/3/authentication/token/validate_with_login`;
  const SESSION_URL = `https://api.themoviedb.org/3/authentication/session/new`;
  const ACCOUNT_URL = `https://api.themoviedb.org/3/account`;

  // Retrieve session_id from localStorage, if it exists
  const storedSessionId = localStorage.getItem("session_id");
  const [sessionId, setSessionId] = useState(storedSessionId);

  useEffect(() => {
    axios
      .get(REQUEST_TOKEN_URL, {
        params: { api_key: API_KEY },
      })
      .then((response) => {
        setRequestToken(response.data.request_token);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.response.data.status_message);
      });
  }, []);

  useEffect(() => {
    // If session_id exists in localStorage, retrieve user details
    if (sessionId) {
      axios
        .get(ACCOUNT_URL, {
          params: {
            session_id: sessionId,
            api_key: API_KEY,
          },
        })
        .then((response) => {
          console.log(response);
          setLoggedInUser(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
          setError(error.response.data.status_message);
        });
    }
  }, [sessionId]);

  const handleLogout = () => {
    axios
      .delete(
        `https://api.themoviedb.org/3/authentication/session?api_key=${API_KEY}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            session_id: localStorage.getItem("session_id"),
          },
        }
      )
      .then(() => {
        localStorage.removeItem("session_id");
        setLoggedInUser(null);
        setSessionId(null);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.response.data.status_message);
      });
  };

  return (
    <div>
      {loggedInUser ? (
        <div>
          <h2>Welcome, {loggedInUser.username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={Yup.object({
            username: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .post(
                LOGIN_URL,
                {
                  username: values.username,
                  password: values.password,
                  request_token: requestToken,
                },
                {
                  params: { api_key: API_KEY },
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                console.log(response);
                return axios.post(
                  SESSION_URL,
                  {
                    request_token: response.data.request_token,
                  },
                  {
                    params: { api_key: API_KEY },
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
              })
              .then((response) => {
                console.log(response);
                const sessionId = response.data.session_id;
                localStorage.setItem("session_id", sessionId);
                setSessionId(sessionId);
                return axios.get(ACCOUNT_URL, {
                  params: {
                    session_id: sessionId,
                    api_key: API_KEY,
                  },
                });
              })
              .then((response) => {
                console.log(response);
                setLoggedInUser(response.data);
                setError(null);
              })
              .catch((error) => {
                console.error("Error:", error);
                setError(error.response.data.status_message);
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {(formik) => (
            <Form>
              <div>
                <label htmlFor="username">Username:</label>
                <Field type="text" name="username" />
                <ErrorMessage name="username" />
              </div>

              <div>
                <label htmlFor="password">Password:</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" />
              </div>

              {error && <div style={{ color: "red" }}>{error}</div>}

              <button type="submit" disabled={formik.isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default LoginForm;