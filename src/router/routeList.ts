import { Page404 } from '@pages/Error404Page';
import { ConstructorPage } from '@pages/ConstructorPage';
import { FC } from 'react';
import { RuntimePage } from '@pages/RuntimePage';

interface RouteItem {
  path: string;
  component: FC;
}

export const routeNameList = ['constructor', 'runtime', 'error404'] as const;

export type RouteNameList = (typeof routeNameList)[number];

export const routeList: Record<RouteNameList, RouteItem> = {
  constructor: {
    path: '/constructor',
    component: ConstructorPage,
  },

  runtime: { path: '/runtime', component: RuntimePage },

  error404: {
    path: '*',
    component: Page404,
  },
};
