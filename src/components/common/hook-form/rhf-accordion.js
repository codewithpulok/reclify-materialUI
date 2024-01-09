import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
// local imports
import { useBoolean } from 'src/hooks/use-boolean';
import { getIconify } from '../iconify/utilities';

const Props = {
  name: PropTypes.string.isRequired,
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
  const { children, label, name, sx = {}, defaultExpanded = false } = props;
  const { formState } = useFormContext();
  const { errors } = formState;
  const isError = useMemo(() => Object.keys(errors?.[name] || {}).length > 0, [errors, name]);
  const expanded = useBoolean(defaultExpanded);

  return (
    <Accordion
      sx={{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: isError ? 'error.main' : 'grey.600',
        '&.Mui-expanded': {
          bgcolor: 'background.default',
        },
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
        <Typography variant="overline" color={isError ? 'error.main' : 'text.default'}>
          {label}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

RHFAccordion.propTypes = Props;

export default RHFAccordion;
