import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
// local imports
import { getIconify } from '../iconify/utilities';

const RHFAccordionProps = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

/**
 * Accordion with React Hook Form
 * @param {RHFAccordionProps} props
 * @returns {JSX.Element}
 */
const RHFAccordion = (props) => {
  const { children, label, name } = props;
  const {
    formState: { errors },
  } = useFormContext();
  const isError = useMemo(() => Object.keys(errors?.[name] || {}).length > 0, [errors, name]);
  return (
    <Accordion
      sx={{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: isError ? 'error.main' : 'grey.600',
        '&.Mui-expanded': {
          bgcolor: 'background.default',
        },
      }}
      elevation={0}
      disableGutters
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

RHFAccordion.propTypes = RHFAccordionProps;

export default RHFAccordion;
