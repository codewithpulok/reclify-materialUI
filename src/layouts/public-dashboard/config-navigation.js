import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { getRegionsByScope, regionScopes } from 'src/assets/data';
import { getIconify, getIconifyFunc } from 'src/components/common/iconify/utilities';
import { getAvailableServiceTypes } from 'src/constant/service-types';

// ----------------------------------------------------------------------

/**
 * @typedef {Object} Route
 * @property {string} title
 * @property {string} path
 * @property {JSX.Element} icon
 * @property {Route[]} children
 */

const ICONS = {
  warehouse: getIconifyFunc('solar:box-bold-duotone'),
  service: getIconifyFunc('ic:twotone-home-repair-service'),
  users: getIconifyFunc('solar:users-group-two-rounded-bold'),
  hot_deals: getIconifyFunc('solar:fire-bold-duotone'),
  messages: getIconifyFunc('solar:chat-round-line-bold-duotone'),
  region: getIconifyFunc('solar:earth-bold-duotone'),

  not_verified: getIconifyFunc('lucide:badge-minus'),
  not_featured: getIconifyFunc('iconamoon:star-off-fill'),
  not_rated: getIconifyFunc('tabler:diamond-off'),
  hidden: getIconifyFunc('solar:eye-closed-bold-duotone'),
  news: getIconifyFunc('bxs:news'),
  admin: getIconifyFunc('eos-icons:admin-outlined'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  /**
   * all routes
   * @type {Route[]}
   */
  const allRoutes = useMemo(
    () => [
      {
        title: 'Warehouses',
        path: paths.warehouses.root,
        icon: ICONS.warehouse(),
        children: [
          // common warehouse routes
          {
            title: 'Hot Racks',
            path: paths.warehouses.hot_deals,
            icon: ICONS.hot_deals(),
          },

          // sub region warehouse routes (hiding global)
          ...regionScopes
            .filter((s) => s.code !== 'global')
            .map((s) => ({
              title: s.name,
              path: '#',
              icon: s.icon ? getIconify(s.icon) : undefined,
              defaultOpen: true,
              children: getRegionsByScope(s.code).map((r) => ({
                title: r.name,
                path: paths.warehouses.region(r.code),
                icon: r.icon
                  ? getIconify(r.icon, undefined, { rotate: `${r.rotate ? 90 * r.rotate : 0}deg` })
                  : undefined,
              })),
            })),
        ],
        defaultOpen: true,
      },
      {
        title: 'Services',
        path: paths.services.root,
        icon: ICONS.service(),
        children: [
          // service type routes
          ...getAvailableServiceTypes().map((s) => ({
            title: s.label,
            path: paths.services.type(s.value),
            icon: s?.icon ? getIconify(s.icon) : undefined,
          })),
        ],
        defaultOpen: true,
      },
      // news route
      {
        title: 'Racklify News',
        path: paths.news.root,
        icon: ICONS.news(),
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        subheader: 'beta v1.0.0',
        items: allRoutes,
      },
    ],
    [allRoutes]
  );

  return data;
}
