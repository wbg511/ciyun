export default {
	path: "channel",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('./container/ChannelList')
			});
		}, 'channel');
	}
}
