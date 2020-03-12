<template>
    <section class="section hero is-small">
        <div class="hero-body">
            <div class="container">
                <div class="level is-mobile">
                    <div class="level-left">
                        <h1 class="title">Plan</h1>
                    </div>
                    <div class="level-right">
                        <n-link to="/planner/create" class="button">Create plan</n-link>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <b-notification aria-close-label="Close notification">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                        </b-notification>
                        <b-table :data="response.results">
                            <template slot-scope="props">
                                <b-table-column field="title" label="Title" sortable>
                                    {{ props.row.title }}
                                </b-table-column>
                                <b-table-column sticky class="has-text-right">
                                    <n-link class="button is-small" :to="`/planner/${ props.row.id }`">
                                        <b-icon icon="chevron-right" size="is-small"></b-icon>
                                    </n-link>
                                </b-table-column>
                            </template>
                        </b-table>
                    </div>
                    <div class="column is-4">
                        <h4 class="widget_title">From network</h4>
                        <div class="card" v-for="sc in response.results" :key="sc.id">
                            <div class="card-content"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Plan",
        data() {
            return {
                response: {
                    results: [],
                    count: 0
                }
            }
        },
        methods: {
            async fetch() {
                this.response = await this.$api.schedule.list({})
            }
        },
        created() {
            this.fetch()
        }
    }
</script>

<style scoped>

</style>
