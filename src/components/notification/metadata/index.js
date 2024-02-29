import PropTypes from 'prop-types';
import { getPrimaryPhoto } from 'src/utils/photos';
import PurchaseMetadata from './purchase-metadata';

// ----------------------------------------------------------------------

const Props = {
  /** @type {NotificationTypeOptions} */
  type: PropTypes.string,
  metadata: PropTypes.object,
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const NotificationMetadata = (props) => {
  const { metadata, type } = props;

  switch (type) {
    case 'CUSTOMER_PURCHASE':
      return (
        <PurchaseMetadata
          image={getPrimaryPhoto(metadata?.transaction?.warehouse?.photos, null)}
          pallets={metadata?.transaction?.purchase?.quantityOfPallet}
          title={metadata?.transaction?.warehouse?.title}
          warehouseId={metadata?.transaction?.warehouse?.warehouseId}
        />
      );

    default:
      return null;
  }
};

NotificationMetadata.propTypes = Props;

export default NotificationMetadata;
