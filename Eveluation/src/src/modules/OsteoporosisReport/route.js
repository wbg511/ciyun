export default {
	path: "OsteoporosisReport",
	breadcrumbName: "骨质疏松风险评估",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../OsteoporosisReport/container/index')
			});
		}, 'OsteoporosisReport');
	},
}