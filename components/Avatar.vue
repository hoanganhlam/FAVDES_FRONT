<template>
    <div class="image avatar" v-bind:class="{'initials': name && !data }">
        <Upload v-if="isUpdating" class="upload" @done="handleUpload"></Upload>
        <img class="is-round" v-else-if="data" :src="cleanURI(data.sizes['270_270'])" alt="">
        <span v-else-if="name">{{avatarName(name)}}</span>
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
            },
            name: {
                default: null
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
            },
            avatarName(name) {
                let matches = name.match(/\b(\w)/g);
                return matches.join('')
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

        &.initials {
            text-align: center;
            border: 1px solid #4a4a4a;
            color: #4a4a4a;
            text-transform: uppercase;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            &.is-64x64 {
                font-size: 32px;
            }

            &.is-96x96 {
                font-size: 48px;
            }

            &.is-1by1 {
                span {
                    position: absolute;
                    top: calc(50% - .75rem);
                }
            }
        }

        &.is-64x64 {
            .icon {
                width: 64px;
                height: 64px;

                .mdi-36px.mdi:before {
                    font-size: 64px;
                }
            }
        }

        &.is-96x96 {
            .icon {
                width: 96px;
                height: 96px;

                .mdi-36px.mdi:before {
                    font-size: 96px;
                }
            }
        }
    }
</style>
