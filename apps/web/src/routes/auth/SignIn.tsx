import { useAuthContext } from '@/hooks/auth-context';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const SignIn: React.FC = () => {
  const { setAuthData } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="flex justify-center bg-blue">
      <button
        type="button"
        onClick={() => {
          setAuthData();
          alert('Set');
        }}
      >
        Sign in
      </button>
      <Link to={'/'}>dash</Link>
    </div>
  );
};
