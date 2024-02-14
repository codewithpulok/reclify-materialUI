import PropTypes from 'prop-types';
import AdminApproveActions from './admin-approve-actions';
import CustomerPurchaseActions from './customer-purchase-actions';
import VerifyEmailActions from './verify-email-actions';

const Props = {
  /** @type {NotificationType} */
  notification: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const NotificationActions = (props) => {
  const { notification } = props;

  switch (notification?.type) {
    case 'VERIFY_EMAIL':
      return <VerifyEmailActions />;
    case 'CUSTOMER_PURCHASE':
      return <CustomerPurchaseActions transaction={notification?.meta?.savePurchaseInfo} />;
    case 'ADMIN_APPROVE':
      return <AdminApproveActions transaction={notification?.meta} />;
    case 'CUSTOMER_TRANSACTION_CANCEL':
      return null;
    case 'ADMIN_TRANSACTION_CANCEL':
      return null;
    case 'SELLER_TRANSACTION_CANCEL':
      return null;
    default:
      return null;
  }
};

NotificationActions.propTypes = Props;

export default NotificationActions;
