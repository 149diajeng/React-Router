import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// require('dotenv').config()

function LoginForm() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Define your API credentials and endpoints here
  const API_KEY = 'process.env.API_KEY';
  const REQUEST_TOKEN_URL = `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`;
  const LOGIN_URL = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`;
  const LOGOUT_URL = `https://api.themoviedb.org/3/authentication/session?api_key=${API_KEY}`;

  const getRequestToken = () => {
    return fetch(REQUEST_TOKEN_URL)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("request_token", data.request_token);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleLogout = () => {
    fetch(LOGOUT_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: localStorage.getItem("session_id"),
      }),
    })
      .then(() => {
        localStorage.removeItem("session_id");
        setLoggedInUser(null);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      {loggedInUser ? (
        <div>
          Welcome, {loggedInUser}! <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={Yup.object({
            username: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            fetch(LOGIN_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: values.username,
                password: values.password,
                request_token: localStorage.getItem("request_token"),
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                return fetch(
                  `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      request_token: data.request_token,
                    }),
                  }
                );
              })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                setLoggedInUser(values.username);
                localStorage.setItem("session_id", data.session_id);
              })
              .catch((error) => {
                console.error("Error:", error);
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

              <button type="submit" disabled={formik.isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      )}

      {localStorage.getItem("request_token") === null && getRequestToken()}
    </div>
  );
}

export default LoginForm;



// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// function LoginForm() {
//     // FECTH
//     // ENDPOINT DG API KEY DAN USER CREDENTIALS
//   async function authenticateUser(username, password) {
//     const url =
//       "https://api.themoviedb.org/3/authentication/token/new?api_key=5840c53eacbb598c92e40f6f55ac8b70";
//     const response = await fetch(url);
//     const data = await response.json();
//     const token = data.request_token;

//     const loginUrl =
//       "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=5840c53eacbb598c92e40f6f55ac8b70";
//     const loginResponse = await fetch(loginUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password, request_token: token }),
//     });
//     const loginData = await loginResponse.json();
//     const sessionIdUrl =
//       "https://api.themoviedb.org/3/authentication/session/new?api_key=5840c53eacbb598c92e40f6f55ac8b70";
//     const sessionResponse = await fetch(sessionIdUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ request_token: loginData.request_token }),
//     });
//     const sessionData = await sessionResponse.json();
//     return sessionData.session_id;
//   }

// //   MEMANGGIL AUTHENTICATEUSER
//   return (
//     <div>
//       <Formik
//         initialValues={{ username: "", password: "" }}
//         validationSchema={Yup.object({
//           username: Yup.string().required("Username is required"),
//           password: Yup.string().required("Password is required"),
//         })}
//         onSubmit={(values, { setSubmitting }) => {
//           authenticateUser(values.username, values.password)
//             .then((sessionId) => console.log(sessionId))
//             .catch((error) => console.log(error));
//           setSubmitting(false);
//         }}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <div>
//               <label htmlFor="username">Username</label>
//               <Field name="username" type="text" />
//               <ErrorMessage name="username" />
//             </div>

//             <div>
//               <label htmlFor="password">Password</label>
//               <Field name="password" type="password" />
//               <ErrorMessage name="password" />
//             </div>

//             <button type="submit" disabled={isSubmitting}>
//               Submit
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }

// export default LoginForm;
