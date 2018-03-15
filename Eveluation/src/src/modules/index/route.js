export default {
	path: "index",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('./container/Index')
			});
		}, 'index');
	}
}
