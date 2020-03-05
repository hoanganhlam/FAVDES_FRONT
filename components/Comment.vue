<template>
    <div class="comment-wrap">
        <h4 class="title is-6">Discussion</h4>
        <div class="comments">
            <p class="has-text-centered" v-if="response.results.length === 0">
                <small>Nothing here!</small>
            </p>
            <div class="comment" v-for="c in response.results" :key="c.id">
                <div class="media">
                    <div class="media-left">
                        <avatar :class="avatarSize" v-model="c.user.profile.media" :name="convertName(c.user)"/>
                    </div>
                    <div class="media-content">
                        <div class="author">
                            <n-link :to="`/member/${c.user.username}`">{{convertName(c.user)}}</n-link>
                        </div>
                        <div class="value content">
                            {{c.content}}
                        </div>
                        <small>{{timeSince(c.created)}}</small>
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
        </div>
        <div class="comment-form">
            <b-field label="Message">
                <b-input :rows="3" type="textarea" v-model="comment.content" placeholder="This is amazing!"></b-input>
            </b-field>
            <div class="level is-mobile">
                <div class="level-left">
                    <user-card v-if="currentUser" :value="currentUser" :name="currentUser ? convertName(currentUser) : 'Guest'"/>
                </div>
                <div class="level-right">
                    <div class="buttons">
                        <div class="button is-primary" @click="push">Post</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Comment",
        props: {
            model: {
                type: String,
                default: 'activity'
            },
            module: {
                type: String,
                default: 'comment'
            },
            objectId: {
                type: Number,
                default: 0
            },
            avatarSize: {
                default: 'is-48x48'
            }
        },
        data() {
            return {
                response: {
                    results: [],
                    count: 0
                },
                comment: {
                    content: null
                }
            }
        },
        methods: {
            async fetch() {
                this.response = await this.$api[this.module].list({
                    page_size: 10,
                    [this.model]: this.objectId
                })
            },
            async push() {
                this.comment[this.model] = this.objectId
                let res = await this.$api[this.module].post(this.comment)
                this.response.results.push(res)
            }
        },
        watch: {
            objectId() {
                this.fetch()
            }
        },
        async created() {
            await this.fetch()
        }
    }
</script>

<style lang="scss">
    .comment-wrap {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .comments {
        flex-grow: 1;
        overflow: auto;

        .comment {
            margin-bottom: 0.5rem;
        }
    }
</style>
