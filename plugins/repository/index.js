const RestfulRepo = (app, endpoint, callbacks) => {
    let out = {
        list: async (query) => {
            return await app.$axios.$get(`/${endpoint}`, {params: query})
        },
        post: async (body) => {
            return await app.$axios.$post(`/${endpoint}`, body)
        },
        get: async (id, query) => {
            return await app.$axios.$get(`/${endpoint}/${id}`, query)
        },
        update: async (id, body) => {
            return await app.$axios.$put(`/${endpoint}/${id}`, body)
        },
        delete: async (id) => {
            return await app.$axios.$delete(`/${endpoint}/${id}`)
        }
    }
    if (callbacks) {
        callbacks.forEach(callback => {
            if (callback.hasId) {
                out[callback.name] = async (id, body) => {
                    return await app.$axios[callback.method](`/${endpoint}/${id}/${callback.endpoint}`, body)
                }
            } else {
                out[callback.name] = async (body) => {
                    return await app.$axios[callback.method](`/${endpoint}/${callback.endpoint}`, body)
                }
            }

        })
    }
    return out
}

const apis_module = [
    {
        endpoint: 'users',
        name: 'user',
        methods: {}
    },
    {
        endpoint: 'files',
        name: 'file',
        methods: {}
    },
    {
        endpoint: 'subjects',
        name: 'subject'
    },
    {
        endpoint: 'submissions',
        name: 'submission'
    },
    {
        endpoint: 'taxonomies',
        name: 'taxonomy'
    },
    {
        endpoint: 'comments',
        name: 'comment'
    },
    {
        endpoint: 'votes',
        name: 'vote'
    },
    {
        endpoint: 'collections',
        name: 'collection',
        callbacks: [
            {
                hasId: true,
                name: 'submissions',
                method: '$post',
                endpoint: 'submissions'
            }
        ]
    }
]


export default function (app, inject) {
    const API = {}
    apis_module.forEach(item => {
        API[item.name] = RestfulRepo(app, item.endpoint, item.callbacks)
    })
    app.$api = API
    inject('api', API)
}
