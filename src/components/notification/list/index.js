import { List } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  ApproveTransactionDialog,
  CancelTransactionAdminDialog,
  CancelTransactionDialog,
  CompleteTransactionDialog,
} from 'src/components/common/custom-dialog';
import Scrollbar from 'src/components/common/scrollbar';
import { useDialog } from 'src/hooks/use-dialog';
import { useReadNotificationMutation } from 'src/redux-toolkit/services/notificationApi';
import NotificationListItem from './list-item';

const Props = {
  /** @type {NotificationType[]} */
  notifications: PropTypes.array,
  refetch: PropTypes.func,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const NotificationList = (props) => {
  const { notifications = [], refetch } = props;

  // app state
  const [selectedNotification, setSelectedNotification] = useState(null);

  // api state
  const [readNotification, readResponse] = useReadNotificationMutation();

  // dialog state
  const completeDialog = useDialog();
  const approveDialog = useDialog();
  const cancelDialog = useDialog();
  const cancelAdminDialog = useDialog();

  // handle notification read
  const HandleNotificationRead = async (notification) => {
    if (notification?.isRead) return;
    setSelectedNotification(notification?.id);
    await readNotification(notification?.id);
    setSelectedNotification(null);
  };

  return (
    <>
      <Scrollbar>
        <List disablePadding>
          {notifications.map((n) => (
            <NotificationListItem
              key={n.id}
              notification={n}
              adminTransactionCancel={cancelAdminDialog.onOpen}
              transactionCancel={cancelDialog.onOpen}
              transactionComplete={completeDialog.onOpen}
              transactionApprove={approveDialog.onOpen}
              onClick={() => HandleNotificationRead(n)}
              isLoading={selectedNotification === n.id && readResponse.isLoading}
            />
          ))}
        </List>
      </Scrollbar>

      <CancelTransactionAdminDialog
        open={cancelAdminDialog.open}
        onClose={cancelAdminDialog.onClose}
        transaction={cancelAdminDialog.value}
        successCallback={refetch}
      />
      <CancelTransactionDialog
        open={cancelDialog.open}
        onClose={cancelDialog.onClose}
        transaction={cancelDialog.value}
        successCallback={refetch}
      />
      <ApproveTransactionDialog
        open={approveDialog.open}
        onClose={approveDialog.onClose}
        transaction={approveDialog.value}
        successCallback={refetch}
      />
      <CompleteTransactionDialog
        open={completeDialog.open}
        onClose={completeDialog.onClose}
        transaction={completeDialog.value}
        successCallback={refetch}
      />
    </>
  );
};

NotificationList.propTypes = Props;

export default NotificationList;
