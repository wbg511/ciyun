export default {
	path: "ObesityReport",
	breadcrumbName: "肥胖症风险评估",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../ObesityReport/container/index')
			});
		}, 'ObesityReport');
	},
}