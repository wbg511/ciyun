export default {
	path: "SasReport",
	breadcrumbName: "睡眠呼吸暂停综合征风险评估",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../SasReport/container/index')
			});
		}, 'SasReport');
	},
}