export default {
	path: "DepressionReport",
	breadcrumbName: "脑卒中风险评估",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../DepressionReport/container/index')
			});
		}, 'DepressionReport');
	},
}