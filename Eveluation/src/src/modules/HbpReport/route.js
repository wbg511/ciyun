export default {
	path: "HbpReport",
	breadcrumbName: "高血压风险评估",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../HbpReport/container/index')
			});
		}, 'HbpReport');
	},
}