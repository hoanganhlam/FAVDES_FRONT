export default {
    namespaced: true,
    state: () => ({
        user: null
    }),
    mutations: {
        ['SET_USER'](state, user) {
            state.user = user
        }
    },
    actions: {},
    getters: {
        getUser: state => {
            return state.user
        }
    }
}
