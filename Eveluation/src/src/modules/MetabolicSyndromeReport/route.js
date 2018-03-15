export default {
	path: "MetabolicSyndromeReport",
	breadcrumbName: "代谢综合征风险评估",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../MetabolicSyndromeReport/container/index')
			});
		}, 'MetabolicSyndromeReport');
	},
}