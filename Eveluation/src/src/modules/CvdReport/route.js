export default {
	path: "CvdReport",
	breadcrumbName: "缺血性心血管病风险评估",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../CvdReport/container/index')
			});
		}, 'CvdReport');
	},
}