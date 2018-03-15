import routeEnterInfo from "../common/routeEnterInfo"
export default {
  path: "orderPay/:recordId",
  onChange: routeEnterInfo,
  getIndexRoute(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        component: require('../pay/container/OrderPay')
      });
    }, 'orderPay');
  }
}
