export default {
	path: "answer",
	breadcrumbName: "中新惠尔健康评测",
	getIndexRoute(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, {
				component: require('../answer/container/index')
			});
		}, 'answer');
	},
	childRoutes: [{
		name: 'PersonalInfomationQuestionaire',
		path: 'PersonalInfomationQuestionaire',
		getComponent(location, cb) {
			require.ensure([], (require) => {
				cb(null, require('../answer/container/PersonalInfomationQuestionaire'));
			}, 'PersonalInfomationQuestionaire');
		}
	}, {
		name: 'FamilyAndPersonalIllnessQuestionaire',
		path: 'FamilyAndPersonalIllnessQuestionaire',
		getComponent(location, cb) {
			require.ensure([], (require) => {
				cb(null, require('../answer/container/FamilyAndPersonalIllnessQuestionaire'));
			}, 'FamilyAndPersonalIllnessQuestionaire');
		}
	}, {
		name: 'MedicationInfomationQuestionaire',
		path: 'MedicationInfomationQuestionaire',
		getComponent(location, cb) {
			require.ensure([], (require) => {
				cb(null, require('../answer/container/MedicationInfomationQuestionaire'));
			}, 'MedicationInfomationQuestionaire');
		}
	}, {
		name: 'LivingHabitsAndEnvironmentalEvaluationQuestionaire',
		path: 'LivingHabitsAndEnvironmentalEvaluationQuestionaire',
		getComponent(location, cb) {
			require.ensure([], (require) => {
				cb(null, require('../answer/container/LivingHabitsAndEnvironmentalEvaluationQuestionaire'));
			}, 'LivingHabitsAndEnvironmentalEvaluationQuestionaire');
		}
	}, {
		name: 'PsychologyAndSleepQuestionaire',
		path: 'PsychologyAndSleepQuestionaire',
		getComponent(location, cb) {
			require.ensure([], (require) => {
				cb(null, require('../answer/container/PsychologyAndSleepQuestionaire'));
			}, 'PsychologyAndSleepQuestionaire');
		}
	}, {
		name: 'PhysicalIndicatorsQuestionaire',
		path: 'PhysicalIndicatorsQuestionaire',
		getComponent(location, cb) {
			require.ensure([], (require) => {
				cb(null, require('../answer/container/PhysicalIndicatorsQuestionaire'));
			}, 'PhysicalIndicatorsQuestionaire');
		}
	}, {
		name: 'QuestionnaireGeneration',
		path: 'QuestionnaireGeneration',
		getComponent(location, cb) {
			require.ensure([], (require) => {
				cb(null, require('../answer/container/QuestionnaireGeneration'));
			}, 'QuestionnaireGeneration');
		}
	}]
}