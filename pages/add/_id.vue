<template>
    <div class="address_page columns is-gapless">
        <div class="column">
            <client-only>
                <MapBox height="100%" :addresses="[address]"></MapBox>
            </client-only>
        </div>
        <div class="has-stream column" v-bind:class="{'hidden_x': hidden}">
            <div class="close" @click="hidden = !hidden">
                <b-icon icon="close"></b-icon>
            </div>
            <div class="wrap" v-if="!hidden">
                <div class="head">
                    <div class="container small">
                        <div class="level">
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
                    <div class="container small">
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
                padding: .5rem 0;
                margin-bottom: 2rem;
            }

            .wrap {
                position: relative;
                overflow: auto;
                width: 100%;
                height: 100%;
            }

            .close {
                position: absolute;
                left: -62px;
                padding: 0.5rem;
                top: 0;
                border-bottom: 10px solid transparent;
                border-left: 10px solid transparent;
                border-right: 36px solid #EEEEEE;
                border-top: 10px solid transparent;
                height: 49px;
                cursor: pointer;

                .icon {
                    position: absolute;
                    right: -30px;
                    top: 0;
                }

                &:before {
                    content: "";
                    position: absolute;
                    left: -8px;
                    padding: 0.5rem;
                    top: -10px;
                    border-bottom: 10px solid transparent;
                    border-left: 9px solid transparent;
                    border-right: 35px solid white;
                    border-top: 10px solid transparent;
                    height: 48px;
                }
            }
        }
    }
</style>
