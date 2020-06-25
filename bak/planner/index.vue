<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-multiline">
                    <div class="column is-4" v-for="trip in response.results" :key="trip.id">
                        <div class="card">
                            <div class="card-image">
                                <img src="https://i.picsum.photos/id/680/400/200.jpg" alt="">
                            </div>
                            <div class="card-content">
                                <div class="widget_title">
                                    <n-link :to="`/planner/${trip.id}`">{{trip.title}}</n-link>
                                </div>
                            </div>
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
