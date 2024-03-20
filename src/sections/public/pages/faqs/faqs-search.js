'use client';

import { InputAdornment, TextField, outlinedInputClasses } from '@mui/material';
import Iconify from 'src/components/common/iconify';

const FAQsSearch = (props) => (
  <TextField
    fullWidth
    placeholder="Search support..."
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
        </InputAdornment>
      ),
    }}
    sx={{
      mt: 5,
      maxWidth: 360,
      [`& .${outlinedInputClasses.root}`]: {
        bgcolor: 'common.white',
      },
      [`& .${outlinedInputClasses.input}`]: {
        typography: 'subtitle1',
      },
    }}
  />
);

FAQsSearch.propTypes = {};

export default FAQsSearch;
