<template>
    <div v-if="!loading">
        <div class="columns is-multiline">
            <div class="column is-4" v-for="a in data.results" :key="a.id">
                <activity layout="square" :value="a"/>
            </div>
        </div>
        <b-pagination
            :total="data.count"
            :current.sync="queries.page"
            :per-page="q.page_size || 9">
            <b-pagination-button
                slot-scope="props"
                :page="props.page"
                :id="`page${props.page.number}`"
                tag="router-link"
                :href="`?page=${props.page.number}`"
                :to="`?page=${props.page.number}`">
                {{props.page.number}}
            </b-pagination-button>
            <b-pagination-button
                slot="previous"
                slot-scope="props"
                :page="props.page"
                tag="router-link"
                :href="`?page=${props.page.number}`"
                :to="`?page=${props.page.number}`">
                Previous
            </b-pagination-button>
            <b-pagination-button
                slot="next"
                slot-scope="props"
                :page="props.page"
                tag="router-link"
                :href="`?page=${props.page.number}`"
                :to="`?page=${props.page.number}`">
                Next
            </b-pagination-button>
        </b-pagination>
    </div>
    <div v-else>
        <div class="columns is-multiline">
            <div class="column is-4" v-for="i in 9" :key="i">
                <div class="card post layout-square">
                    <div class="card-image">
                        <div class="image is-1by1">
                            <b-skeleton :rounded="false" height="100%"></b-skeleton>
                        </div>
                    </div>
                    <div class="card-content">
                        <b-skeleton :rounded="false" height="1rem"></b-skeleton>
                    </div>
                    <div class="card-content" style="padding-top: 0">
                        <div class="level is-mobile">
                            <div class="level-left">
                                <b-skeleton width="1rem" height="1rem"></b-skeleton>
                            </div>
                            <div class="level-right">
                                <b-skeleton width="1rem" height="1rem"></b-skeleton>
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
        name: "List",
        props: {
            q: {
                type: Object,
                default: () => {
                    return {
                        page_size: 9,
                        page: 1
                    }
                }
            },
            value: {
                type: Object,
                default: () => {
                    return {
                        results: [],
                        count: 0
                    }
                }
            }
        },
        data() {
            return {
                data: this.value,
                queries: this.q,
                loading: false
            }
        },
        methods: {
            async fetch(page) {
                this.loading = true;
                this.queries.page = page;
                this.data = await this.$api.activity.list(this.queries);
                this.loading = false;
            }
        },
        watch: {
            $route() {
                let page = Number.parseInt(this.$route.query.page) || 1;
                this.fetch(page);
            }
        }
    }
</script>

<style scoped>

</style>
