const RestfulRepo = (app, item) => {
    let out = {
        list: async (query) => {
            return await app.$axios.$get(`/${item.space}/${item.endpoint}/`, {params: query})
        },
        post: async (body) => {
            return await app.$axios.$post(`/${item.space}/${item.endpoint}/`, body)
        },
        get: async (id, query) => {
            return await app.$axios.$get(`/${item.space}/${item.endpoint}/${id}/`, query)
        },
        update: async (id, body) => {
            return await app.$axios.$put(`/${item.space}/${item.endpoint}/${id}/`, body)
        },
        delete: async (id) => {
            return await app.$axios.$delete(`/${item.space}/${item.endpoint}/${id}/`)
        }
    }
    if (item.callbacks) {
        item.callbacks.forEach(callback => {
            if (callback.hasId) {
                out[callback.name] = async (id, body) => {
                    return await app.$axios[callback.method](`/${item.space}/${item.endpoint}/${id}/${callback.endpoint}`, body)
                }
            } else {
                out[callback.name] = async (body) => {
                    return await app.$axios[callback.method](`/${item.endpoint}/${callback.endpoint}`, body)
                }
            }

        })
    }
    return out
}

const apis_module = [
    {
        space: 'activity',
        endpoint: 'config',
        name: 'config',
        methods: {}
    },
    {
        space: 'auth',
        endpoint: 'users',
        name: 'user',
        methods: {}
    },
    {
        space: 'media',
        endpoint: 'medias',
        name: 'media',
        methods: {}
    },
    {
        space: 'destination',
        endpoint: 'addresses',
        name: 'address',
        methods: {}
    },
    {
        space: 'destination',
        endpoint: 'destinations',
        name: 'destination',
        methods: {}
    },
    {
        space: 'destination',
        endpoint: 'addresses',
        name: 'address',
        methods: {}
    },
    {
        space: 'activity',
        endpoint: 'comments',
        name: 'comment',
        callbacks: [
            {
                hasId: true,
                name: 'vote',
                method: '$post',
                endpoint: 'vote'
            }
        ]
    },
    {
        space: 'destination',
        endpoint: 'votes',
        name: 'vote',
        methods: {}
    },
    {
        space: 'activity',
        endpoint: 'taxonomies',
        name: 'taxonomy',
        methods: {}
    },
    {
        space: 'activity',
        endpoint: 'posts',
        name: 'post'
    },
    {
        space: 'activity',
        endpoint: 'activities',
        name: 'activity',
        callbacks: [
            {
                hasId: true,
                name: 'vote',
                method: '$post',
                endpoint: 'vote'
            }
        ]
    },
    {
        space: 'worker',
        endpoint: 'fetch-address-autocomplete',
        name: 'autocomplete',
        methods: {}
    },
    {
        space: 'worker',
        endpoint: 'fetch-place-reverse',
        name: 'reverse_geo',
        methods: {}
    },
]


export default function (app, inject) {
    const API = {}
    apis_module.forEach(item => {
        API[item.name] = RestfulRepo(app, item)
    })
    app.$api = API
    inject('api', API)
}
