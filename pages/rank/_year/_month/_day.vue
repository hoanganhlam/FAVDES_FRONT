<template>
    <div class="hero" v-bind:class="{'is-fullheight': showMap}">
        <div class="hero-body">
            <div class="container" v-bind:class="{'small': !showMap}">
                <world-map v-if="showMap" style="margin-bottom: 1.5rem"></world-map>
                <div v-else>
                    <div class="level is-mobile">
                        <div class="level-left">
                            <div class="buttons">
                                <n-link class="button" :to="`/rank?m=dar`" v-bind:class="{'is-primary': !$route.query.m || $route.query.m === 'dar'}">
                                    <b-icon icon="map-marker-circle"></b-icon>
                                    <span>Destination</span>
                                </n-link>
                            </div>
                        </div>
                    </div>
                    <div class="card" v-for="d in response.results" :key="d.id">
                        <div class="card-content">
                            <div class="media" v-if="model === 'dar'">
                                <div class="media-left">
                                    <div class="image is-96x96">
                                        <thumbnail :value="d.destination.photos"></thumbnail>
                                    </div>
                                </div>
                                <div class="media-content">
                                    <h3 class="title is-4" style="margin-bottom: 0">
                                        <n-link :to="`/${d.destination.slug}`">{{d.destination.title}}</n-link>
                                    </h3>
                                    <small v-if="d.address">{{d.destination.address.formatted_address}}</small>
                                </div>
                                <div class="media-right">
                                    <div class="has-text-right">
                                        <div>{{d.count}}</div>
                                        <small>Checkin</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-switch
            class="fixed right"
            v-model="showMap"
            size="is-medium"
            :rounded="false"
            :outlined="false"
            type="success">map</b-switch>
    </div>
</template>

<script>
    export default {
        name: "Ranking",
        async asyncData({$api, query, params}) {
            let model = query.m || 'dar'
            let today = new Date()
            let month = params.month || today.getMonth() + 1
            let day = params.day || today.getDate()
            let year = params.year || today.getFullYear()
            let response = await $api[model].list({
                date: `${day}/${month}/${year}`
            })
            return {
                response,
                model
            }
        },
        watchQuery: true,
        head() {
            return {
                title: "9Destination Ranking"
            }
        },
        data() {
            return {
                showMap: false
            }
        }
    }
</script>

<style scoped>

</style>
