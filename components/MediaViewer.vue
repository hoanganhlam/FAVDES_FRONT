<template>
    <b-modal :active.sync="activeViewer" full-screen scroll="keep">
        <section class="hero has-background-white is-fullheight is-small pop-gallery" v-if="media">
            <div class="hero-head">
                <nav class="navbar">
                    <div class="container">
                        <div class="navbar-menu">
                            <div class="navbar-start">
                                <div class="navbar-item">
                                    <div class="buttons">
                                        <div class="button" @click="handleClose">
                                            <b-icon size="is-small" icon="chevron-left"></b-icon>
                                        </div>
                                        <div class="button is-text" v-if="user">
                                            <user-card :value="user"></user-card>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="navbar-end">
                                <div class="navbar-item">
                                    <div class="buttons">
                                        <button class="button">
                                            <b-icon size="is-small" icon="heart"></b-icon>
                                            <span>Vote</span>
                                        </button>
                                        <div class="button">
                                            <b-icon icon="comment" size="is-small"></b-icon>
                                        </div>
                                        <div class="button" @click="handleUpdate" v-if="isAuth">
                                            <b-icon icon="pen" size="is-small"></b-icon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="hero-body">
                <div class="container">
                    <div class="main-image">
                        <img :src="cleanURI(media.sizes.resize)" :alt="media.title">
                    </div>
                </div>
            </div>
            <div class="hero-foot">
                <div class="container">
                    <div class="level">
                        <div class="level-left">
                            <div>
                                <h1 class="title is-5">
                                    <editable icon="text" :rows="2" type="textarea" :is-updating="updating"
                                              v-model="media.title"/>
                                </h1>
                                <p class="subtitle">
                                    <editable icon="text" :rows="2" type="textarea" :is-updating="updating"
                                              v-model="media.description"/>
                                </p>
                            </div>
                        </div>
                        <div class="level-right">
                            <multiple-select v-if="updating" v-model="media.taxonomies" placeholder="#hashtag"
                                             module="media_taxonomy"/>
                            <b-taglist v-else>
                                <b-tag v-for="tag in media.taxonomies" :key="tag.id">{{tag.title}}</b-tag>
                            </b-taglist>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section v-else class="hero has-background-white is-fullheight is-small pop-gallery">
            <div class="hero-body">
                <div class="container small">
                    <div class="skeleton"></div>
                </div>
            </div>
        </section>
        <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="true"></b-loading>
    </b-modal>
</template>

<script>
    export default {
        name: "MediaViewer",
        data() {
            return {
                activeViewer: false,
                index: 0,
                media: null,
                updating: false,
                loading: false
            }
        },
        computed: {
            medias() {
                return this.$store.state.media.medias
            },
            current() {
                return this.$store.state.media.index
            },
            user() {
                return this.$store.state.media.user
            },
            isAuth() {
                return (this.user && this.currentUser) && (this.currentUser.id === this.user.id || this.currentUser.is_staff)
            }
        },
        watch: {
            medias() {
                if (this.medias.length) {
                    this.activeViewer = true
                    this.media = null
                    this.fetchMedia(this.medias[this.current].id)
                }
            },
            current() {
                if (this.medias.length) {
                    this.media = null
                    this.activeViewer = true
                    this.fetchMedia(this.medias[this.current].id)
                }
            }
        },
        methods: {
            async fetchMedia(id) {
                this.updating = true
                this.media = await this.$api.media.get(id)
                this.updating = false
            },
            async handleClose() {
                await this.$store.dispatch('media/setData', {
                    medias: [],
                    index: -1,
                    user: null
                })
                this.activeViewer = false
            },
            handleUpdate() {
                if (!this.updating) {
                    this.updating = true
                    return
                }
                let data = Object.assign({}, this.cleanData(this.media))
                data.path = undefined
                this.loading = true
                this.$api.media.update(this.media.id, data).then(res => {
                    this.media = res
                    this.loading = false
                    this.updating = false
                })
            }
        }
    }
</script>

<style scoped>

</style>
