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
      {Object.values(Routes).map((route) => (
        <BottomNavigationAction
          key={route.path}
          value={route}
          label={route.title}
        />
      ))}
    </BottomNavigation>
  );
};

export default NavigationBar;
