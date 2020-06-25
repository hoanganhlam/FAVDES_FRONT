<template>
    <div class="destination-page">
        <section class="hero">
            <div class="hero-body">
                <div class="container">
                    <div v-if="typeof $route.params.flag === 'undefined'" class="columns">
                        <div class="column">
                            <div class="content">
                                <p class="subtitle">
                                    <editable icon="text" type="textarea" :is-updating="updating" v-if="destination"
                                              v-model="destination.description"/>
                                    <span v-else>{{tag_line}}</span>
                                </p>
                            </div>
                            <div v-if="updating && destination && destination.photos" class="columns is-mobile">
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
                    <activity-list :q="q" :value="response"/>
                </div>
            </div>
        </section>
        <div class="section has-background-light">
            <div class="container">
                <div class="columns is-multiline">
                    <div class="column is-4" v-for="(d, i) in responseD.results" :key="i">
                        <destination :value="d"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Destination from "../../components/card/Destination";

    export default {
        name: 'HomePage',
        components: {Destination},
        async asyncData({$api, params, query, store}) {
            let destination = null;
            let q = {
                page: Number.parseInt(query.page) || 1,
                page_size: 9
            };
            if (params.flag) {
                q.hashtag = params.flag
            }
            if (params.destination && !['hashtag', 'anywhere'].includes(params.destination)) {
                destination = await $api.destination.get(params.destination);
                q.destination = destination.id
            }
            let response = await $api.activity.list(q);
            store.commit('config/SET_TARGET', {...destination});
            store.commit('config/SET_TARGET_MODEL', 'destination');
            return {
                destination,
                response,
                q,
                responseD: await $api.destination.list({page_size: 3})
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
                    return `${this.destination.title} Checkin | ${this.destination.title} Photos`
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
