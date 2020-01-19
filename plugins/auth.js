const cookieparser = process['server'] ? require('cookieparser') : undefined

export default async function (context, inject) {
    let token = null
    let user = null
    const fetchUser = async () => {
        return await context.$graph['authentication_profile']({}).catch(e => {console.log(e);})
    }
    if (process['server'] && context.req.headers.cookie) {
        const parsed = cookieparser.parse(context.req.headers.cookie)
        token = parsed['auth.token']
    } else {
        token = context.store.$ck.get('auth.token')
    }
    if (token) {
        context.$axios.setHeader('X-TRIP-TOKEN', token)
        context.$rest.defaults.headers.common['Authorization'] = 'JWT ' + token
    }
    let res = await fetchUser()
    user = res.data ? res.data['authentication_profile'] : null
    await context.store.commit('auth/SET_USER', user)
    const auth = {
        loggedIn: !!token && user,
        token,
        user: context.store.getters['auth/getUser'],
        async login(credential) {
            let res = await context.$graph['authentication_login']({
                credential
            }).catch(e => {
                console.log(e);
            })
            if (typeof res['errors'] === 'undefined') {
                context.store.$ck.set('auth.token', res.data['authentication_login']['token'], {
                    maxAge: 60 * 60 * 24 * 7,
                    path: '/'
                })
            }
        },
        fetchUser
    }
    context.$auth = auth
    inject('auth', auth)
}
