import { List } from '@mui/material';
import PropTypes from 'prop-types';
import {
  ApproveTransactionDialog,
  CancelTransactionAdminDialog,
  CancelTransactionDialog,
  CompleteTransactionDialog,
} from 'src/components/common/custom-dialog';
import Scrollbar from 'src/components/common/scrollbar';
import { useDialog } from 'src/hooks/use-dialog';
import NotificationListItem from './list-item';

const Props = {
  /** @type {NotificationType[]} */
  notifications: PropTypes.array,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const NotificationList = (props) => {
  const { notifications = [] } = props;

  // dialog state
  const completeDialog = useDialog();
  const approveDialog = useDialog();
  const cancelDialog = useDialog();
  const cancelAdminDialog = useDialog();

  return (
    <>
      <Scrollbar>
        <List disablePadding>
          {notifications.map((notification) => (
            <NotificationListItem
              key={notification.id}
              notification={notification}
              adminTransactionCancel={cancelAdminDialog.onOpen}
              transactionCancel={cancelDialog.onOpen}
              transactionComplete={completeDialog.onOpen}
              transactionApprove={approveDialog.onOpen}
            />
          ))}
        </List>
      </Scrollbar>

      <CancelTransactionAdminDialog
        open={cancelAdminDialog.open}
        onClose={cancelAdminDialog.onClose}
        transaction={cancelAdminDialog.value}
      />
      <CancelTransactionDialog
        open={cancelDialog.open}
        onClose={cancelDialog.onClose}
        transaction={cancelDialog.value}
      />
      <ApproveTransactionDialog
        open={approveDialog.open}
        onClose={approveDialog.onClose}
        transaction={approveDialog.value}
      />
      <CompleteTransactionDialog
        open={completeDialog.open}
        onClose={completeDialog.onClose}
        transaction={completeDialog.value}
      />
    </>
  );
};

NotificationList.propTypes = Props;

export default NotificationList;
