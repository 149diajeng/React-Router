import React from 'react';
import Modal from 'react-modal';
import * as Yup from 'yup';
import LoginForm from '../Pages/LoginFrom';

Modal.setAppElement('#root');

const ModalLogin = ({ isOpen, onRequestClose }) => {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Login</h2>
      <LoginForm onSubmit={handleSubmit} validationSchema={validationSchema} />
    </Modal>
  );
};

export default ModalLogin;
