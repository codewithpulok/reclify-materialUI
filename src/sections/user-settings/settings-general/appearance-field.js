import {
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useSettingsContext } from 'src/components/common/settings';

const AppearanceField = (props) => {
  const settings = useSettingsContext();

  return (
    <Card>
      <CardHeader title="Appearance" />
      <CardContent component={Stack} spacing={1.5}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>Theme</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={settings?.themeMode === 'dark'}
                onChange={(e) =>
                  settings.onUpdate('themeMode', e.target.checked ? 'dark' : 'light')
                }
              />
            }
            label={settings?.themeMode === 'dark' ? 'Dark' : 'Light'}
            labelPlacement="start"
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

AppearanceField.propTypes = {};

export default AppearanceField;
