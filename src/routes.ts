import DefaultWindow from './windows/Default.window';
import IncreaseIntensityWindow from './windows/IncreaseIntensity.window';
import InvertWindow from './windows/Invert.window';

export interface Route {
  path: string;
  component: React.ReactNode;
}

export enum RouteName {
  DEFAULT = 'DEFAULT',
  INVERT = 'INVERT',
  INTENSITY = 'INTENSITY',
}

type RoutesDictionary = {
  [K in RouteName]: Route;
};

const Routes: RoutesDictionary = {
  [RouteName.DEFAULT]: {
    path: '/',
    component: DefaultWindow,
  },
  [RouteName.INVERT]: {
    path: '/invert',
    component: InvertWindow,
  },
  [RouteName.INTENSITY]: {
    path: '/intensity',
    component: IncreaseIntensityWindow,
  },
};

export { Routes };
