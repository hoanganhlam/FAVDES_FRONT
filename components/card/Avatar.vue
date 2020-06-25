<template>
    <div class="image avatar relative"
         v-bind:class="{'initials': !isUpdating && !(data && data.sizes)}"
         v-bind:style="style">
        <Upload v-if="isUpdating" class="upload" @done="handleUpload"></Upload>
        <img class="is-round" v-else-if="data && data.sizes"
             :src="cleanURI(data.sizes['thumb_270_270'] ? data.sizes['thumb_270_270'] : data.sizes['270_270'])" alt="">
        <span class="name" v-else-if="name">{{avatarName(name, 2)}}</span>
        <b-icon v-else :icon="icon"></b-icon>
        <div v-if="canUpdate" class="medal" @click="isUpdating = !isUpdating">
            <b-icon size="is-small" :icon="isUpdating ? 'close' : 'upload'"></b-icon>
        </div>
        <div v-if="canUpdate && data" class="delete" @click="data = null"></div>
    </div>
</template>

<script>
    export default {
        name: "Avatar",
        props: {
            canUpdate: {type: Boolean, default: false},
            value: {
                default: null,
                type: Object
            },
            name: {
                default: null
            },
            icon: {
                default: 'account-circle-outline',
                type: String
            }
        },
        data() {
            return {
                data: this.value,
                isUpdating: false,
                blank: [
                    'background-image: linear-gradient(225deg, rgb(143, 148, 251) 0%, rgb(78, 84, 200) 100%)',
                    'background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
                    'background-image: linear-gradient(45deg, #a18cd1 0%, #fbc2eb 100%)',
                    'background-image: linear-gradient(45deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
                    'background-image: linear-gradient(45deg, #fbc2eb 0%, #a6c1ee 100%)',
                    'background-image: linear-gradient(45deg, #5ee7df 0%, #b490ca 100%)',
                    'background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898; \n' +
                    ' background-blend-mode: multiply,multiply',
                    'background-image: linear-gradient(45deg, #0ba360 0%, #3cba92 100%)',
                    'background-image: linear-gradient(45deg, #d9afd9 0%, #97d9e1 100%)',
                    'background-image: linear-gradient(45deg, #BDBBBE 0%, #9D9EA3 100%), radial-gradient(88% 271%, rgba(255, 255, 255, 0.25) 0%, rgba(254, 254, 254, 0.25) 1%, rgba(0, 0, 0, 0.25) 100%), radial-gradient(50% 100%, rgba(255, 255, 255, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%);\n' +
                    ' background-blend-mode: normal, lighten, soft-light'
                ]
            }
        },
        methods: {
            handleUpload(files) {
                if (files.length) {
                    this.data = files[0];
                    this.isUpdating = false;
                }
            }
        },
        computed: {
            style() {
                if (!this.isUpdating && !(this.data && this.data.sizes)) {
                    return this.blank[Math.floor(Math.random() * 9)]
                } else {
                    return {}
                }
            }
        },
        watch: {
            data() {
                this.$emit('input', this.data)
            },
            value() {
                this.data = this.value
            }
        }
    }
</script>

<style lang="scss">
    .avatar {
        position: relative;

        &.initials {
            position: relative;
            border-radius: 3px;

            .name {
                position: absolute;
                bottom: .25rem;
                left: .25rem;
                color: white;
                font-size: .75rem;
            }
        }

        .medal,
        .delete {
            z-index: 1;
            position: absolute;
            right: .5rem;
        }

        .delete {
            bottom: .5rem;
        }

        .medal {
            top: .5rem;
            cursor: pointer;
        }
    }
</style>
