import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/common/iconify';
import data from './data.json';

// ----------------------------------------------------------------------

export default function FaqsList() {
  return (
    <div>
      {data.map((accordion) => (
        <Accordion key={accordion.id}>
          <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
            <Typography variant="subtitle1">{accordion.heading}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography variant="body1" whiteSpace="pre-line">
              {accordion.detail}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
