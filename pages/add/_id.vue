<template>
    <div class="address_page columns is-gapless">
        <div class="column">
            <client-only>
                <MapBox height="100%" :addresses="[address]"></MapBox>
            </client-only>
        </div>
        <div class="has-stream column" v-bind:class="{'hidden_x': hidden}">
            <div class="wrap" v-if="!hidden">
                <div class="head">
                    <div class="container small">
                        <div class="level is-mobile">
                            <div class="level-left">
                                <h1 class="title is-4">{{address['formatted_address']}}</h1>
                            </div>
                            <div class="level-right">
                                <div class="buttons">
                                    <div class="button is-text">
                                        <b-icon icon="rss" size="is-small"></b-icon>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="body">
                    <div class="container">
                        <div class="columns grid">
                            <div class="column is-6 grid-item" v-for="a in activityRes.results" :key="a.id">
                                <activity :value="a"></activity>
                            </div>
                        </div>
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
        data() {
            return {
                hidden: false
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
            this.$nextTick(() => {
                this.reLayout()
            })
        }
    }
</script>

<style lang="scss">
    .address_page {
        height: calc(100vh - 45px);
        position: relative;

        .has-stream {
            background: #FFF;
            position: relative;

            &.hidden_x {
                flex: inherit;
            }

            .head {
                box-shadow: 0 0 1px 1px #EEE;
                padding: 0.5rem 0;
            }

            .body {
                padding: 1.5rem 0;
            }

            .wrap {
                position: relative;
                overflow: auto;
                width: 100%;
                height: 100%;

                &::-webkit-scrollbar {
                    display: none;
                }
            }
        }
    }
</style>
