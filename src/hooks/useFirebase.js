import { useState } from "react";

export default function useFirebase(action) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  async function callAction(data) {
    setIsLoading(true);
    try {
      await action(data);
    } catch (error) {
      setError(error.message || 'Something went wrong');
    }
    setIsLoading(false);
  }

  function clearError() {
    setError(null);
  }

  return {
    isLoading,
    error,
    callAction,
    clearError,
  }
}