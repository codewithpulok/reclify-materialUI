import { RoleBasedGuard } from 'src/redux-toolkit/features/auth/guard';
import OnboardingView from 'src/sections/auth/onboarding/view';

export const metadata = {
  title: 'Complete Onboarding',
};

const OnboardingPage = () => (
  <RoleBasedGuard roles={['seller']} hasContent>
    <OnboardingView />
  </RoleBasedGuard>
);

export default OnboardingPage;
