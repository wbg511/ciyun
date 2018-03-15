export default {
	path: "PcReport",
	breadcrumbName: "前列腺癌风险评估",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../PcReport/container/index')
			});
		}, 'PcReport');
	},
}