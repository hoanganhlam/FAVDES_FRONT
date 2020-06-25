<template>
    <div>
        <header class="header">
            <div class="container">
                <b-navbar>
                    <template slot="brand">
                        <b-navbar-item class="has-logo" tag="div">
                            <n-link class="logo" to="/"><img src="/logo.png" alt="9Destination"></n-link>
                        </b-navbar-item>
                    </template>
                    <template slot="start">
                        <b-navbar-item tag="div">
                            <target-selector/>
                        </b-navbar-item>
                    </template>
                    <template slot="end">
                        <b-navbar-item tag="div">
                            <div class="buttons" v-if="!Boolean(currentUser)">
                                <button class="button is-primary" @click="handleClick(false)">
                                    <strong>Sign up</strong>
                                </button>
                                <button class="button is-light" @click="handleClick(true)">
                                    Log in
                                </button>
                            </div>
                            <user-card v-else :value="currentUser"></user-card>
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
    </div>
</template>

<script>
    import TargetSelector from "../components/TargetSelector";

    export default {
        components: {TargetSelector},
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
            }
        },
        watch: {
            $route() {
                this.toTop();
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
    .header {
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        padding-top: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #EEEEEE;

        .navbar {
            background-color: unset;
        }
    }

    .has-logo {
        padding: 0 .75rem;

        img {
            max-height: 1.5rem;
        }
    }
</style>
