export default {
	path: "NurPrescriptionReport",
	breadcrumbName: "推荐膳食处方",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../NurPrescriptionReport/container/index')
			});
		}, 'NurPrescriptionReport');
	},
}