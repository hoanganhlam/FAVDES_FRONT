<template>
    <div class="profile">
        <div class="hero">
            <div class="hero-body">
                <div class="container small">
                    <div class="media">
                        <div class="media-left">
                            <Avatar class="is-128x128" :can-update="updating" v-model="profile.media" :name="convertName(user)"/>
                        </div>
                        <div class="media-content">
                            <h1 class="title" v-if="!updating">{{convertName(user)}}</h1>
                            <b-field v-else class="title" grouped>
                                <b-field expanded>
                                    <b-input class="is-text" placeholder="First name"
                                             v-model="user.first_name"></b-input>
                                </b-field>
                                <b-field expanded>
                                    <b-input class="is-text" placeholder="Last name"
                                             v-model="user.last_name"></b-input>
                                </b-field>
                            </b-field>
                        </div>
                        <div v-if="!updating" class="media-right">
                            <div class="buttons">
                                <follow model="user" :pk="user.id" :value="user.is_following"></follow>
                                <b-dropdown position="is-bottom-left" aria-role="menu">
                                    <div class="button" slot="trigger">
                                        <b-icon icon="dots-vertical" size="is-small"></b-icon>
                                    </div>
                                    <b-dropdown-item aria-role="listitem" @click="isUpdate = !isUpdate">
                                        <b-icon size="is-small" icon="pen"></b-icon>
                                        <span>Update Profile</span>
                                    </b-dropdown-item>
                                    <b-dropdown-item aria-role="listitem" @click="$auth.logout()">
                                        <b-icon size="is-small" icon="exit-to-app"></b-icon>
                                        <span>Logout</span>
                                    </b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </div>
                    </div>
                    <div class="subtitle">
                        <editable placeholder="Bio" type="textarea" :rows="2" v-model="profile.description"
                                  :is-updating="updating"/>
                    </div>
                    <div v-if="updating">
                        <div class="button is-primary is-medium" @click="updateProfile">Save</div>
                    </div>
                    <b-loading :is-full-page="false" :active.sync="loading" :can-cancel="true"></b-loading>
                </div>
            </div>
        </div>
        <div class="section has-background-light">
            <div class="container">
                <div class="columns is-multiline">
                    <div class="column is-4" v-for="(d, i) in responseD.results" :key="i">
                        <destination :value="d"/>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!updating" class="hero">
            <div class="hero-body">
                <div class="container">
                    <activity-list :value="activityRes" :q="queries"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Destination from "../../components/card/Destination";

    export default {
        name: "ProfileDetail",
        components: {Destination},
        watchQuery: ['page'],
        async asyncData({$api, params, store, query}) {
            let user = null;
            let queries = {
                page_size: 9,
                page: Number.parseInt(query.page) || 1
            };
            if (params.username) {
                user = await $api.user.get(params.username);
                queries['target_content'] = store.state.config.contentTypes['user'];
                queries['target'] = user.id;
            }
            let activityRes = await $api.activity.list(queries);
            return {
                user,
                activityRes: activityRes,
                profile: user && user.profile ? user.profile : {},
                queries,
                responseD: await $api.destination.list({page_size: 3, user: user ? user.id : undefined}),
            }
        },
        head() {
            return {
                title: this.convertName(this.user)
            }
        },
        data() {
            return {
                isUpdate: false,
                loading: false,
                activeTab: 0,
                baseTabs: [
                    {
                        label: 'Pictures',
                        content: 'Lorem ipsum dolor sit amet.',
                        displayed: true,
                    },
                    {
                        label: 'Music',
                        content: 'Lorem ipsum dolor sit amet.',
                        displayed: this.showMusic,
                    },
                    {
                        label: 'Videos',
                        content: 'Lorem ipsum dolor sit amet.',
                        displayed: true,
                    }
                ]
            }
        },
        methods: {
            async updateProfile() {
                this.loading = true;
                let data = this.cleanData(this.user);
                data.profile = {
                    media: this.profile.media ? this.profile.media.id : null,
                    description: this.profile.description
                };
                await this.$api.user.update(this.user.username, data);
                this.loading = false;
                this.isUpdate = false;
            }
        },
        computed: {
            updating() {
                return this.$route.query.updating || this.isUpdate;
            }
        },
        mounted() {
            this.toTop();
            this.$nextTick(() => {
                this.reLayout();
            })
        },
        updated() {
            if (process.client) {
                this.reLayout();
            }
        }
    }
</script>

<style lang="scss">
    .profile {
        display: flex;
        flex-direction: column;
        min-height: calc(100vh - 53px);

        .media:not(:last-child) {
            margin-bottom: 1rem;

            .media-content {
                overflow: unset;
            }
        }

        .hero:last-child {
            flex: 1;
        }
    }
</style>
