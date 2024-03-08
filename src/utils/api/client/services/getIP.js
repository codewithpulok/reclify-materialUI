const URL = 'https://api.ipify.org/?format=json';

// ----------------------------------------------------------------------

const getIP = async () => {
  try {
    const response = await fetch(URL);
    const resJSON = await response.json();

    if (!resJSON?.ip) throw new Error('IP not found');

    return { data: resJSON.ip };
  } catch (error) {
    return { error };
  }
};

export default getIP;
