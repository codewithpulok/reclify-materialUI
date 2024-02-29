import { useCallback, useEffect, useMemo, useState } from 'react';

const usePagination = (data, perPage = 9) => {
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    if (!data || !Array.isArray(data)) return 0;
    const listLength = data.length;

    if (!listLength || typeof perPage !== 'number' || !perPage || Number.isNaN(perPage)) return 0;

    return Math.ceil(listLength / perPage);
  }, [data, perPage]);
  const hasNext = useMemo(() => currentPage < totalPages, [currentPage, totalPages]);
  const hasPrev = useMemo(() => currentPage > 1, [currentPage]);

  const goNext = useCallback(() => {
    if (!hasNext) return;
    setCurrentPage((prev) => prev + 1);
  }, [hasNext]);

  const goPrev = useCallback(() => {
    if (!hasPrev) return;
    setCurrentPage((prev) => prev - 1);
  }, [hasPrev]);

  const goTo = useCallback(
    (page) => {
      if (typeof page !== 'number' || page < 1 || page > totalPages) return;
      setCurrentPage(page);
    },
    [totalPages]
  );

  // update current page
  useEffect(() => {
    console.log('HELLO', { data, perPage, currentPage });

    if (Array.isArray(data) && typeof perPage === 'number' && !Number.isNaN(perPage)) {
      const end = perPage * currentPage;
      const start = end - perPage;

      setCurrentData(data.slice(start, end));
    }
  }, [currentPage, data, perPage]);

  return { goNext, goPrev, hasNext, hasPrev, currentData, currentPage, goTo, totalPages };
};

export default usePagination;
