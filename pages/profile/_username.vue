<template>
    <div class="profile">
        <div class="section hero is-small is-light">
            <div class="hero-body">
                <div class="container small">
                    <div class="columns is-mobile">
                        <div class="column is-2 has-text-left">
                            <Avatar :is-updating="updating" v-model="profile.media"></Avatar>
                        </div>
                        <div class="column">
                            <div class="media">
                                <div class="media-content">
                                    <h1 class="title is-4" v-if="!updating">{{convertName(user)}}</h1>
                                    <b-field v-else class="title" grouped>
                                        <b-field expanded>
                                            <b-input class="is-text" placeholder="First name"
                                                     v-model="user.first_name"></b-input>
                                        </b-field>
                                        <b-field expanded>
                                            <b-input class="is-text" placeholder="Last name"
                                                     v-model="user.last_name"></b-input>
                                        </b-field>
                                    </b-field>
                                </div>
                                <div class="media-right">
                                    <div class="buttons">
                                        <follow model="user" :pk="user.id" :value="user.is_following"></follow>
                                        <b-dropdown position="is-bottom-left" aria-role="menu">
                                            <div class="button" slot="trigger">
                                                <b-icon icon="dots-vertical" size="is-small"></b-icon>
                                            </div>
                                            <b-dropdown-item aria-role="listitem" @click="isUpdate = !isUpdate">
                                                <b-icon size="is-small" icon="pen"></b-icon>
                                                <span>Update Profile</span>
                                            </b-dropdown-item>
                                            <b-dropdown-item aria-role="listitem" @click="$auth.logout()">
                                                <b-icon size="is-small" icon="exit-to-app"></b-icon>
                                                <span>Logout</span>
                                            </b-dropdown-item>
                                        </b-dropdown>
                                    </div>
                                </div>
                            </div>
                            <div class="subtitle">
                                <editable placeholder="Bio" type="textarea" :rows="2" v-model="profile.description"
                                          :is-updating="updating"/>
                            </div>
                            <div v-if="updating">
                                <div class="button is-primary is-medium" @click="updateProfile">Save</div>
                            </div>
                        </div>
                    </div>
                    <b-loading :is-full-page="false" :active.sync="loading" :can-cancel="true"></b-loading>
                </div>
            </div>
        </div>
        <div class="hero is-small">
            <div class="hero-body">
                <div class="container large">
                    <div class="columns is-multiline is-mobile grid">
                        <div class="column is-6 grid-item" v-for="(a, i) in activityRes.results" :key="i">
                            <activity layout="square" :value="a"></activity>
                        </div>
                    </div>
                    <b-pagination
                        rounded
                        :total="activityRes.count"
                        :current.sync="queries.page"
                        :per-page="queries.page_size">
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
</template>

<script>
    export default {
        name: "ProfileDetail",
        watchQuery: ['page'],
        async asyncData({$api, params, store, query}) {
            let user = null
            let queries = {
                page_size: 9,
                page: Number.parseInt(query.page) || 1
            }
            if (params.username) {
                user = await $api.user.get(params.username)
                queries['target_content'] = store.state.config.contentTypes['user']
                queries['target'] = user.id
            }
            let activityRes = await $api.activity.list(queries)
            return {
                user,
                activityRes: activityRes,
                profile: user && user.profile ? user.profile : {},
                queries
            }
        },
        head() {
            return {
                title: this.convertName(this.user)
            }
        },
        data() {
            return {
                isUpdate: false,
                loading: false,
                activeTab: 0,
                baseTabs: [
                    {
                        label: 'Pictures',
                        content: 'Lorem ipsum dolor sit amet.',
                        displayed: true,
                    },
                    {
                        label: 'Music',
                        content: 'Lorem ipsum dolor sit amet.',
                        displayed: this.showMusic,
                    },
                    {
                        label: 'Videos',
                        content: 'Lorem ipsum dolor sit amet.',
                        displayed: true,
                    }
                ]
            }
        },
        methods: {
            async updateProfile() {
                this.loading = true
                let data = this.cleanData(this.user)
                data.profile = {
                    media: this.profile.media ? this.profile.media.id : null,
                    description: this.profile.description
                }
                await this.$api.user.update(this.user.username, data)
                this.loading = false
                this.isUpdate = false
            }
        },
        computed: {
            updating() {
                return this.$route.query.updating || this.isUpdate
            }
        },
        mounted() {
            this.toTop()
            this.$nextTick(() => {
                this.reLayout()
            })
        },
        updated() {
            if (process.client) {
                this.reLayout()
            }
        }
    }
</script>

<style scoped>

</style>
