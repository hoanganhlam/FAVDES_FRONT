<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container small">
                <ActivityDetail :value="activity"/>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'HomePage',
        async asyncData({$api, params, query}) {
            let activity = await $api.activity.get(params.activity)
            return {
                activity
            }
        },
        data() {
            return {}
        },
        head() {
            return {
                title: this.title
            }
        },
        methods: {},
        computed: {
            title() {
                let temp = this.activity
                return temp && temp["action_object"] && temp["action_object"].title ? temp["action_object"].title : temp["action_object"].content
            }
        },
        mounted() {
            this.toTop()
        }
    }
</script>
