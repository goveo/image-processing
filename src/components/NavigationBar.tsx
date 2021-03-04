import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Routes } from '../routes';

const NavigationBar: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState<string>(Routes.DEFAULT.path);
  const history = useHistory();

  useEffect(() => {
    history.listen((location) => {
      setActiveRoute(location.pathname);
    });
  }, [history]);

  const handleTabClick = useCallback(
    (route: string) => {
      setActiveRoute(route);
      history.push(route);
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
          value={route.path}
          label={route.title}
        />
      ))}
    </BottomNavigation>
  );
};

export default NavigationBar;
