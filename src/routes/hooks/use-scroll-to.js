import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useScrollTo = (queryKey = 'scrollTo', value) => {
  const searchParams = useSearchParams();
  const id = searchParams.get(queryKey);

  const scroll = useCallback(() => {
    if (value && id === value) {
      const formElement = document.getElementById(id);
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [id, value]);

  return { scroll, id };
};
