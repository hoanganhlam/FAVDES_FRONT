<template>
    <div :class="`card post layout-${layout}`">
        <div class="card-content" v-if="layout !== 'square'">
            <div class="media">
                <div class="media-left">
                    <Avatar class="is-32x32" :value="actor.media" :name="actor.title"/>
                </div>
                <div class="media-content" style="line-height: 1.2;">
                    <strong>
                        <n-link :to="actor.slug" v-if="actor.title">{{actor.title}}</n-link>
                    </strong>
                    <div>
                        <small>
                            <n-link :to="`/posts/${activity.id}`">{{timeSince(activity.created)}}</n-link>
                        </small>
                        <small v-if="activity.address">
                            <b-icon size="is-small" icon="menu-right"></b-icon>
                        </small>
                        <small v-if="activity.address">
                            <n-link :to="`/add/${activity.address.id}`">{{activity.address['formatted_address']}}
                            </n-link>
                        </small>
                    </div>
                </div>
            </div>
        </div>
        <action-object :to="`/posts/${activity.id}`" v-if="value['action_object']" :value="value['action_object']" :layout="layout">
            <div class="level" v-if="items.length && activity.address">
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
            <div class="level is-mobile">
                <div class="level-left">
                    <div class="buttons">
                        <div class="button is-text is-small" @click="doVote()"
                             v-bind:class="{'is-success': vote['is_voted'], 'is-loading': loading.vote}">
                            <b-icon size="is-small" icon="chevron-up"></b-icon>
                            <span>{{vote["total"]}}</span>
                        </div>
                        <n-link :to="`/posts/${activity.id}`" class="button is-text is-small">
                            <b-icon size="is-small" icon="comment"></b-icon>
                            <span>0</span>
                        </n-link>
                    </div>
                </div>
                <div class="level-right">
                    <user-card :show-name="false" :value="activity.actor"/>
                </div>
            </div>
        </action-object>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Post from "./Post";
    import Destination from "../card/Destination";

    export default {
        name: "Activity",
        components: {Destination, 'action-object': Post},
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
                this.loading.vote = true;
                let res = await this.$api.activity.vote(this.activity.id, {});
                this.vote.is_voted = res.result;
                if (res.result) {
                    this.vote["total"]++
                } else {
                    this.vote["total"]--
                }
                this.loading.vote = false
            }
        },
        created() {
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
                let media = null;
                let title = null;
                let slug = null;
                if (this.activity['actor_content_type_id'] === this.getType('user')) {
                    media = this.activity.actor.profile ? this.activity.actor.profile.media : null;
                    title = this.convertName(this.activity.actor);
                    slug = `/profile/${this.activity.actor.username}`;
                }
                return {
                    media,
                    title,
                    slug
                }
            },
            items() {
                if (this.activity.address) {
                    return this.activity.address['destinations'] ? this.activity.address['destinations'] : [];
                }
                return [];
            },
            primaryD() {
                return this.activity.address
                && this.activity.address['destinations']
                && this.activity.address['destinations'].length ? this.activity.address['destinations'][0] : null
            }
        }
    }
</script>

<style scoped>

</style>
