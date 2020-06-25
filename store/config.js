export default {
    namespaced: true,
    state: () => ({
        contentTypes: null,
        currentTarget: null,
        targetModel: null
    }),
    mutations: {
        ['SET_CONTENT_TYPE'](state, ct) {
            state.contentTypes = ct
        },
        ['SET_TARGET'](state, ct) {
            state.currentTarget = ct
        },
        ['SET_TARGET_MODEL'](state, ct) {
            state.targetModel = ct
        },
    },
    actions: {},
    getters: {
        getCT: state => {
            return state.contentTypes
        }
    }
}
