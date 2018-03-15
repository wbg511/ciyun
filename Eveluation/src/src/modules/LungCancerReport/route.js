export default {
	path: "LungCancerReport",
	breadcrumbName: "肺癌风险评估",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../LungCancerReport/container/index')
			});
		}, 'LungCancerReport');
	},
}