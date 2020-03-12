<template>
    <div class="media-field">
        <b-carousel :autoplay="false" :indicator="false" :arrow="display_list.length > 1">
            <b-carousel-item v-for="(item, i) in display_list" :key="i">
                <span :class="`image ${imageClass}`">
                  <img :src="getIMG(item, imageSize)">
                </span>
            </b-carousel-item>
            <b-carousel-item v-if="display_list.length === 0">
                <span class="image empty">
                    <b-icon icon="image"></b-icon>
                </span>
            </b-carousel-item>
        </b-carousel>
        <b-upload v-model="dropFiles" :multiple="multiple" @input="handleInput">
            <a class="button is-primary is-small">
                <b-icon icon="upload" size="is-small"></b-icon>
            </a>
        </b-upload>
    </div>
</template>

<script>
    export default {
        props: {
            value: {},
            text: {},
            multiple: {
                type: Boolean,
                default: true
            },
            imageSize: {
                type: String,
                default: null
            },
            imageClass: {
                type: String,
                default: 'is-3by1'
            }
        },
        data() {
            let data = this.value
            if (!Boolean(data)) {
                if (this.multiple) {
                    data = []
                } else {
                    data = null
                }
            }
            return {
                dropFiles: [],
                isLoading: false,
                data
            }
        },
        name: 'upload',
        methods: {
            async handleInput(data) {
                this.isLoading = true
                if (this.multiple) {
                    let results = []
                    for (let i = 0; i < data.length; i++) {
                        let res = await this.beforeUpload(data[i])
                        results.push(res)
                    }
                    this.data = this.data.concat(results)
                } else {
                    this.data = await this.beforeUpload(data)
                }
                this.$emit('input', this.data)
                this.isLoading = false
                this.dropFiles = []
            },
            async beforeUpload(file) {
                let formData = new FormData()
                formData.append('path', file)
                formData.append('title', file.name)
                return await this.$api.media.post(formData)
            }
        },
        computed: {
            display_list() {
                if (this.data) {
                    if (Array.isArray(this.data)) {
                        return this.data
                    } else {
                        return [this.data]
                    }
                }
                return []
            }
        },
        watch: {
            value() {
                let data = this.value
                if (!Boolean(data)) {
                    if (this.multiple) {
                        data = []
                    } else {
                        data = null
                    }
                }
                this.data = data
            }
        }
    }
</script>
<style lang="scss">
    .media-field {
        position: relative;
        overflow: hidden;

        .upload {
            position: absolute;
            bottom: 2rem;
            right: 2rem;
            width: unset;
            height: unset;
        }

        .image.empty {
            text-align: center;
            padding: 2rem;
        }
    }
</style>
