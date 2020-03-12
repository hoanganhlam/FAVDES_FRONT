import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import MapBox from "../components/map/MapBox";
import Google from "../components/map/Google";
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
Vue.component('google-map', Google)
Vue.component('MapBox', MapBox)
Vue.mixin({
    methods: {
        toTop() {
            const myDiv = document.getElementById('__layout');
            myDiv.scrollTop = 0;
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        reLayout() {
            let elem = document.querySelector('.grid');
            if (elem) {
                new Masonry(elem, {
                    // options
                    itemSelector: '.grid-item'
                });
            }
        },
        getBrowserLocation(callback) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(callback);
            }
        }
    }
})
