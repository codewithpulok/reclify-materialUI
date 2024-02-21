// mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// components
import { MotionViewport } from 'src/components/common/animate';

// ----------------------------------------------------------------------

const list = [
  {
    id: 1,
    title: 'Temperature Control',
    definition:
      'The process of maintaining and regulating specific temperature conditions within a given environment, often used in logistics and storage to preserve the quality of products that are sensitive to temperature variations, such as pharmaceuticals or perishable goods.',
  },
  {
    id: 2,
    title: 'Lot Tracking',
    definition:
      'The systematic recording and monitoring of batches or lots of products throughout the supply chain. It helps trace the origin, movement, and distribution of specific groups of items, ensuring accountability and facilitating recalls if necessary.',
  },
  {
    id: 3,
    title: 'Cold Storage',
    definition:
      'Specialized storage facilities equipped with temperature-controlled environments, typically refrigerated or frozen, to preserve perishable goods, pharmaceuticals, or other temperature-sensitive items.',
  },
  {
    id: 4,
    title: 'LTL/FTL Freight',
    definition:
      'Acronyms for Less Than Truckload (LTL) and Full Truckload (FTL), referring to shipping methods based on the size and weight of the cargo. LTL involves consolidating smaller shipments into a single truck, while FTL uses an entire truck for a single large shipment.',
  },
  {
    id: 5,
    title: 'eCommerce/D2C Fulfillment',
    definition:
      'The process of picking, packing, and shipping products directly to end customers for online retailers or businesses engaged in direct-to-consumer (D2C) sales.',
  },
  {
    id: 6,
    title: 'Rail',
    definition:
      'Transportation method utilizing trains to move goods between locations, often used for large shipments over long distances.',
  },
  {
    id: 7,
    title: 'Subscription Box',
    definition:
      'A recurring delivery service where customers receive curated products or samples on a regular basis, usually monthly, as part of a subscription.',
  },
  {
    id: 8,
    title: 'International Fulfillment',
    definition:
      'The management of order processing, warehousing, and shipping for businesses that operate globally, ensuring timely and cost-effective delivery across international borders.',
  },
  {
    id: 9,
    title: 'Import/Export',
    definition:
      'The process of bringing goods into a country (import) or sending goods to other countries (export), involving compliance with customs regulations and international trade laws.',
  },
  {
    id: 10,
    title: 'HAZMAT',
    definition:
      'Abbreviation for Hazardous Materials, referring to products or substances that pose a risk to health, safety, or the environment. HAZMAT handling involves special precautions and compliance with regulations.',
  },
  {
    id: 11,
    title: 'High SKU Count',
    definition:
      'A situation where a business manages a large number of Stock Keeping Units (SKUs), representing distinct products in its inventory.',
  },
  {
    id: 12,
    title: 'Oversized Items',
    definition:
      'Products that exceed standard size and weight limits for regular shipping and may require special handling and transportation arrangements.',
  },
  {
    id: 13,
    title: 'Industrial',
    definition:
      'Pertaining to manufacturing, production, or processes associated with heavy industry and the production of goods.',
  },
  {
    id: 14,
    title: 'Assembly',
    definition:
      'The process of putting together individual components or parts to create a finished product.',
  },
  {
    id: 15,
    title: 'Kitting & Bundling',
    definition:
      'The practice of grouping individual items or components together as a single unit, often done to create value-added packages or product sets.',
  },
  {
    id: 16,
    title: 'Returns Processing',
    definition:
      'The handling and management of product returns from customers, including inspection, restocking, and disposition of returned items.',
  },
  {
    id: 17,
    title: 'Call Center Services',
    definition:
      'Providing customer support, order assistance, and related services through a centralized call center.',
  },
  {
    id: 18,
    title: 'Manufacturing',
    definition:
      'The process of converting raw materials or components into finished goods through various production processes.',
  },
  {
    id: 19,
    title: 'On-Demand Printing',
    definition:
      'Printing services that fulfill orders as they are received, allowing for customization and flexibility in the production of printed materials.',
  },
  {
    id: 20,
    title: 'Mailing & Letter Distribution',
    definition:
      'Services related to the sorting, packaging, and distribution of letters and mail items to intended recipients.',
  },
  {
    id: 21,
    title: 'FBA Prep',
    definition:
      "Preparing products according to Amazon's Fulfilled by Amazon (FBA) requirements, ensuring they are ready for storage and shipment within Amazon's fulfillment network.",
  },
  {
    id: 22,
    title: 'Seller Fulfilled Prime (SFP)',
    definition:
      'A program on Amazon where sellers handle their own inventory and shipping but still qualify for Prime benefits, provided they meet specific performance criteria.',
  },
  {
    id: 23,
    title: 'B2B Distribution',
    definition:
      'The distribution of products from a business to other businesses, involving bulk quantities and often customized services to meet the needs of business clients.',
  },
  {
    id: 24,
    title: 'Last Mile Delivery',
    definition:
      "The final stage of the delivery process where goods are transported from a distribution center to the end customer's location, often considered the most critical and costly part of the delivery chain.",
  },
  {
    id: 25,
    title: 'Multi-Facility',
    definition:
      'Operating or managing multiple facilities, such as warehouses or distribution centers, to optimize logistics and supply chain operations.',
  },
  {
    id: 26,
    title: 'Luxury Goods Fulfillment',
    definition:
      'Specialized fulfillment services tailored to the unique requirements and expectations of luxury goods, which may include high-end packaging, personalized services, and exclusive handling.',
  },
  {
    id: 27,
    title: 'Flexible Warehouse Suites',
    definition:
      'Warehousing solutions that offer customizable and adaptable spaces to meet the specific needs of clients, allowing for efficient use of storage and operational areas',
  },
];

export default function SectionContent() {
  return (
    <Box
      sx={{
        pb: 10,
        mt: 10,
      }}
    >
      <Container component={MotionViewport}>
        <Stack spacing={2}>
          {list.map((item) => (
            <Stack spacing={0.8} key={item.id}>
              <Typography variant="h6">{item.title}:</Typography>
              <Typography>
                <Typography variant="subtitle1" component="span">
                  Definition:{' '}
                </Typography>
                {item.definition}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
