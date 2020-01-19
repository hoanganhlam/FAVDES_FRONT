<template>
    <div>
        <header class="header is-primary">
            <div class="container medium">
                <b-navbar class="is-primary">
                    <template slot="brand">
                        <b-navbar-item tag="router-link" :to="{ path: '/' }">
                            <img src="/logo.png" alt="">
                        </b-navbar-item>
                    </template>
                    <template slot="start">
                        <b-navbar-item>
                            <b-dropdown position="is-bottom-left" aria-role="menu" trap-focus>
                                <b-field slot="trigger">
                                    <b-input placeholder="Search..." type="search" expanded v-model="search"></b-input>
                                    <p class="control">
                                        <b-button class="button">
                                            <b-icon pack="fa" icon="search" size="is-small"></b-icon>
                                        </b-button>
                                    </p>
                                </b-field>
                                <b-dropdown-item
                                    aria-role="menu-item"
                                    :focusable="false"
                                    custom>
                                    <Search v-model="search"></Search>
                                </b-dropdown-item>
                            </b-dropdown>
                        </b-navbar-item>
                        <b-navbar-dropdown>
                            <div slot="label">
                                <b-icon pack="fa" icon="ellipsis-h" size="is-small"></b-icon>
                            </div>
                            <b-navbar-item tag="router-link" to="/topic">Topics</b-navbar-item>
                            <b-navbar-item tag="router-link" to="/stack">Stacks</b-navbar-item>
                            <b-navbar-item tag="router-link" to="/compare">Comparisons</b-navbar-item>
                        </b-navbar-dropdown>
                    </template>
                    <template slot="end">
                        <b-navbar-item tag="div">
                            <div class="buttons" v-if="!$auth.loggedIn">
                                <button class="button is-primary" @click="handleClick(false)">
                                    <strong>Sign up</strong>
                                </button>
                                <button class="button is-light" @click="handleClick(true)">
                                    Log in
                                </button>
                            </div>
                            <div class="buttons" v-else>
                                <button class="button is-primary">
                                    <UserCard :value="$auth.user"></UserCard>
                                </button>
                                <button class="button is-primary" @click="$auth.logout()">
                                    <b-icon size="is-small" pack="fa" icon="sign-out-alt"></b-icon>
                                </button>
                            </div>
                        </b-navbar-item>
                    </template>
                </b-navbar>
            </div>
        </header>
        <main class="main-content">
            <div class="container medium">
                <div class="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd">
                    <div class="column is-8">
                        <nuxt/>
                    </div>
                    <div class="column">
                        <div class="section" v-if="!$auth.loggedIn">
                            <div class="card">
                                <div class="card-content">
                                    <div class="columns is-multiline is-mobile is-gapless">
                                        <div class="column is-12">
                                            <div class="button is-fullwidth is-danger" @click="handleClick(true)">
                                                Become an adjudicator!
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="$route.path !=='/'" class="section">
                            <Activity :activity="$store.state.activities.activity"/>
                        </div>
                        <div v-else class="section">
                            <Topic v-for="item in $store.state.menu.taxonomies" :key="item._id" :item="item"></Topic>
                            <div class="card">
                                <div class="card-content v-center" style="min-height: 150px">
                                    <div class="button is-rounded" style="margin: 0 auto;">
                                        <b-icon pack="fa" icon="plus" size="is-small"></b-icon>
                                        <span>Follow a topic</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer class="footer">
            <div class="content has-text-centered">
                <p><strong>Made</strong> with ❤️</p>
            </div>
        </footer>
        <b-modal :active.sync="isActive" has-modal-card full-screen :can-cancel="false">
            <section class="hero is-fullheight">
                <div class="hero-body">
                    <div class="container small" style="max-width: 400px">
                        <Access :login="login" @done="isActive = false"></Access>
                    </div>
                </div>
            </section>
        </b-modal>
    </div>
</template>

<script>
    import io from 'socket.io-client'

    export default {
        data() {
            return {
                isActive: false,
                login: true,
                socket: io(process.env.socketHost ? process.env.socketHost : `http://127.0.0.1:3001`),
                search: ''
            }
        },
        methods: {
            handleClick(flag) {
                this.isActive = true;
                this.login = flag
            }
        },
        async created() {
        },
        mounted() {
            this.socket.on('notify', (data) => {
                let msg = `${data.actor ? data.actor.username : ''} ${this.getVerb(data.verb)} `
                if (data.actionModel && this.getSlug(data.actionModel)) {
                    msg = msg + ` ${data.action.title ? data.action.title : this.getAction(data.actionModel)}`
                } else if (data.actionModel) {
                    msg = msg + this.getAction(data.actionModel)
                }
                if (data.targetModel) {
                    msg = msg + ` > ${data.target.title}`
                }
                this.$buefy.snackbar.open(msg)
            })
            this.socket.on('error', (data) => {
                console.log(data);
            })
        },
    }
</script>
