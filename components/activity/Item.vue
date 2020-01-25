<template>
    <div class="card post">
        <div class="card-content" style="padding-bottom: 0;" v-if="layout !== 'square'">
            <div class="media">
                <div class="media-left">
                    <Avatar class="is-32x32" :value="actor.media"></Avatar>
                </div>
                <div class="media-content" style="line-height: 1.2;">
                    <div>
                        <strong>
                            <n-link :to="actor.slug" v-if="actor.title">{{actor.title}}</n-link>
                        </strong>
                    </div>
                    <div>
                        <small>
                            <n-link :to="activity.slug">{{timeSince(activity.created)}}</n-link>
                        </small>
                        <small>
                            <b-icon size="is-small" icon="menu-right"></b-icon>
                        </small>
                        <small v-if="activity.address">
                            <n-link :to="`/add/${activity.address.id}`">{{activity.address.formatted_address}}</n-link>
                        </small>
                    </div>
                </div>
                <div class="media-right">
                    <div class="button is-text">
                        <b-icon icon="food"></b-icon>
                    </div>
                </div>
            </div>
        </div>
        <action-object :to="activity.slug" v-if="action_object" :value="action_object" :layout="layout"/>
        <div v-if="items.length && layout !== 'square'" class="card-content" style="padding-top: 0">
            <n-link v-if="target" class="tag" :to="`/${target.slug}`">{{target.title}}</n-link>
        </div>
        <div v-if="layout !== 'square'" class="card-content" style="padding-top: 0;">
            <div class="level is-mobile">
                <div class="level-left">
                    <div class="buttons">
                        <div class="button is-small" @click="vote()"
                             v-bind:class="{'is-success': activity['is_voted'], 'is-loading': loading.vote}">
                            <b-icon size="is-small" pack="fa" icon="caret-up"></b-icon>
                            <span>{{activity["total_vote"]}}</span>
                        </div>
                        <div class="button is-small">
                            <b-icon size="is-small" pack="fa" icon="comment-alt"></b-icon>
                            <span>0</span>
                        </div>
                    </div>
                </div>
                <div class="level-right">
                    <div class="button is-small">
                        <b-icon icon="cash-multiple" size="is-small"></b-icon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Post from "./Post";
    import Destination from "../Destination";

    export default {
        name: "Activity",
        components: {Destination},
        props: {
            value: {},
            layout: {
                default: null,
                type: String
            }
        },
        data() {
            return {
                activity: this.value,
                test: 0,
                loading: {
                    vote: false
                }
            }
        },
        watch: {
            value() {
                this.activity = this.value
            }
        },
        methods: {
            async vote() {
                this.loading.vote = true
                let res = await this.$api.activity.vote(this.activity.id, {})
                this.activity.is_voted = res.result
                if (res.result) {
                    this.activity["total_vote"]++
                } else {
                    this.activity["total_vote"]--
                }
                this.loading.vote = false
            }
        },
        created() {
            let kind = this.value && this["action_object"] ? this["action_object"]["model_name"] : ''
            switch (kind) {
                case 'Post':
                    Vue.component('action-object', Post)
                    break
                case 'Destination':
                    Vue.component('action-object', Destination)
                    break
                default:
                    break
            }
        },
        computed: {
            actor() {
                let media = null
                let title = null
                let slug = null
                if (this.activity.temp.actor) {
                    if (this.activity.temp.actor.model_name === 'User') {
                        media = this.activity.temp.actor.profile ? this.activity.temp.actor.profile.media : null
                        title = this.convertName(this.activity.temp.actor)
                        slug = `/profile/${this.activity.temp.actor.username}`
                    }
                }

                return {
                    media,
                    title,
                    slug
                }
            },
            target() {
                return this.activity.temp.target
            },
            action_object() {
                return this.activity.temp.action_object
            },
            items() {
                if (this.activity.address) {
                    return this.activity.address.destinations
                }
                return []
            }
        }
    }
</script>

<style scoped>

</style>
