import routeEnterInfo from "../common/routeEnterInfo"
export default {
  path: "histroy",
  onChange: routeEnterInfo,
  getIndexRoute(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        component: require('../histroy/container/List.jsx')
      });
    }, 'histroy');
  },
  childRoutes: [{
    name: 'details',
    onChange: routeEnterInfo,
    path: 'details/:recordId',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('../histroy/container/Details'));
      }, 'details');
    }
  }, {
    name: 'package',
    onChange: routeEnterInfo,
    path: 'package/:recordId',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('../histroy/container/Package'));
      }, 'package');
    }
  }]
}
