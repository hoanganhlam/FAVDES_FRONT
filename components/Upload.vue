<template>
    <section>
        <b-field>
            <b-upload v-model="dropFiles" multiple drag-drop @input="handleInput">
                <section class="section">
                    <div class="content has-text-centered">
                        <p>
                            <b-icon pack="fa" icon="upload" size="is-large"></b-icon>
                        </p>
                        <p v-if="text">{{text}}</p>
                    </div>
                </section>
            </b-upload>
        </b-field>
    </section>
</template>

<script>
    export default {
        props: {
            text: {}
        },
        data() {
            return {
                dropFiles: []
            }
        },
        name: 'upload',
        methods: {
            deleteDropFile(index) {
                this.dropFiles.splice(index, 1)
            },
            async handleInput(data) {
                let res = await this.beforeUpload(data[0])
                this.$emit('done', res)
            },
            async beforeUpload(file) {
                let formData = new FormData()
                formData.append('file', file)
                return await this.$api.file.post(formData)
            },
        }
    }
</script>
