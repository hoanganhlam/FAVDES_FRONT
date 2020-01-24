<template>
    <div class="button" v-bind:class="{'is-success': isFollowing, 'is-loading': loading}" @click="toggleFollow">
        <b-icon icon="rss" size="is-small"></b-icon>
    </div>
</template>

<script>
    export default {
        name: "Follow",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            pk: {
                type: Number,
                default: 0
            },
            model: {
                type: String,
                default: 'user'
            }
        },
        data() {
            return {
                isFollowing: this.value,
                loading: false,
                content_type: this.getType(this.model)
            }
        },
        methods: {
            async toggleFollow() {
                this.loading = true
                this.isFollowing = await this.$api.follow.post({
                    content_type_id: this.content_type,
                    object_id: this.pk
                })
                this.loading = false
            }
        }
    }
</script>

<style scoped>

</style>
