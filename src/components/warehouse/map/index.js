import dynamic from 'next/dynamic';

export * from './map-config';
export const MapMarkersPopups = dynamic(() => import('./map-markers-popups'));
