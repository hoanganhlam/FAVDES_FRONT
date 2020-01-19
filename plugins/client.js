import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import MapBox from "../components/MapBox";
// import Map from '../components/Map'
//
// Vue.component('GMap', Map)
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyD9sg_2YrJD8Bg9NqPPPWUlHhNhlHIZjfs',
        libraries: 'places',
    },
    installComponents: true
})
Vue.component('MapBox', MapBox)
Vue.mixin({
    methods: {
        toTop() {
            const myDiv = document.getElementById('__layout');
            myDiv.scrollTop = 0;
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        formatData(data) {
            let out = {}
            Object.keys(data).forEach(
                field => {
                    if (data[field] && typeof data[field] === 'object' && data[field].id) {
                        out[field] = data[field].id
                    } else if (Array.isArray(data[field]) && data[field].length && typeof data[field][0] === 'object' && data[field][0].id) {
                        out[field] = data[field].map(x => x.id)
                    } else {
                        out[field] = data[field]
                    }
                }
            )
            return out
        }
    }
})
