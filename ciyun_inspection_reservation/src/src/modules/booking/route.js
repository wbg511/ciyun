import routeEnterInfo from "../common/routeEnterInfo"
export default {
  path: "booking",
  onChange: routeEnterInfo,
  getIndexRoute(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        component: require('../booking/container/Booking')
      });
    }, 'booking');
  },
  childRoutes: [
        {
            name: 'details',
            onChange: routeEnterInfo,
            path: 'details/:corpId/:reservationId',
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../booking/container/Details'));
                }, 'details');
            }
        },
				{
            name: 'item',
            onChange: routeEnterInfo,
            path: 'item/:id',
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../booking/container/Item'));
                }, 'item');
            }
        },
				{
            name: 'recommend',
            onChange: routeEnterInfo,
            path: 'recommend/:id',
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../booking/container/Recommend'));
                }, 'recommend');
            }
        },{
            name: 'notice',
            onChange: routeEnterInfo,
            path: 'notice/:type/:id',
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../booking/container/Notice'));
                }, 'notice');
            }
        }
    ]
}
