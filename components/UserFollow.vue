<template>
    <div class="card">
        <div class="card-content">
            <div class="columns is-multiline is-mobile is-gapless" v-if="!currentUser">
                <div class="column is-4" v-for="i in 9" :key="i">
                    <figure class="image">
                        <img :src="`https://i.pravatar.cc/300?img=${i}`" alt="">
                    </figure>
                </div>
                <div class="column is-12">
                    <div class="button is-fullwidth is-danger">Join with us!</div>
                </div>
            </div>
            <div v-else class="columns is-multiline">
                <div class="column is-12">
                    <b-field label="Find your friend">
                        <b-input placeholder="Type something"></b-input>
                    </b-field>
                </div>
                <div class="column is-12">
                    <user-card v-for="u in response.results" :key="u.id" :value="u" :all-follow="true"></user-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserFollow",
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
                this.response = await this.$api.user.list({page_size: 5})
            }
        },
        async created() {
            await this.fetch()
        }
    }
</script>

<style scoped>

</style>
