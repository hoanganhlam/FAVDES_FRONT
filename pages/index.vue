<template>
    <div class="hero">
        <div class="hero-body">
            <div class="container">
                <div class="columns">
                    <div class="column is-8">
                        <div class="columns is-multiline">
                            <div class="column is-6" v-for="(d, i) in response.results" :key="i">
                                <destination :value="d"/>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="widget">
                            <UserLarge show-bio :value="randomUser"/>
                        </div>
                    </div>
                </div>
                <div class="widget_title has-text-centered">New</div>
                <activity-list :value="activity" :q="query"/>
            </div>
        </div>
    </div>
</template>

<script>
    import UserLarge from "../components/card/UserLarge";
    import Destination from "../components/card/Destination";

    export default {
        name: "Homepage",
        components: {
            Destination,
            UserLarge
        },
        async asyncData({$api, store, query}) {
            store.commit('config/SET_TARGET', null);
            store.commit('config/SET_TARGET_MODEL', 'destination');
            query.page = query.page ? Number.parseInt(query.page) : 1;
            query.page_size = query.page_size ? Number.parseInt(query.page_size) : 9;
            return {
                response: await $api.destination.list({page_size: 6}),
                activity: await $api.activity.list(query),
                query
            }
        },
        data() {
            return {
                randomUser: null
            }
        },
        head() {
            return {
                title: 'Travel Inspiration Photos | 9Destination'
            }
        },
        created() {
            this.$axios.$get('/general/meet-hunter/').then(res => {
                this.randomUser = res
            })
        }
    }
</script>

<style scoped>

</style>
