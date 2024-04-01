import 'src/global.css';

// ----------------------------------------------------------------------

import PropTypes from 'prop-types';

import ThemeProvider from 'src/theme';
import { highlightsFont, primaryFont } from 'src/theme/typography';

import { MotionLazy } from 'src/components/common/animate/motion-lazy';
import ProgressBar from 'src/components/common/progress-bar';
import { SettingsDrawer } from 'src/components/common/settings';
import InitAppearance from 'src/redux-toolkit/features/appearance/init-appearance';
import Provider from 'src/redux-toolkit/provider';

// ----------------------------------------------------------------------

/** @type {import('next').Metadata} */
export const metadata = {
  title: {
    template: '%s - Racklify',
    default: 'Racklify',
  },
  description: 'Store management platform',
  keywords: [
    'racklify',
    'store',
    'pallet',
    'logistics hub',
    'warehouse event space',
    'storage space for lease',
    'business warehouse for rent',
    'office warehouse space for lease',
    'industrial warehouse for rent',
    'shared warehouse space',
    'warehouse space for lease',
    'small warehouse for rent by owner',
    'industrial space for lease',
    'short term warehouse rental',
    'cheap warehouse space for rent',
    'business buildings for rent',
  ],
  themeColor: '#000000',
  manifest: '/manifest.json',
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 1 },
  icons: [
    { rel: 'icon', url: '/favicon/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${primaryFont.className} ${highlightsFont.className}`}>
      <body style={{ scrollBehavior: 'smooth' }}>
        <Provider>
          <InitAppearance>
            <ThemeProvider>
              <MotionLazy>
                <SettingsDrawer />
                <ProgressBar />
                {children}
              </MotionLazy>
            </ThemeProvider>
          </InitAppearance>
        </Provider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
