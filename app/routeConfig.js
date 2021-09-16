import NotFound from '@containers/NotFoundPage/Loadable';
import ItunesContainer from './containers/ItunesContainer/index';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  itunes: {
    component: ItunesContainer,
    ...routeConstants.itunes
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
