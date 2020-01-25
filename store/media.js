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
        ['SET_INDEX'](state, index) {
            state.index = index
        },
    },
    actions: {
        setData({commit, state}, data) {
            commit('SET_DATA', data)
        },
        setIndex({commit, state}, index) {
            commit('SET_INDEX', index)
        }
    },
    getters: {
        getMedias: state => {
            return state.medias
        }
    }
}
