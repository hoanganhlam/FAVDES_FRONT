<template>
    <div class="card user-card large" v-if="value">
        <div class="card-content">
            <div class="widget_title">Meet hunter</div>
            <div class="media">
                <div class="media-left">
                    <avatar class="is-64x64" :name="convertName(value)" :value="value.profile.media"></avatar>
                </div>
                <div class="media-content">
                    <h4 class="title is-6" style="margin-bottom: 0">
                        <n-link :to="`/profile/${value.username}`">{{convertName(value)}}</n-link>
                    </h4>
                    <div class="field" style="margin-bottom: 0">@{{value.username}}</div>
                </div>
            </div>
            <div class="content" v-if="showBio" v-html="value.profile.description">
            </div>
            <div class="level is-mobile" v-if="showBio">
                <div class="level-left">
                    <div class="images">
                        <n-link  v-for="p in value.publications" :key="p.id" :to="`/publication/${p.id}`">
                            <avatar class="is-24x24" :name="p.name" :value="p.media"/>
                        </n-link>
                    </div>
                </div>
                <div class="level-right">
                    <follow class="is-small" model="user" :pk="value.id" :value="value.is_following">
                        <span>Follow</span>
                    </follow>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const SAMPLE = {
        id: 210,
        first_name: "",
        last_name: "",
        username: "anonymous",
        profile: {media: null, description: "Keep a compelling scoreboard. This means a visible tracking system to keep yourself honest about how much time you’re spending on your priority project.", nick: "Anonymous"},
        is_staff: false
    }

    export default {
        name: "User",
        props: {
            canFollow: {
                default: false,
                type: Boolean
            },
            value: {
                default: () => SAMPLE
            },
            username: {
                default: false,
                type: Boolean
            },
            avatarSize: {
                default: 'is-32x32',
                type: String
            },
            onlyAvatar: {
                default: false,
                type: Boolean
            },
            showBio: {
                default: false,
                type: Boolean
            }
        },
        methods: {
            click() {
                if (!this.canFollow) {
                    this.$router.replace({path: `/${this.value.username}`})
                }
            }
        }
    }
</script>
