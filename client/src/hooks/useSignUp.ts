import { CustomHookMessage } from '@app-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearSignUpStatus } from '../store/reducers/authenticationReducer';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

export default function useSignUp() {
  const [_timeout, _setTimeout] = useState<any>();
  const [success, setSuccess] = useState<CustomHookMessage>();
  const [error, setError] = useState<CustomHookMessage>();

  const navigate = useNavigate();

  const authReducer = useAppSelector(state => state.authenticationReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authReducer.signUpStatus === 'completed') {
      setSuccess({ message: authReducer.signUpSuccess });

      _setTimeout(
        setTimeout(() => {
          navigate('/sign-up-success');
        }, 1000),
      );
    }
  }, [authReducer.signUpStatus, authReducer.signUpSuccess, dispatch, navigate]);

  useEffect(() => {
    if (authReducer.signUpStatus === 'failed') {
      if (authReducer.signUpError) {
        setError({ message: authReducer.signUpError });
      }
      dispatch(clearSignUpStatus());
    }
  }, [authReducer.signUpStatus, authReducer.signUpError, navigate, dispatch]);

  useEffect(() => {
    return () => {
      clearTimeout(_timeout);
    };
  }, [_timeout]);

  const clearError = () => setError(undefined);
  const clearSuccess = () => setSuccess(undefined);

  useEffect(() => {
    return () => {
      dispatch(clearSignUpStatus());
    };
  }, [dispatch]);

  return {
    success,
    error,
    clearError,
    clearSuccess,
  };
}
