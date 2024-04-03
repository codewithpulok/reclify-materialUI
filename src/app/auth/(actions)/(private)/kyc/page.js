import { RoleBasedGuard } from 'src/redux-toolkit/features/auth/guard';
import KYCView from 'src/sections/auth/kyc/view';

export const metadata = {
  title: 'KYC',
};

const KYCPage = () => (
  <RoleBasedGuard roles={['seller', 'customer']} hasContent>
    <KYCView />
  </RoleBasedGuard>
);

export default KYCPage;
