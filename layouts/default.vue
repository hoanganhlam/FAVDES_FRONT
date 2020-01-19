<template>
    <div>
        <header class="header">
            <div class="container medium">
                <b-navbar>
                    <template slot="start">
                        <b-navbar-item>
                            <b-dropdown position="is-bottom-left" aria-role="menu" trap-focus>
                                <b-field slot="trigger">
                                    <b-input v-if="openSearch" placeholder="Search..." type="search" expanded
                                             v-model="search"></b-input>
                                    <p class="control">
                                        <b-button class="button is-success" @click="openSearch = !openSearch">
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
        <div class="bar">
            <div class="part-1">
                <div class="image">
                    <n-link to="/"><img src="/logo.png" alt="9Destination"></n-link>
                </div>
            </div>
            <div class="part-2">
                <div class="elm">
                    <n-link to="/" class="button is-text" v-bind:class="{'is-primary': isPrimary('destination')}">
                        <b-icon icon="rss"></b-icon>
                    </n-link>
                </div>
                <div class="elm">
                    <n-link to="/world" class="button is-text" v-bind:class="{'is-primary': isPrimary('world')}">
                        <b-icon icon="earth"></b-icon>
                    </n-link>
                </div>
                <div class="elm">
                    <n-link to="/rank" class="button is-text" v-bind:class="{'is-primary': isPrimary('rank')}">
                        <b-icon icon="poll"></b-icon>
                    </n-link>
                </div>
            </div>
            <div class="part-3">
                <div class="button is-text">
                    <b-icon icon="settings-outline"></b-icon>
                </div>
            </div>
        </div>
        <footer class="footer">
            <div class="content has-text-centered">
                <p><strong>Made</strong> with ❤️</p>
            </div>
        </footer>
        <b-modal :active.sync="isActive" has-modal-card full-screen :can-cancel="false">
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
    export default {
        data() {
            return {
                isActive: false,
                login: true,
                search: '',
                openSearch: false
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
        }
    }
</script>
