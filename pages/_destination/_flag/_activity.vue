<template>
    <div>
        <section class="section hero is-small is-light" v-if="typeof $route.params.flag === 'undefined'"
                 v-bind:class="{'is-fullheight': updating}">
            <div class="hero-body">
                <div class="container">
                    <div class="columns">
                        <div class="column">
                            <div class="content">
                                <h1 class="title is-spaced"
                                    v-bind:class="{'hidden': typeof $route.params.destination === 'undefined'}">
                                    <editable icon="format-title" :is-updating="updating" v-if="destination"
                                              v-model="destination.title"/>
                                    <span v-else>{{title}}</span>
                                </h1>
                                <p class="subtitle">
                                    <editable icon="text" type="textarea" :is-updating="updating" v-if="destination"
                                              v-model="destination.description"/>
                                    <span v-else>{{tag_line}}</span>
                                </p>
                                <p v-if="destination && destination.address">
                                    {{destination.address.formatted_address}}</p>
                            </div>
                            <div v-if="updating && destination" class="columns is-mobile">
                                <div class="column is-3" v-for="p in destination.photos" :key="p.id">
                                    <div class="image">
                                        <img :src="p.sizes['200_200']" alt="">
                                    </div>
                                </div>
                                <div class="column" v-bind:class="{'is-3': destination.photos.length}">
                                    <Upload @done="destination.photos = $event"></Upload>
                                </div>
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="buttons" style="justify-content: flex-end;">
                                <b-dropdown aria-role="list" style="margin-right: 0.5rem">
                                    <button class="button" slot="trigger">
                                        <b-icon size="is-small" pack="fa" icon="fire"></b-icon>
                                    </button>
                                    <b-dropdown-item aria-role="listitem">Hot</b-dropdown-item>
                                    <b-dropdown-item aria-role="listitem">New</b-dropdown-item>
                                </b-dropdown>
                                <follow v-if="destination" model="destination" :pk="destination.id"></follow>
                                <div class="button">
                                    <b-icon size="is-small" pack="fa" icon="retweet"></b-icon>
                                </div>
                                <div class="button" @click="handleClick" v-if="destination"
                                     v-bind:class="{'is-success': updating}">
                                    <b-icon size="is-small" pack="fa" :icon="updating ? 'check' : 'pen'"></b-icon>
                                </div>
                            </div>
                            <div class="buttons" style="justify-content: flex-end;" v-if="destination">
                                <n-link class="button is-medium" :to="`/${destination.slug}/restaurant/`">
                                    <b-icon icon="silverware"></b-icon>
                                </n-link>
                                <n-link class="button is-medium" :to="`/${destination.slug}/lodging/`">
                                    <b-icon icon="hotel"></b-icon>
                                </n-link>
                                <n-link class="button is-medium" :to="`/${destination.slug}/tourist-attraction/`">
                                    <b-icon icon="binoculars"></b-icon>
                                </n-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section hero is-small" v-if="!updating">
            <div class="hero-body">
                <div class="container">
                    <div class="columns">
                        <div class="column is-8">
                            <ActivityDetail v-if="$route.params.activity" :value="activity"/>
                            <ActivityList v-else :value="response" :q="q"/>
                        </div>
                        <div class="column">
                            <user-follow></user-follow>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'HomePage',
        async asyncData({$api, params, query}) {
            let destination = null
            let activity = null
            let q = {
                page: Number.parseInt(query.page) || 1
            }
            if (params.destination && !['world', 'anywhere'].includes(params.destination)) {
                destination = await $api.destination.get(params.destination)
                q.destination = destination.id
            }
            if (params.activity) {
                activity = await $api.activity.get(params.activity)
            }
            let response = await $api.activity.list(q)
            return {
                destination,
                response,
                activity,
                q
            }
        },
        data() {
            return {
                updating: false
            }
        },
        head() {
            return {
                title: this.title
            }
        },
        methods: {
            handleClick() {
                if (this.updating) {
                    this.push()
                } else {
                    this.updating = true
                }
            },
            async push() {
                let data = this.cleanData(this.destination)
                if (this.destination.id) {
                    await this.$api.destination.update(this.destination.slug, data)
                }
                this.updating = false
            }
        },
        computed: {
            title() {
                let params = this.$route.params
                if (this.$auth.loggedIn && typeof params.activity === 'undefined' && typeof params.flag === 'undefined') {
                    return `Welcome, ${this.convertName(this.$auth.user)}`
                } else if (params.activity) {
                    let temp = this.activity.temp
                    return temp && temp["action_object"] && temp["action_object"].title ? temp["action_object"].title : temp["action_object"].content
                } else if (params.flag) {
                    return this.subtitle + ` in ${this.destination.title}`
                } else if (params.destination) {
                    return this.destination.title
                }
                return "9Destination - Get inspired and share your best moment!"
            },
            subtitle() {
                switch (this.$route.params.flag) {
                    case 'lodging':
                        return `Where to stay`
                    case 'tourist-attraction':
                        return `Where to visit`
                    case 'restaurant':
                        return `What to eat`
                    default:
                        return null
                }
            },
            tag_line() {
                if (this.$auth.loggedIn) {
                    return "Get inspired and share your moment!"
                }
                return "Get inspired and share your best moment!"
            }
        },
        mounted() {
            this.toTop()
        }
    }
</script>
