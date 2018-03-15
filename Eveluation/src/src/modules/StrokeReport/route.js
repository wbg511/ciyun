export default {
	path: "StrokeReport",
	breadcrumbName: "脑卒中风险评估",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../StrokeReport/container/index')
			});
		}, 'StrokeReport');
	},
}