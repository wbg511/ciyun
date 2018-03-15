import routeEnterInfo from "../common/routeEnterInfo"
export default {
  path: "bookingForm",
  onChange: routeEnterInfo,
  getIndexRoute(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        component: require('../bookingForm/container/Form')
      });
    }, 'bookingForm');
  },
  childRoutes: [{
    name: 'calendar',
    path: 'calendar',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('../bookingForm/container/Calendar'));
      }, 'calendar');
    }
  }]
}
