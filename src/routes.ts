import ColorComponentsView from './views/ColorComponentsView';
import DefaultView from './views/DefaultView';
import FiltersView from './views/FiltersView';
import IncreaseIntensityView from './views/IntensityView';
import InvertView from './views/InvertView';
import MergeView from './views/MergeView';

export interface Route {
  path: string;
  component: React.FC;
  title: string;
}

export enum RouteName {
  DEFAULT = 'DEFAULT',
  INVERT = 'INVERT',
  INTENSITY = 'INTENSITY',
  COLOR_COMPONENTS = 'COLOR_COMPONENTS',
  MERGE = 'MERGE',
  FILTERS = 'FILTERS',
}

type RoutesDictionary = {
  [K in RouteName]: Route;
};

const Routes: RoutesDictionary = {
  [RouteName.DEFAULT]: {
    path: '/',
    component: DefaultView,
    title: 'Default',
  },
  [RouteName.INVERT]: {
    path: '/invert',
    component: InvertView,
    title: 'Invert',
  },
  [RouteName.INTENSITY]: {
    path: '/intensity',
    component: IncreaseIntensityView,
    title: 'Intensity',
  },
  [RouteName.COLOR_COMPONENTS]: {
    path: '/color-components',
    component: ColorComponentsView,
    title: 'Color components',
  },
  [RouteName.MERGE]: {
    path: '/merge',
    component: MergeView,
    title: 'Merge',
  },
  [RouteName.FILTERS]: {
    path: '/filters',
    component: FiltersView,
    title: 'Filters',
  },
};

export { Routes };
