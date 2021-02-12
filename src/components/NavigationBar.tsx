import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Route, Routes } from '../routes';

const NavigationBar: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState<Route>(Routes.DEFAULT);
  const history = useHistory();

  const handleTabClick = useCallback(
    (route: Route) => {
      setActiveRoute(route);
      history.push(route.path);
    },
    [history],
  );

  return (
    <BottomNavigation
      value={activeRoute}
      onChange={(event, route) => {
        handleTabClick(route);
      }}
      showLabels
    >
      <BottomNavigationAction value={Routes.DEFAULT} label="Default" />
      <BottomNavigationAction value={Routes.INVERT} label="Invert" />
      <BottomNavigationAction value={Routes.INTENSITY} label="Intensity" />
    </BottomNavigation>
  );
};

export default NavigationBar;
