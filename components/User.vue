<template>
    <div class="media">
        <div class="media-left">
            <Avatar class="is-24x24" :value="value.profile ? value.profile.media : null"></Avatar>
        </div>
        <div class="media-content">
            <b>
                <n-link :to="`/profile/${value.username}`">{{convertName(value)}}</n-link>
            </b>
        </div>
        <div v-if="allFollow" class="media-right">
            <follow class="is-small" model="user" :pk="value.id" :value="value.is_following"></follow>
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
            value: {}
        }
    }
</script>

<style scoped>

</style>
