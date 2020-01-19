export default {
    namespaced: true,
    state: () => ({
        contentTypes: null,
    }),
    mutations: {
        ['SET_CONTENT_TYPE'](state, ct) {
            state.contentTypes = ct
        }
    },
    actions: {},
    getters: {
        getCT: state => {
            return state.contentTypes
        }
    }
}
