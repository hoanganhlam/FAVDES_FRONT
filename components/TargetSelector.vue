<template>
    <div>
        <b-dropdown aria-role="list">
            <h1 class="button is-text" slot="trigger">
                <b-icon icon="chevron-right"></b-icon>
                <span>{{globalApp ? globalApp[field] : 'Select destination'}}</span>
            </h1>
            <b-dropdown-item custom aria-role="menuitem">
                <b-field>
                    <b-input expanded placeholder="Search"></b-input>
                </b-field>
            </b-dropdown-item>
            <b-dropdown-item v-for="app in response.results" :key="app.id" @click="selectApp(app)"
                             v-bind:class="{'is-active': globalApp && globalApp.id === app.id}"
                             aria-role="listitem">
                <div class="media">
                    <b-icon class="media-left" s icon="account-multiple"></b-icon>
                    <div class="media-content">
                        <h3>{{app[field]}}</h3>
                    </div>
                </div>
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
    export default {
        name: "TargetSelector",
        data() {
            return {
                app: null,
                response: {
                    results: [],
                    count: 0
                }
            }
        },
        methods: {
            async fetch() {
                this.response = await this.$api[this.targetModel].list({
                    page_size: 5
                });
            },
            selectApp(app) {
                if (app) {
                    if (this.globalApp && app.id === this.globalApp.id) {
                        this.$store.commit('config/SET_TARGET', null)
                    } else {
                        let to = `/${app.slug}`;
                        if (this.targetModel === 'address') {
                            to = `/add/${app.id}`;
                        } else if (this.targetModel === 'user') {
                            to = `/profile/${app.username}`;
                        }
                        if (to !== this.$route.path) {
                            this.$router.replace({path: to});
                        }
                    }
                }
            }
        },
        computed: {
            globalApp() {
                return this.$store.state.config.currentTarget;
            },
            targetModel() {
                return this.$store.state.config.targetModel || 'destination';
            },
            field() {
                if (this.targetModel === 'address') {
                    return 'formatted_address'
                } else {
                    return 'title'
                }
            }
        },
        watch: {
            targetModel() {
                this.fetch();
            }
        },
        created() {
            this.fetch();
        }
    }
</script>

<style lang="scss">
</style>
