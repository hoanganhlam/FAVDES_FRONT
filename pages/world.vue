<template>
    <div class="hero is-fullheight" v-if="destination">
        <div class="hero-body">
            <div class="container">
                <world-map style="margin-bottom: 1.5rem"></world-map>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "world",
        async asyncData({$api, query, params}) {
            query.page_size = 24
            let destination = null
            if (typeof params.destination === 'undefined') {
                destination = await $api.destination.list(query)
            }
            return {
                destination
            }
        },
        data() {
            return {
                data: {
                    US: 100,
                    CA: 120,
                    UK: 400,
                }
            }
        }
    }
</script>

<style scoped>

</style>
