<template>
    <div>
        <header class="header">
            <div class="container medium">
                <b-navbar>
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
                                </b-dropdown-item>
                            </b-dropdown>
                        </b-navbar-item>
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
                                <button class="button">
                                    {{$auth.user.username}}
                                </button>
                                <button class="button" @click="$auth.logout()">
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
                <nuxt/>
            </div>
        </main>
        <footer class="footer">
            <div class="content has-text-centered">
                <p><strong>Made</strong> with ❤️</p>
            </div>
        </footer>
        <b-modal :active.sync="isActive" has-modal-card full-screen :can-cancel="true">
            <section class="hero is-fullheight">
                <div class="hero-body">
                    <div class="container small" style="width: 350px; max-width: 350px">
                        <Login></Login>
                    </div>
                </div>
            </section>
        </b-modal>
    </div>
</template>

<script>
    // import io from 'socket.io-client'

    export default {
        data() {
            return {
                isActive: false,
                login: true,
                // socket: io(process.env.socketHost ? process.env.socketHost : `http://127.0.0.1:3001`),
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

        },
    }
</script>
