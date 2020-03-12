<template>
    <div>
        <header class="header">
            <div class="container medium">
                <b-navbar>
                    <template slot="start">
                        <b-navbar-item tag="div">
                            <n-link to="/">
                                <img src="/logo.png" alt="">
                            </n-link>
                        </b-navbar-item>
                        <b-navbar-item tag="div">
                            <b-dropdown position="is-bottom-left" aria-role="menu" trap-focus>
                                <b-field slot="trigger">
                                    <b-input placeholder="Search..." type="search" expanded
                                             v-model="search"></b-input>
                                    <p class="control">
                                        <b-button class="button is-success">
                                            <b-icon icon="magnify" size="is-small"></b-icon>
                                        </b-button>
                                    </p>
                                </b-field>
                                <b-dropdown-item
                                    aria-role="menu-item"
                                    :focusable="false"
                                    custom>
                                </b-dropdown-item>
                            </b-dropdown>
                        </b-navbar-item>
                        <b-navbar-item tag="div">
                            <n-link to="/rank"><b-icon icon="chart-line-variant" size="is-small"></b-icon><span>Rank</span></n-link>
                        </b-navbar-item>
                    </template>
                    <template slot="end">
                        <b-navbar-item tag="div">
                            <n-link class="button" to="/planner">Planner</n-link>
                        </b-navbar-item>
                        <b-navbar-item tag="div">
                            <div class="buttons" v-if="!Boolean(currentUser)">
                                <button class="button is-primary" @click="handleClick(false)">
                                    <strong>Sign up</strong>
                                </button>
                                <button class="button is-light" @click="handleClick(true)">
                                    Log in
                                </button>
                            </div>
                            <div class="buttons" v-else>
                                <button class="button is-text">
                                    <user-card :value="currentUser"></user-card>
                                </button>
                            </div>
                        </b-navbar-item>
                    </template>
                </b-navbar>
            </div>
        </header>
        <main class="main-content">
            <nuxt/>
        </main>
        <footer class="footer">
            <div class="content has-text-centered">
                <p><strong>Made</strong> with ❤️</p>
            </div>
        </footer>
        <b-modal :active.sync="isActive" full-screen :can-cancel="false">
            <section class="hero is-fullheight">
                <div class="hero-body">
                    <div class="container small" style="width: 400px; max-width: 400px">
                        <Login @close="isActive = !isActive"></Login>
                    </div>
                </div>
            </section>
        </b-modal>
        <media-viewer></media-viewer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: false,
                login: true,
                search: '',
                openSearch: false,
                showBar: false
            }
        },
        methods: {
            handleClick(flag) {
                this.isActive = true;
                this.login = flag
            },
            isPrimary(flag) {
                if (flag === 'destination') {
                    return this.$route.params.destination || this.$route.params.flag || this.$route.params.activity || this.$route.path === '/'
                }
                return this.$route.path.includes(flag)
            }
        },
        watch: {
            $route() {
                this.toTop()
                this.$store.dispatch('media/setData', {
                    medias: [],
                    index: 0,
                    user: null
                })
            }
        }
    }
</script>

<style lang="scss">

</style>
