import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types';
import { MotionDiv, MotionViewport, varFade } from 'src/components/common/animate';
import { PlanCard } from 'src/components/user-settings/cards';
import { ScrollTo } from 'src/routes/components';
import PricingContainer from './pricing-container';
import PricingMobile from './pricing-mobile';

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
    <Stack spacing={3} sx={{ mb: 10, textAlign: 'center' }}>
      <MotionDiv variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
          pricing plans
        </Typography>
      </MotionDiv>

      <MotionDiv variants={varFade().inDown}>
        <Typography variant="h2">
          The right plan for <br /> your business
        </Typography>
      </MotionDiv>

      <MotionDiv variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary' }}>
          Choose the perfect plan for your needs. Always flexible to grow
        </Typography>
      </MotionDiv>
    </Stack>
  );

  const renderContent = (
    <Box
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      sx={{
        gap: 1.5,
        display: {
          xs: 'none',
          md: 'grid',
        },
      }}
    >
      {data.map((plan, index) => (
        <MotionDiv
          key={plan.id}
          variants={varFade({ durationIn: Number((0.3 * index + 0.64).toFixed(2)) }).inUp}
        >
          <PlanCard plan={plan} />
        </MotionDiv>
      ))}
    </Box>
  );

  return (
    <PricingContainer>
      <Container component={MotionViewport}>
        <ScrollTo id="PRICING" />
        {renderDescription}

        {renderContent}

        <PricingMobile data={data} />
      </Container>
    </PricingContainer>
  );
};

HomePricing.propTypes = Props;

export default HomePricing;
