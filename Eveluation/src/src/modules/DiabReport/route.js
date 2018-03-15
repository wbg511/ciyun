export default {
	path: "DiabReport",
	breadcrumbName: "糖尿病风险评估",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../DiabReport/container/index')
			});
		}, 'DiabReport');
	},
}