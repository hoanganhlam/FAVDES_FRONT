<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <div class="columns">
                    <div class="column is-8">
                        <ActivityDetail :value="activity"/>
                    </div>
                    <div class="column">
                        <user-follow></user-follow>
                    </div>
                </div>
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
