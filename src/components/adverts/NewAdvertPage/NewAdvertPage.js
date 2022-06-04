import React from 'react';
import { useDispatch } from 'react-redux'

import NewAdvertForm from './NewAdvertForm';
import { advertCreated } from '../../../store/actions';

function NewAdvertPage() {
  const dispatch = useDispatch()

  const handleSubmit = newAdvert => {
    dispatch(advertCreated(newAdvert))

  };

   return (
    <>
      <NewAdvertForm onSubmit={handleSubmit} />
    </>
  );
}

export default NewAdvertPage;
