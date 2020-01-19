export default function (context) {
    if (context.app['$auth']['token']) {
        context.$axios.setHeader('X-TRIP-TOKEN', context.app['$auth']['token'])
    }
    context.$axios.onError(e => {
        console.log(e);
    })
    context.$axios.onRequest(config => {

    })
}
