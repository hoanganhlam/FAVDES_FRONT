<template>
    <div>
        <div class="hero is-small">
            <div class="hero-body">
                <div class="container small has-text-centered">
                    <div class="image is-128x128" style="margin: 0 auto">
                        <img :src="`/inspiration/travel-${Math.floor(Math.random() * 6)}.png`" alt=""></div>
                    <h1 class="title is-spaced" v-bind:class="{'is-1': query.page === 1}">
                        <span>9Destination</span>
                        <span v-if="query.page > 1" class="tag">page {{query.page}}</span>
                    </h1>
                    <div class="subtitle" v-if="query.page === 1">Howdy? Dawn is a simple yet powerful Ghost theme with
                        features including.
                    </div>
                    <div v-if="query.page === 1" class="buttons" style="justify-content: center">
                        <div class="button is-rounded is-medium" v-for="d in response.results" :key="d.id">
                            <n-link :to="`/${d.slug}`" class="media" style="justify-content: center">
                                <div class="media-left">
                                    <avatar class="is-32x32" :value="d.temp_media"/>
                                </div>
                                <div class="media-content">{{d.title}}</div>
                            </n-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hero">
            <div class="hero-body">
                <div class="container">
                    <activity-list :value="activity" :q="query">
                        <div class="widget_title has-text-centered uppercase">
                            <b-icon icon="fire"></b-icon>
                            <span v-if="query.page === 1">Popular today</span>
                            <span v-else>Results</span>
                        </div>
                    </activity-list>
                </div>
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
                response: await $api.destination.list({page_size: 9}),
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
        },
        methods: {}
    }
</script>

<style scoped>

</style>
