<template>
    <div v-if="activity">
        <activity :value="activity" layout="full"></activity>
        <div>
            <h4 class="title is-6">Discussion</h4>
            <div class="comments">
                <div class="comment" v-for="c in commentRes.results" :key="c.id">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48 avatar">
                                <b-icon pack="fa" icon="user-circle" size="is-large"></b-icon>
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="author">
                                <b>
                                    <n-link :to="`/member/`">LA</n-link>
                                </b>
                            </div>
                            <small>{{timeSince(c.created)}}</small>
                            <div class="value content">
                                {{c.content}}
                            </div>
                        </div>
                        <div class="media-right">
                            <div>
                                <div class="button is-small is-text">
                                    <b-icon pack="far" icon="star"></b-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <b-field label="Message" label-position="inside">
                        <b-input type="textarea" v-model="comment.content"></b-input>
                    </b-field>
                    <div class="level is-mobile">
                        <div class="level-left">
                            <user-card v-if="currentUser" :value="currentUser"></user-card>
                            <span class="button is-static" v-else>Please login!</span>
                        </div>
                        <div class="level-right">
                            <div class="buttons">
                                <div class="button is-primary" @click="submit">Post</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <activity :layout="layout" v-for="a in activityRes.results" :key="a.id" :value="a"></activity>
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
</template>
<script>
    export default {
        name: 'PostDetail',
        props: {
            activityRes: {
                default: () => {
                    return {
                        results: [],
                        count: 0
                    }
                }
            },
            destination: {},
            subtitle: {
                default: null,
                type: String
            },
            q: {
                default: () => {
                    return {}
                },
                type: Object
            }
        },
        watchQuery: true,
        head() {
            return {
                title: this.title
            }
        },
        async asyncData({$api, params, query}) {
            let current = query.page || 1
            let commentRes = {
                results: [],
                count: 0
            }
            let activity = null
            if (params["activity"]) {
                activity = await $api.activity.get(params["activity"])
                commentRes = await $api.comment.list({post: activity.id})
            }
            return {
                activity: activity,
                comment: {
                    activity: activity ? activity.id : null,
                    content: null
                },
                commentRes,
                current
            }
        },
        data() {
            return {
                posts: [],
                queries: this.q
            }
        },
        methods: {
            async submit() {
                let res = await this.$api.comment.post(this.comment)
            }
        },
        computed: {
            temp() {
                return this.activity.temp
            },
            title() {
                let params = this.$route.params
                if (this.$auth.loggedIn && typeof params.activity === 'undefined' && typeof params.flag === 'undefined') {
                    return `Welcome, ${this.convertName(this.$auth.user)}`
                } else if (params.activity) {
                    return this.temp && this.temp["action_object"] && this.temp["action_object"].title ? this.temp["action_object"].title : this.temp["action_object"].content
                } else if (params.flag) {
                    return this.subtitle + ` in ${this.destination.title}`
                } else if (params.destination) {
                    return this.destination.title
                }
                return "9Destination - Get inspired and share your best moment!"
            },
            layout() {
                if (this.$route.params.activity) {
                    return 'full'
                }
                return this.$route.params.flag ? 'minimize' : 'random'
            }
        },
        mounted() {
            this.toTop()
        },
        watch: {
            q() {
                this.queries = this.q
            }
        }
    }
</script>
<style lang="scss">
    .comments {
        margin: 2rem 0;

        .comment {
            margin-bottom: 1rem;
        }
    }
</style>
