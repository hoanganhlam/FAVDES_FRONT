<template>
    <div v-if="!loading">
        <create-post style="margin-bottom: 1.5rem" @done="fetch(1)"></create-post>
        <activity v-for="a in data.results" :key="a.id" :value="a" layout="minimize"></activity>
        <b-pagination
            :total="data.count"
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
    <div v-else>
        <div class="skeleton" v-for="i in 10" :key="i"></div>
    </div>
</template>

<script>
    export default {
        name: "List",
        props: {
            q: {
                type: Object,
                default: () => {
                    return {}
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
                this.loading = true
                this.queries.page = page
                this.data = await this.$api.activity.list(this.queries)
                this.loading = false
            }
        },
        watch: {
            $route() {
                let page = Number.parseInt(this.$route.query.page) || 1
                this.fetch(page)
            }
        }
    }
</script>

<style scoped>

</style>
