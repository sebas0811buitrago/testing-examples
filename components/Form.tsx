import { postData } from '../services/calls';
import React from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
}

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();
  const onSubmit = async ({ email, password }) => {
    await postData({ email, password });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '200px',
        gap: '10px'
      }}
    >
      <label htmlFor="email">email</label>
      <input
        id="email"
        {...register('email', {
          required: 'required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Entered value does not match email format'
          }
        })}
        type="email"
      />
      {errors.email && <span role="alert">{errors.email.message}</span>}
      <label htmlFor="password">password</label>
      <input
        id="password"
        {...register('password', {
          required: 'required',
          minLength: {
            value: 5,
            message: 'min length is 5'
          }
        })}
        type="password"
      />
      {errors.password && <span role="alert">{errors.password.message}</span>}
      <button type="submit">submit</button>
    </form>
  );
}
