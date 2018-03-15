export default {
	path: "PersonalInfomationReport",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../PersonalInfomationReport/container/index')
			});
		}, 'PersonalInfomationReport');
	},
}