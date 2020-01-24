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
        }
    }
})
