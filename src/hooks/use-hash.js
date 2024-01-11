'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const getHash = () => {
  // if window is not defined then return undefined
  if (typeof window === 'undefined') return undefined;

  // distructure hash
  const { hash } = window.location;

  // if hash is a empty string then return null
  if (hash === '') return null;

  return hash;
};

/**
 * get url hash.
 * if value is string then it means value is valid.
 * if value is null means value is empty
 * if vlaue is undefined means value is loading
 * @returns {string | null | undefined}
 */
const useHash = () => {
  const [isClient, setIsClient] = useState(false);
  const [hash, setHash] = useState(getHash());
  const params = useParams();

  useEffect(() => {
    setIsClient(true);
    setHash(getHash());
  }, [params]);

  return isClient ? hash : undefined;
};

export default useHash;
