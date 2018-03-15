import routeEnterInfo from "../common/routeEnterInfo"
export default {
  path: "special",
  onChange: routeEnterInfo,
  getIndexRoute(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        component: require('../special/container/List')
      });
    }, 'special');
  },
  childRoutes: [
        {
            name: 'details',
            onChange: routeEnterInfo,
            path: 'details/:id',
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../special/container/Details'));
                }, 'Details');
            }
        }
    ]
}
