import ColorComponentsView from './views/ColorComponentsView';
import DefaultView from './views/DefaultView';
import IncreaseIntensityView from './views/IntensityView';
import InvertView from './views/InvertView';

export interface Route {
  path: string;
  component: React.FC;
}

export enum RouteName {
  DEFAULT = 'DEFAULT',
  INVERT = 'INVERT',
  INTENSITY = 'INTENSITY',
  COLOR_COMPONENTS = 'COLOR_COMPONENTS',
}

type RoutesDictionary = {
  [K in RouteName]: Route;
};

const Routes: RoutesDictionary = {
  [RouteName.INVERT]: {
    path: '/invert',
    component: InvertView,
  },
  [RouteName.INTENSITY]: {
    path: '/intensity',
    component: IncreaseIntensityView,
  },
  [RouteName.COLOR_COMPONENTS]: {
    path: '/color-components',
    component: ColorComponentsView,
  },
  [RouteName.DEFAULT]: {
    path: '/',
    component: DefaultView,
  },
};

export { Routes };
