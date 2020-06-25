<template>
    <div class="activity-board">
        <div class="columns is-multiline">
            <div class="column is-4" v-for="a in response.results" :key="a.id">
                <activity layout="square" :value="a"></activity>
            </div>
        </div>
        <b-pagination
            :total="response.count"
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
</template>

<script>
    export default {
        name: "Board",
        props: {
            queries: {
                default: () => {
                    return {
                        page: 1
                    }
                }
            }
        },
        data() {
            return {
                response: {
                    results: [],
                    count: 0
                }
            }
        }
    }
</script>

<style scoped>

</style>
