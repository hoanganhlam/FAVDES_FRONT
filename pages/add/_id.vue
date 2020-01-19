<template>
    <div>
        <div>
            <client-only>
                <MapBox :addresses="[address]"></MapBox>
            </client-only>
        </div>
        <div class="section is-small hero">
            <div class="hero-body">
                <div class="container small">
                    <div class="card" v-if="address.address_components.length">
                        <div class="card-content">
                            <div class="content">
                                <span v-for="(c, i) in address.address_components" :key="i">
                                    <span>{{c.long_name}}</span>
                                    <b-icon v-if="i < address.address_components.length - 1" icon="arrow-right"
                                            size="is-small"></b-icon>
                                </span>
                            </div>
                        </div>
                    </div>
                    <activity v-for="a in activityRes.results" :key="a.id" :value="a"></activity>
                    <b-pagination
                        :total="activityRes.count"
                        :current.sync="queries.page"
                        :per-page="10">
                        <b-pagination-button
                            slot-scope="props"
                            :page="props.page"
                            :id="`page${props.page.number}`"
                            tag="router-link"
                            :to="`?page=${props.page.number}`">
                            {{props.page.number}}
                        </b-pagination-button>
                        <b-pagination-button
                            slot="previous"
                            slot-scope="props"
                            :page="props.page"
                            tag="router-link"
                            :to="`?page=${props.page.number}`">
                            Previous
                        </b-pagination-button>
                        <b-pagination-button
                            slot="next"
                            slot-scope="props"
                            :page="props.page"
                            tag="router-link"
                            :to="`?page=${props.page.number}`">
                            Next
                        </b-pagination-button>
                    </b-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Destination from "../../components/Destination";
    export default {
        name: "AddressPage",
        components: {Destination},
        async asyncData({params, $api, query}) {
            let res = await $api.address.get(params.id)
            let queries = {
                page_size: 10,
                address: res.id,
                page: query.page ? Number.parseInt(query.page) : 1
            }
            let activityRes = await $api.activity.list(queries)
            res.address_components = res.address_components ? res.address_components.reverse() : []
            return {
                address: res,
                activityRes,
                queries
            }
        },
        watchQuery: true,
        head() {
            return {
                title: this.address["formatted_address"]
            }
        },
        mounted() {
            this.toTop()
        }
    }
</script>

<style scoped>

</style>
