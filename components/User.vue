<template>
    <div class="media">
        <div class="media-left">
            <Avatar v-if="value.profile && value.profile.media" class="is-24x24" :value="value.profile.media"></Avatar>
        </div>
        <div class="media-content">
            <b><n-link :to="`/profile/${value.username}`">{{convertName(value)}}</n-link></b>
        </div>
        <div v-if="allFollow" class="media-right">
            <div class="button is-small">
                <b-icon icon="rss" size="is-small"></b-icon>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "User",
        props: {
            allFollow: {
                default: false,
                type: Boolean
            },
            value: {

            }
        }
    }
</script>

<style scoped>

</style>
