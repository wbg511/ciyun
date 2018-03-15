import routeEnterInfo from "../common/routeEnterInfo"
export default {
	path: "bookingResult",
	onChange: routeEnterInfo,
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../bookingResult/container/Message')
			});
		}, 'bookingResult');
	}
}
