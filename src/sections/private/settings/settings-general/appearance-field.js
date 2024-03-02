import {
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';

const AppearanceField = (props) => {
  const appearance = useAppearance();

  return (
    <Card>
      <CardHeader title="Appearance" />
      <CardContent component={Stack} spacing={1.5}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>Theme</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={appearance?.themeMode === 'dark'}
                onChange={(e) =>
                  appearance.onUpdate('themeMode', e.target.checked ? 'dark' : 'light')
                }
              />
            }
            label={appearance?.themeMode === 'dark' ? 'Dark' : 'Light'}
            labelPlacement="start"
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

AppearanceField.propTypes = {};

export default AppearanceField;
