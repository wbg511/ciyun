export default {
	path: "MajorPhysiologyIndicatorsReport",
	breadcrumbName: "主要生理指标",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../MajorPhysiologyIndicatorsReport/container/index')
			});
		}, 'MajorPhysiologyIndicatorsReport');
	},
}