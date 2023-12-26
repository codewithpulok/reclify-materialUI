const { useSnackbar } = require('notistack');

const useSnackbarPromise = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const snackbarPromise = async (promise) => {
    let id;
    try {
      await promise;
      id = enqueueSnackbar('Success', { variant: 'success' });
    } catch (error) {
      closeSnackbar(id);
      id = enqueueSnackbar('Error', { variant: 'error' });
    }

    return id;
  };

  return { snackbarPromise, closeSnackbar };
};

export default useSnackbarPromise;
