import NotFound from '@containers/NotFoundPage/Loadable';
import ItunesContainer from './containers/ItunesContainer/index';
import routeConstants from '@utils/routeConstants';
import TrackDetail from './containers/ItunesContainer/TrackDetail/index';
export const routeConfig = {
  itunes: {
    component: ItunesContainer,
    ...routeConstants.itunes
  },
  track: {
    component: TrackDetail,
    ...routeConstants.trackDetails
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
