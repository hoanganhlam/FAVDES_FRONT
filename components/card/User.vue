<template>
    <div class="user-card media">
        <div class="media-left">
            <n-link :to="`/profile/${value.username}`">
                <Avatar class="is-24x24" :value="value.profile ? value.profile.media : null" :name="convertName(value)"/>
            </n-link>
        </div>
        <div v-if="showName" class="media-content">
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
            value: {},
            showName: {
                default: true,
                type: Boolean
            }
        }
    }
</script>

<style lang="scss">
    .user-card {
        .media-left {
            margin-right: .5rem;

            &:last-child {
                margin-right: 0;
            }
        }
    }
</style>
