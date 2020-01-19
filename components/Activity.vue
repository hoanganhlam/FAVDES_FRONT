<template>
    <div class="card post">
        <div class="card-image" v-if="post.photos.length">
            <b-carousel :indicator-inside="true" icon-pack="fa" :pause-info="false" :auto-play="false">
                <b-carousel-item v-for="(item, i) in post.photos" :key="i">
                    <div class="image">
                        <img :src="item.sizes['600_200']" alt="">
                    </div>
                </b-carousel-item>
            </b-carousel>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <div class="has-text-centered">
                        <div class="vote button is-text" @click="vote()"
                             v-bind:class="{'is-success': post.is_voted}">
                            <div>
                                <b-icon pack="fa" icon="caret-up"></b-icon>
                            </div>
                            <div>{{post.total_vote}}</div>
                        </div>
                    </div>
                </div>
                <div class="media-content">
                    <h4 class="title is-5">
                        <n-link :to="`/unlocalized/${post.slug}`">{{post.title}}</n-link>
                    </h4>
                    <div class="meta">
                        <div class="level">
                            <div class="level-left">
                                <div class="elm media user">
                                    <div class="media-left">
                                        <div class="image is-24x24 empty small">
                                            <div class="wrap">
                                                <span>{{post.user ? convertName(post.user).charAt(0) : 'A'}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="media-content">
                                        <h4 v-if="post.user">{{convertName(post.user)}}</h4>
                                        <small>{{timeSince(post.created)}} ago</small>
                                    </div>
                                </div>
                            </div>
                            <div class="level-right">

                            </div>
                        </div>
                    </div>
                    <p>{{post.description}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Post",
        props: {
            value: {}
        },
        data() {
            return {
                post: this.value
            }
        },
        methods: {
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

<style scoped>

</style>
