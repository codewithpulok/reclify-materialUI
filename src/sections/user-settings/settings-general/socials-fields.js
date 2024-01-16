import { Card, CardContent, CardHeader, InputAdornment, Stack } from '@mui/material';
import { socialsBrands } from 'src/assets/data';
import { RHFTextField } from 'src/components/common/hook-form';
import { getIconify } from 'src/components/common/iconify/utilities';

const SocialFields = () => (
  <Card>
    <CardHeader title="Social Links" />
    <CardContent component={Stack} spacing={1.5}>
      {socialsBrands.map((brand) => (
        <RHFTextField
          name={`socials.${brand.key}`}
          label={brand.name}
          size="small"
          type="url"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {getIconify(brand.icon, brand.iconSize, { color: brand.color })}
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      ))}
    </CardContent>
  </Card>
);

export default SocialFields;
