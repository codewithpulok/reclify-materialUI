import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/common/carousel';
import { CustomerCard } from 'src/components/users/cards';

const Props = {
  /** @type {Warehouse[]} */
  data: PropTypes.array,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ServiceCustomers = (props) => {
  const {
    data = [
      {
        id: '65a93679d4632818aa8f5755',
        firstName: 'Customer',
        lastName: 'User',
        email: 'customer@test.com',
        userType: 'customer',
        avatar:
          'https://storage.googleapis.com/racklify-prod/warehouse/1706176607125_pexels-photo-415829.webp',
        banner: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg',
        phone: '123-456-7890',
        address: {
          country: 'United States',
          state: 'Arizona',
          city: 'TEST',
          zipCode: '1234',
          street1: 'TEST',
          street2: '0000',
        },
        about: 'Hello',
        socials: {},
        transactionCount: 9,
      },
      {
        id: '65a93687d4632818aa8f5758',
        firstName: 'Jhon',
        lastName: 'Doe',
        email: 'admin@test.com',
        userType: 'customer',
        avatar: '',
        banner: '/assets/placeholder/PROFILE_COVER.jpg',
        phone: '000-000-0000',
        address: {
          country: 'United States',
          state: 'Arizona',
          city: 'Test',
          zipCode: '0000',
        },
        about: '',
        socials: {},
        transactionCount: 0,
      },
      {
        id: '65a94405d4632818aa8f57b3',
        firstName: 'Customer 1',
        lastName: 'User',
        email: 'customer1@test.com',
        userType: 'customer',
        avatar: '',
        banner: '',
        phone: '',
        address: {},
        socials: {},
        transactionCount: 0,
      },
      {
        id: '65ae52f628c676dfac8771ce',
        firstName: 'Customer',
        lastName: 'User',
        email: 'customer2@test.com',
        userType: 'customer',
        avatar: '',
        banner: '',
        phone: '',
        address: {},
        socials: {},
        transactionCount: 0,
      },
      {
        id: '65d366b2a5418e8021707565',
        firstName: 'Customer ',
        lastName: '3',
        email: 'customer3@test.com',
        userType: 'customer',
        serviceType: 'warehouse',
        avatar: '',
        banner: '',
        phone: '',
        address: {},
        socials: {},
        transactionCount: 0,
      },
    ],
  } = props;

  const carousel = useCarousel({
    slidesToShow: 4,
    infinite: data?.length >= 4,
    autoplay: true,
    autoplaySpeed: 1500,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, infinite: data?.length >= 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, infinite: data?.length >= 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, infinite: data?.length >= 1 },
      },
    ],
  });

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        '& .slick-track': {
          ml: 0,
        },
      }}
    >
      <CarouselArrows
        filled
        icon="solar:alt-arrow-right-bold"
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((item, index) => (
            <Box key={item.id} sx={{ px: { xs: 0.5, sm: 1 } }}>
              <CustomerCard user={item} index={index} />
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
};

ServiceCustomers.propTypes = Props;

export default ServiceCustomers;
