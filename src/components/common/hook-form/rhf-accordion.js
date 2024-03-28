import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
// local imports
import { Stack, alpha } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import { getIconify } from '../iconify/utilities';

const Props = {
  name: PropTypes.string,
  names: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
  defaultExpanded: PropTypes.bool,
  action: PropTypes.node,
};

/**
 * Accordion with React Hook Form
 * @param {Props} props
 * @returns {JSX.Element}
 */
const RHFAccordion = (props) => {
  const {
    children,
    label,
    name = undefined,
    sx = {},
    defaultExpanded = false,
    names = undefined,
    description,
    action,
  } = props;
  const { formState } = useFormContext();
  const { errors } = formState;

  const nameError = errors?.[name] !== undefined;
  const namesError = Array.isArray(names)
    ? names.findIndex((fname) => errors?.[fname] !== undefined) !== -1
    : false;
  const isError = nameError || namesError;

  const expanded = useBoolean(defaultExpanded);

  return (
    <Accordion
      sx={{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: (theme) => (isError ? 'error.main' : alpha(theme.palette.grey[500], 0.2)),
        mb: 1,
        ...sx,
      }}
      elevation={0}
      disableGutters
      expanded={expanded.value}
      onChange={(_e, value) => expanded.setValue(value)}
    >
      <AccordionSummary
        expandIcon={getIconify('solar:alt-arrow-down-line-duotone', 24, {
          color: isError ? 'error.main' : 'text.default',
        })}
      >
        <Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="overline" color={isError ? 'error.main' : 'text.default'}>
              {label}
            </Typography>

            {action}
          </Stack>
          {!!description && (
            <Typography variant="caption" color="text.secondary">
              {description}
            </Typography>
          )}
          {isError && name && (
            <Typography variant="caption" color="error.main">
              {errors?.[name]?.root?.message || errors?.[name]?.message}
            </Typography>
          )}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

RHFAccordion.propTypes = Props;

export default RHFAccordion;
