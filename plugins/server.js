import Vue from 'vue'

Vue.mixin({
    methods: {
        cleanURI(url) {
            if (url) {
                return url.split("?")[0].split("#")[0];
            }
            return null
        },
        getType(field) {
            return this.$store.state.config.contentTypes[field]
        },
        getIMG(instance, size) {
            if (size && instance.sizes && instance.sizes[size]) {
                return instance.sizes[size]
            }
            return instance.path
        }
    }
})
