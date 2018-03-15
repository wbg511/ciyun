import routeEnterInfo from "../common/routeEnterInfo"
export default {
	path: "huojianwa",
	onChange: routeEnterInfo,
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../huojianwa/container/Form')
			});
		}, 'huojianwa');
	}
}
