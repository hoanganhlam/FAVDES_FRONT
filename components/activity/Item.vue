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
                            <n-link :to="`/posts/${activity.id}`">{{timeSince(activity.created)}}</n-link>
                        </small>
                        <small>
                            <b-icon size="is-small" icon="menu-right"></b-icon>
                        </small>
                        <small v-if="activity.address">
                            <n-link :to="`/add/${activity.address.id}`">{{activity.address['formatted_address']}}</n-link>
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
        <action-object :to="activity.slug" v-if="value['action_object']" :value="value['action_object']" :layout="layout"/>
        <div v-if="items.length && layout !== 'square' && activity.address" class="card-content" style="padding-top: 0">
            <div class="tags" style="margin-bottom: 0">
                <n-link class="tag" v-for="d in activity.address.destinations" :to="`/${d.slug}`" :key="d.id">
                    <b-icon icon="map-marker" size="is-small"></b-icon>
                    <span>{{d.title}}</span>
                </n-link>
            </div>
            <div class="tags">
                <n-link
                    class="tag"
                    v-for="t in activity.taxonomies"
                    :to="`/${primaryD && t.flag === 'PRIMARY' ? primaryD.slug : 'hashtag'}/${t.slug}`"
                    :key="t.id">
                    <b-icon size="is-small" icon="pound"></b-icon>
                    <span>{{t.title}}</span>
                </n-link>
            </div>
        </div>
        <div v-if="layout !== 'square'" class="card-content" style="padding-top: 0;">
            <div class="level is-mobile">
                <div class="level-left">
                    <div class="buttons">
                        <div class="button is-small" @click="doVote()"
                             v-bind:class="{'is-success': vote['is_voted'], 'is-loading': loading.vote}">
                            <b-icon size="is-small" icon="chevron-up"></b-icon>
                            <span>{{vote["total"]}}</span>
                        </div>
                        <div class="button is-small">
                            <b-icon size="is-small" icon="comment"></b-icon>
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
                },
                vote: {
                    total: 0,
                    is_voted: false
                }
            }
        },
        watch: {
            value() {
                this.activity = this.value
            }
        },
        methods: {
            async doVote() {
                this.loading.vote = true
                let res = await this.$api.activity.vote(this.activity.id, {})
                this.vote.is_voted = res.result
                if (res.result) {
                    this.vote["total"]++
                } else {
                    this.vote["total"]--
                }
                this.loading.vote = false
            }
        },
        created() {
            switch (this.value['action_object_content_type']) {
                case this.getType('post'):
                    Vue.component('action-object', Post)
                    break
                case this.getType('destination'):
                    Vue.component('action-object', Destination)
                    break
                default:
                    break
            }
            this.$axios.$get('/activity/check-vote/', {
                params: {
                    pk: this.activity.id
                }
            }).then(res => {
                this.vote = res
            })
        },
        computed: {
            actor() {
                let media = null
                let title = null
                let slug = null
                if (this.activity['actor_content_type'] === this.getType('user')) {
                    media = this.activity.actor.profile ? this.activity.actor.profile.media : null
                    title = this.convertName(this.activity.actor)
                    slug = `/profile/${this.activity.actor.username}`
                }
                return {
                    media,
                    title,
                    slug
                }
            },
            items() {
                if (this.activity.address) {
                    return this.activity.address['destinations']
                }
                return []
            },
            primaryD() {
                return this.activity.address && this.activity.address['destinations'].length ? this.activity.address['destinations'][0] : null
            }
        }
    }
</script>

<style scoped>

</style>
