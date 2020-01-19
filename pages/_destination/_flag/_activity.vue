<template>
    <div>
        <div class="section hero banner">
            <div class="hero-body">
                <h1 class="title">{{post.title}}</h1>
                <p class="subtitle" v-if="post.address">{{post.address.formatted_address}}</p>
            </div>
        </div>
        <section class="section">
            <div class="columns">
                <div class="column is-8">
                    <div class="card">
                        <div class="card-image" v-if="post.photos.length">
                            <b-carousel :indicator-inside="true" indicator-type="is-lines" icon-pack="fa">
                                <b-carousel-item v-for="(item, i) in post.photos" :key="i">
                                    <div class="image">
                                        <img :src="item.sizes['600_200']" alt="">
                                    </div>
                                </b-carousel-item>
                            </b-carousel>
                        </div>
                        <div class="card-content content">
                            <p>{{post.description}}</p>
                            <div class="level">
                                <div class="level-left">
                                    <div class="buttons">
                                        <div class="button" @click="vote()"
                                             v-bind:class="{'is-success': post.is_voted}">
                                            <b-icon pack="fa" icon="caret-up"></b-icon>
                                            <span>{{post.total_vote}}</span>
                                        </div>
                                        <div class="button">
                                            <b-icon pack="fa" icon="comment-alt" size="is-small"></b-icon>
                                            <span>{{commentRes.count}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="level-right">
                                    <div class="button is-static">{{timeSince(post.created)}} ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
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
                                    <div class="level">
                                        <div class="level-left">
                                            <UserCard v-if="$auth.loggedIn" :value="$auth.user"></UserCard>
                                            <span class="button" v-else>Please login!</span>
                                        </div>
                                        <div class="level-right">
                                            <div class="buttons">
                                                <div class="button" @click="submit">Post</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="card-content">
                            <div class="columns is-multiline is-mobile is-gapless">
                                <div class="column is-3" v-for="i in 16" :key="i">
                                    <figure class="image">
                                        <img :src="`https://i.pravatar.cc/300?img=${i}`" alt="">
                                    </figure>
                                </div>
                                <div class="column is-12">
                                    <div class="button is-fullwidth is-danger">Join with us!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    export default {
        name: 'PostDetail',
        components: {},
        head() {
            return {
                title: this.post.title
            }
        },
        async asyncData({$api, params}) {
            let response = {
                results: [],
                count: 0
            }

            let activity = null
            let queries = {
                page_size: 5
            }
            let commentRes = {
                results: [],
                count: 0
            }
            if (params.thing) {
                activity = await $api.activity.get(params.thing)
                queries.post = activity.id
                commentRes = await $api.comment.list({post: activity.id})
            }
            return {
                post: activity,
                comment: {
                    post: activity ? activity.id : null,
                    content: null
                },
                commentRes,
                response
            }
        },
        data() {
            return {
                posts: [],

            }
        },
        methods: {
            async submit() {
                this.comment.user = this.$auth.user.id
                let res = await this.$api.comment.post(this.comment)
                console.log(res);
            },
            async vote() {
                let res = await this.$api.post.vote(this.post.id, {})
                this.post.is_voted = res.result
                if (res.result) {
                    this.post.total_vote++
                } else {
                    this.post.total_vote--
                }
            }
        }
    }
</script>
<style lang="scss">
    .banner {
        .has-gradient {
            .image {
                position: relative;

                &:before {
                    position: absolute;
                    content: "";
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
                }
            }
        }
    }

    .comments {
        margin: 2rem 0;

        .comment {
            margin-bottom: 1rem;
        }
    }
</style>
