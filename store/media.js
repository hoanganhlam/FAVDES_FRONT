export default {
    namespaced: true,
    state: () => ({
        medias: [],
        index: -1,
        user: null
    }),
    mutations: {
        ['SET_DATA'](state, {medias, index, user}) {
            state.medias = medias
            state.index = index
            state.user = user
        },
    },
    actions: {
        setData({commit, state}, data) {
            commit('SET_DATA', data)
        }
    },
    getters: {
        getMedias: state => {
            return state.medias
        }
    }
}
