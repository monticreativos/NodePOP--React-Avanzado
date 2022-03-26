import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { createAdvert } from '../service';
import NewAdvertForm from './NewAdvertForm';
import useMutation from '../../../hooks/useMutation';

function NewAdvertPage() {
  const navigate = useNavigate();
  const mutation = useMutation(createAdvert);

  const handleSubmit = newAdvert => {
    mutation.execute(newAdvert).then(({ id }) => navigate(`/adverts/${id}`));
  };

  if (mutation.error?.statusCode === 401) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <NewAdvertForm onSubmit={handleSubmit} />
    </>
  );
}

export default NewAdvertPage;
