export default {
  itunes: {
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  trackDetails: {
    route: '/track/:trackId',
    props: {
      maxwidth: 1400,
      padding: 20
    },
    exact: true
  }
};
