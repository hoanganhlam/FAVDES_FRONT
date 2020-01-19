<template>
    <section>
        <b-field>
            <b-upload v-model="dropFiles" :multiple="multiple" drag-drop @input="handleInput">
                <section class="section">
                    <div class="content has-text-centered">
                        <p>
                            <b-icon pack="fa" icon="upload" size="is-large"></b-icon>
                        </p>
                        <p v-if="text">{{text}}</p>
                    </div>
                </section>
                <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
            </b-upload>
        </b-field>
    </section>
</template>

<script>
    export default {
        props: {
            text: {},
            multiple: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                dropFiles: [],
                isLoading: false,
            }
        },
        name: 'upload',
        methods: {
            async handleInput(data) {
                let results = []
                this.isLoading = true
                if (this.multiple) {
                    for (let i = 0; i < data.length; i++) {
                        let res = await this.beforeUpload(data[i])
                        results.push(res)
                    }
                } else {
                    let res = await this.beforeUpload(data)
                    results.push(res)
                }
                this.$emit('done', results)
                this.isLoading = false
            },
            async beforeUpload(file) {
                let formData = new FormData()
                formData.append('path', file)
                formData.append('title', file.name)
                return await this.$api.media.post(formData)
            },
        }
    }
</script>
