import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
// local imports
import { Stack, alpha } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import { getIconify } from '../iconify/utilities';

const Props = {
  name: PropTypes.string,
  names: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
  defaultExpanded: PropTypes.bool,
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
  } = props;
  const { formState } = useFormContext();
  const { errors } = formState;
  const isError = useMemo(() => {
    // if name present then the accordion is for object
    if (name !== undefined) {
      return errors?.[name] !== undefined;
    }

    // if names array is preset then the accordion is for multiple field
    if (names instanceof Array && names.length) {
      const index = names.findIndex((fieldName) => errors?.[fieldName] !== undefined);
      return index !== -1;
    }

    return false;
  }, [errors, name, names]);
  const expanded = useBoolean(defaultExpanded);

  console.log({ errors });

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
          <Typography variant="overline" color={isError ? 'error.main' : 'text.default'}>
            {label}
          </Typography>
          {isError && name && (
            <Typography variant="caption" color="error.main">
              {errors?.[name].root?.message}
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
