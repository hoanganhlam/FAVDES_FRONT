<template>
    <div>
        <section class="section hero is-small is-light" v-if="typeof $route.params.activity === 'undefined'"
                 v-bind:class="{'is-fullheight': updating}">
            <div class="hero-body">
                <div class="container">
                    <div v-if="typeof $route.params.flag === 'undefined'" class="columns">
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
                                        <img :src="p.sizes['270_270']" alt="">
                                    </div>
                                </div>
                                <div class="column" v-bind:class="{'is-3': destination.photos.length}">
                                    <Upload @done="destination.photos = $event"></Upload>
                                </div>
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="buttons is-right-desktop">
                                <b-dropdown aria-role="list" style="margin-right: 0.5rem">
                                    <button class="button" slot="trigger">
                                        <b-icon size="is-small" icon="fire"></b-icon>
                                    </button>
                                    <b-dropdown-item aria-role="listitem">Hot</b-dropdown-item>
                                    <b-dropdown-item aria-role="listitem">New</b-dropdown-item>
                                </b-dropdown>
                                <follow v-if="destination" model="destination" :pk="destination.id"></follow>
                                <div class="button">
                                    <b-icon size="is-small" icon="refresh"></b-icon>
                                </div>
                                <div class="button" @click="handleClick" v-if="destination"
                                     v-bind:class="{'is-success': updating}">
                                    <b-icon size="is-small" :icon="updating ? 'check' : 'pen'"></b-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="$route.params.flag">
                        <h1 class="title">{{title}}</h1>
                    </div>
                </div>
            </div>
        </section>
        <section class="section hero is-small" v-if="!updating">
            <div class="hero-body">
                <div class="container">
                    <div class="columns">
                        <div class="column is-8">
                            <ActivityList :value="response" :q="q"/>
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
            let q = {
                page: Number.parseInt(query.page) || 1
            }
            if (params.flag) {
                q.hashtag = params.flag
            }
            if (params.destination && !['hashtag', 'anywhere'].includes(params.destination)) {
                destination = await $api.destination.get(params.destination)
                q.destination = destination.id
            }
            let response = await $api.activity.list(q)
            return {
                destination,
                response,
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
                } else if (params.flag) {
                    if (this.destination) {
                        return this.subtitle + ` in ${this.destination.title}`
                    } else {
                        return this.subtitle
                    }
                } else if (params.destination) {
                    return this.destination.title
                }
                return "9Destination - Get inspired and share your best moment!"
            },
            subtitle() {
                return '#' + this.$route.params.flag
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
