<template>
    <div class="image">
        <Upload v-if="isUpdating" class="upload" @done="handleUpload"></Upload>
        <img class="is-round" v-else-if="data" :src="cleanURI(data.sizes['270_270'])" alt="">
        <img class="is-round" v-else src="/avatar.png" alt="">
    </div>
</template>

<script>
    export default {
        name: "Avatar",
        props: {
            isUpdating: {
                default: false,
                type: Boolean
            },
            value: {
                default: null,
                type: Object
            }
        },
        data() {
            return {
                data: this.value
            }
        },
        methods: {
            handleUpload(files) {
                if (files.length) {
                    this.$emit('input', files[0])
                }
            }
        }
    }
</script>

<style lang="scss">
    .image {
        .upload {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
</style>
