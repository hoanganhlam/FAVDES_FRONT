<template>
    <b-modal :active.sync="activeViewer" full-screen scroll="keep">
        <section class="hero has-background-white is-fullheight is-small pop-gallery" v-if="media">
            <div class="hero-head">
                <nav class="navbar">
                    <div class="container">
                        <div class="navbar-menu">
                            <div class="navbar-brand"></div>
                            <div class="navbar-start">
                                <div class="navbar-item">
                                    <div class="buttons">
                                        <div class="button" @click="handleClose">
                                            <b-icon size="is-small" icon="chevron-left"></b-icon>
                                        </div>
                                        <div class="button is-text" v-if="media.user">
                                            <user-card :value="media.user"></user-card>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="navbar-end">
                                <div class="navbar-item">
                                    <div class="buttons">
                                        <button class="button" v-bind:class="{'is-success': isVoted, 'is-loading': loadingVote}" @click="vote()">
                                            <b-icon size="is-small" icon="heart"></b-icon>
                                            <span>Vote</span>
                                        </button>
                                        <div class="button" v-bind:class="{'is-primary': showComment}"
                                             @click="showComment = !showComment">
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
                    <div class="columns" v-bind:class="{'has-comment': showComment}">
                        <div class="column">
                            <div class="main-image">
                                <img :src="cleanURI(path)" :alt="media.title">
                            </div>
                        </div>
                        <div class="column is-5" v-if="showComment">
                            <div class="card comment-box">
                                <comment avatar-size="is-32x32" class="card-content" model="media"
                                         module="media_comment" :object-id="media.id"></comment>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ctl next" @click="ctl('next')" v-if="current < medias.length - 1">
                <b-icon icon="chevron-right" size="is-large"></b-icon>
            </div>
            <div class="ctl previous" @click="ctl('previous')" v-if="current > 0">
                <b-icon icon="chevron-left" size="is-large"></b-icon>
            </div>
            <div class="hero-foot">
                <div class="container">
                    <div class="columns">
                        <div class="column">
                            <div>
                                <p><editable icon="text" :rows="2" type="textarea" :is-updating="updating" v-model="media.title"/></p>
                                <p class="subtitle">
                                    <editable icon="text" :rows="2" type="textarea" :is-updating="updating"
                                              v-model="media.description"/>
                                </p>
                            </div>
                        </div>
                        <div class="column">
                            <multiple-select v-if="updating" v-model="media.taxonomies" placeholder="#hashtag"
                                             module="media_taxonomy"/>
                            <b-taglist style="justify-content: flex-end;" v-else>
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
                loading: false,
                loadingVote: false,
                showComment: false,
                isVoted: false
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
            },
            path() {
                if (this.showComment) {
                    return this.media.sizes['540_540']
                }
                return this.media.path
            }
        },
        watch: {
            medias() {
                if (this.medias.length) {
                    this.activeViewer = true
                    this.media = null
                    this.fetchMedia(this.medias[this.current].id)
                } else {
                    this.activeViewer = false
                }
            },
            current() {
                if (this.medias.length) {
                    this.media = null
                    this.activeViewer = true
                    this.fetchMedia(this.medias[this.current].id)
                } else {
                    this.activeViewer = false
                }
            }
        },
        methods: {
            async fetchMedia(id) {
                this.showComment = false
                this.updating = true
                this.media = await this.$api.media.get(id)
                this.checkVoted()
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
            },
            ctl(action) {
                let page = this.current
                if (action === 'next') {
                    if (page < this.medias.length - 1) {
                        page++
                    }
                } else {
                    if (page > 0) {
                        page--
                    }
                }
                this.$store.dispatch('media/setIndex', page)
            },
            checkVoted() {
                if (this.currentUser && this.media) {
                    this.loadingVote = true
                    this.$axios.get(`/media/medias/${this.media.id}/is-voted/`).then(res => {
                        this.isVoted = res.data
                        this.loadingVote = false
                    })
                }
            },
            vote() {
                if (this.currentUser && this.media) {
                    this.loadingVote = true
                    this.$axios.post(`/media/medias/${this.media.id}/vote/`).then(res => {
                        this.isVoted = res.data
                        this.loadingVote = false
                    })
                }
            }
        },
        created() {

        }
    }
</script>

<style lang="scss">
    .pop-gallery {
        .main-image {
            text-align: center;
            position: relative;

            img {
                max-height: 75vh;
            }
        }

        .hero-head {
            .navbar {
                border-bottom: 1px solid #EEE;
            }
        }

        .hero-foot {
            padding-bottom: 1rem;
        }

        .navbar-menu {
            display: flex;

            .navbar-end {
                -webkit-box-pack: end;
                justify-content: flex-end;
                margin-left: auto;
            }
        }

        .ctl {
            position: fixed;
            top: calc(50% - 1rem);
            cursor: pointer;
            z-index: 1;
            background: #FFF;
            border-radius: 3px;
        }

        .next {
            right: 0;
        }

        .previous {
            left: 0;
        }

        .has-comment {
            .comment-box {
                height: 65vh;
            }

            .main-image {
                img {
                    height: 65vh;
                    width: 100%;
                    object-fit: cover;
                }
            }
        }
    }
</style>
