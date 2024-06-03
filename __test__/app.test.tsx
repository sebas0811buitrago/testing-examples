import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from '../components/Form';
import { postData } from '../services/calls';

vi.mock('../services/calls');

const mockedPostData = vi.mocked(postData);

describe('app test', () => {
  it('should display required error when value is invalid', async () => {
    mockedPostData.mockResolvedValueOnce({
      response: 'mock post data'
    });
    render(<Form />);

    fireEvent.submit(screen.getByRole('button'));
    expect(await screen.findAllByRole('alert')).toHaveLength(2);
    expect(mockedPostData).not.toBeCalled();
  });

  it('should display matching error when email is invalid', async () => {
    render(<Form />);

    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: {
        value: 'test'
      }
    });

    fireEvent.input(screen.getByLabelText('password'), {
      target: {
        value: 'password'
      }
    });

    fireEvent.submit(screen.getByRole('button'));

    expect(await screen.findAllByRole('alert')).toHaveLength(1);

    expect(mockedPostData).not.toBeCalled();
    expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue('test');
    expect(screen.getByLabelText('password')).toHaveValue('password');
  });

  it('should display min length error when password is invalid', async () => {
    render(<Form />);

    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: {
        value: 'test@mail.com'
      }
    });

    fireEvent.input(screen.getByLabelText('password'), {
      target: {
        value: 'pass'
      }
    });

    fireEvent.submit(screen.getByRole('button'));

    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(mockedPostData).not.toBeCalled();
    expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
      'test@mail.com'
    );
    expect(screen.getByLabelText('password')).toHaveValue('pass');
  });

  it('should not display error when value is valid', async () => {
    render(<Form />);

    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: {
        value: 'test@mail.com'
      }
    });

    fireEvent.input(screen.getByLabelText('password'), {
      target: {
        value: 'password test'
      }
    });

    fireEvent.submit(screen.getByText(/submit/i));

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));

    expect(mockedPostData).toBeCalledWith({
      email: 'test@mail.com',
      password: 'password test'
    });
    screen.getByRole('textbox', { name: /email/i });

    screen.debug(screen.getByRole('textbox', { name: /email/i }));
    expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue('');
    expect(screen.getByLabelText('password')).toHaveValue('');
  });
});
