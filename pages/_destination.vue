<template>
    <div>
        <section class="section hero is-small is-light" v-if="typeof $route.params.flag === 'undefined'">
            <div class="hero-body">
                <div class="container">
                    <div class="columns">
                        <div class="column">
                            <div>
                                <p v-if="subtitle" style="margin-bottom: 0">{{subtitle}}</p>
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
                                <div class="button" v-if="$route.params.destination">
                                    <b-icon size="is-small" pack="fa" icon="bookmark"></b-icon>
                                </div>
                                <div class="button">
                                    <b-icon size="is-small" pack="fa" icon="retweet"></b-icon>
                                </div>
                                <div class="button" @click="handleClick" v-if="destination"
                                     v-bind:class="{'is-success': updating}">
                                    <b-icon size="is-small" pack="fa" :icon="updating ? 'check' : 'pen'"></b-icon>
                                </div>
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
                            <create-post v-if="currentUser && typeof $route.params.activity === 'undefined'"
                                         style="margin-bottom: 2rem;" @done="handleDone"/>
                            <NuxtChild :activityRes="activityRes" :destination="destination"
                                       :subtitle="subtitle" :q="queries"></NuxtChild>
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
            let destination = null, activityRes = null
            let queries = {
                page_size: 10,
                page: query.page ? Number.parseInt(query.page) : 1
            }
            if (params.destination && !['world', 'anywhere'].includes(params.destination)) {
                destination = await $api.destination.get(params.destination)
                queries.destination = destination.id
            }
            if (params.destination !== 'world') {
                activityRes = await $api.activity.list(queries)
            }
            return {
                destination,
                activityRes,
                queries
            }
        },
        data() {
            return {
                updating: false
            }
        },
        methods: {
            async fetch() {
                this.activityRes = await this.$api.activity.list(this.queries)
            },
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
                    let res = await this.$api.destination.update(this.destination.slug, data)
                }
                this.updating = false
            },
            handleDone(e) {
                this.fetch()
            }
        },
        computed: {
            title() {
                if (this.$auth.loggedIn) {
                    return `Welcome, ${this.convertName(this.$auth.user)}`
                } else {
                    return '9Destination'
                }
            },
            tag_line() {
                if (this.$auth.loggedIn) {
                    return "Get inspired and share your moment!"
                }
                return "Get inspired and share your best moment!"
            },
            subtitle() {
                switch (this.$route.params.flag) {
                    case 'stay':
                        return `Where to stay`
                    case 'attraction':
                        return `Where to visit`
                    case 'food':
                        return `What to eat`
                    default:
                        return null
                }
            }
        },
        mounted() {
            this.toTop()
        }
    }
</script>
