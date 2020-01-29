<template>
    <div v-if="activity">
        <activity :value="activity"/>
        <comment model="activity" :object-id="activity.id"></comment>
    </div>
</template>
<script>
    export default {
        name: 'PostDetail',
        props: {
            value: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                activity: this.value,
                loading: true
            }
        },
        methods: {
            async fetchActivity() {
                this.activity = await this.$api.activity.get(this.$route.params.activity)
            }
        },
        computed: {},
        watch: {
            $route() {
                if (this.$route.params.activity) {
                    this.fetchActivity()
                }
            }
        }
    }
</script>
<style lang="scss">
</style>
