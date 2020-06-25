<template>
    <div class="card">
        <div class="card-content">
            <div class="columns is-multiline is-mobile" v-if="!currentUser">
                <div class="column is-4" v-for="(u, i) in response.results" :key="i">
                    <n-link :to="`/profile/${u.username}`">
                        <avatar class="is-1by1" :value="u.profile.media" :name="convertName(u)"/>
                    </n-link>
                </div>
                <div class="column is-12">
                    <div class="button is-fullwidth is-danger">Join with us!</div>
                </div>
            </div>
            <div v-else class="columns is-multiline">
                <div class="column is-12">
                    <b-field>
                        <b-input placeholder="Find your friends"></b-input>
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
                let size = this.currentUser ? 5 : 9
                this.response = await this.$api.user.list({page_size: size})
            }
        },
        async created() {
            await this.fetch()
        }
    }
</script>

<style scoped>

</style>
