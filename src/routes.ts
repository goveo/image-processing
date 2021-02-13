import DefaultView from './views/DefaultView';
import IncreaseIntensityView from './views/IntensityView';
import InvertView from './views/InvertView';

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
    component: DefaultView,
  },
  [RouteName.INVERT]: {
    path: '/invert',
    component: InvertView,
  },
  [RouteName.INTENSITY]: {
    path: '/intensity',
    component: IncreaseIntensityView,
  },
};

export { Routes };
