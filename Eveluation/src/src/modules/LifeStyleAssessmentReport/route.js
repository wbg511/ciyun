export default {
	path: "LifeStyleAssessmentReport",
	breadcrumbName: "行为与生活方式评价",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../LifeStyleAssessmentReport/container/index')
			});
		}, 'LifeStyleAssessmentReport');
	},
}