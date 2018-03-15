export default {
	path: "SportPrescriptionReport",
	breadcrumbName: "推荐运动方案",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../SportPrescriptionReport/container/index')
			});
		}, 'SportPrescriptionReport');
	},
}