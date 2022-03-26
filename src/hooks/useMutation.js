import React from 'react';

function useMutation(mutation) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const resetError = () => setError(null);

  const execute = React.useCallback(
    async function (...args) {
      const startExecution = () => {
        resetError();
        setIsLoading(true);
      };

      const finishExecution = error => {
        setIsLoading(false);
        if (error) {
          return setError(error);
        }
      };

      startExecution();
      try {
        const result = await mutation(...args);
        finishExecution(null);
        return result;
      } catch (error) {
        finishExecution(error);
        throw error;
      }
    },
    [mutation],
  );

  return {
    isLoading,
    error,
    execute,
    resetError,
  };
}

export default useMutation;
