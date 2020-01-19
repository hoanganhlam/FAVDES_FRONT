import Vue from 'vue'

Vue.mixin({
    methods: {
        cleanURI(url) {
            return url.split("?")[0].split("#")[0];
        }
    }
})
