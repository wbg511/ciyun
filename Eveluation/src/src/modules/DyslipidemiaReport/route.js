export default {
	path: "DyslipidemiaReport",
	breadcrumbName: "血脂异常风险评估报告",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../DyslipidemiaReport/container/index')
			});
		}, 'DyslipidemiaReport');
	},
}