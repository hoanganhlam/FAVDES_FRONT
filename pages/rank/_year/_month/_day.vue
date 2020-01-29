<template>
    <div class="hero">
        <div class="hero-body">
            <div class="container" v-bind:class="{'small': !showMap}">
                <world-map v-if="showMap" style="margin-bottom: 1.5rem"></world-map>
                <div v-else>
                    <div class="tabs is-centered">
                        <ul>
                            <li v-bind:class="{'is-active': model === 'dar'}">
                                <n-link :to="`/rank?m=dar`">
                                    <b-icon icon="map-marker-circle"></b-icon>
                                    <span>Destination</span>
                                </n-link>
                            </li>
                            <li v-bind:class="{'is-active': model === 'user'}">
                                <n-link :to="`/rank?m=user`">
                                    <b-icon icon="seal"></b-icon>
                                    <span>Member</span>
                                </n-link>
                            </li>
                        </ul>
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
