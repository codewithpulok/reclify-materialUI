import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types';
import { MotionDiv, MotionViewport, varFade } from 'src/components/common/animate';
import { ScrollTo } from 'src/routes/components';
import PricingContainer from './pricing-container';
import PricingContent from './pricing-content';

// ----------------------------------------------------------------------

const Props = {
  /** @type {Plan[]} */
  data: PropTypes.array,
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const HomePricing = (props) => {
  const { data } = props;

  const renderDescription = (
    <Stack spacing={3} sx={{ mb: 4, textAlign: 'center' }}>
      <MotionDiv variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
          pricing plans
        </Typography>
      </MotionDiv>

      <MotionDiv variants={varFade().inDown}>
        <Typography variant="h2">The right plan for your business</Typography>
      </MotionDiv>

      <MotionDiv variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary' }}>
          Choose the perfect plan for your needs. Always flexible to grow
        </Typography>
      </MotionDiv>
    </Stack>
  );

  return (
    <PricingContainer>
      <Container component={MotionViewport}>
        <ScrollTo id="PRICING" />
        {renderDescription}

        <PricingContent data={data} />
      </Container>
    </PricingContainer>
  );
};

HomePricing.propTypes = Props;

export default HomePricing;
