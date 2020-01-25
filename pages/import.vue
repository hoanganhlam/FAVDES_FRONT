<template>
    <div class="section hero">
        <div class="hero-body">
            <div class="container small">
                <div class="card">
                    <div class="card-content">
                        <b-upload v-model="dropFiles" drag-drop @input="handleInput">
                            <div class="content has-text-centered">
                                <p>
                                    <b-icon icon="upload" size="is-large"></b-icon>
                                </p>
                                <p>Drop your files here or click to upload</p>
                            </div>
                        </b-upload>
                    </div>
                </div>
                <div class="card" v-for="item in data" :key="item.id">
                    <div class="card-image">
                        <img
                            :src="`https://images.pexels.com/photos/${item.id}/pexels-photo-${item.id}.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260`"
                            alt="">
                    </div>
                    <div class="card-content">
                        <b-field>
                            <b-input v-model="item.id"></b-input>
                        </b-field>
                        <b-field>
                            <b-input v-model="item.title"></b-input>
                        </b-field>
                        <b-field>
                            <b-input v-model="item.user_username"></b-input>
                        </b-field>
                        <b-field>
                            <b-input v-model="item.user_full_name"></b-input>
                        </b-field>
                        <b-field>
                            <b-input v-model="item.download"></b-input>
                        </b-field>
                        <b-field>
                            <b-input v-model="item.location"></b-input>
                        </b-field>
                        <b-field>
                            <div class="button is-fullwidth" @click="handleUpload(item)">Upload</div>
                        </b-field>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "import",
        data() {
            return {
                dropFiles: null,
                data: []
            }
        },
        methods: {
            handleInput(e) {
                const reader = new FileReader();
                reader.onload = this.onReaderLoad;
                reader.readAsText(e);
            },
            onReaderLoad(e) {
                this.data = JSON.parse(e.target.result)
                this.data.forEach(x => {
                    x.download = `https://www.pexels.com${x.download}`
                    x.user_username = x.user_username.replace('/@', '')
                })
            },
            async handleUpload(item) {
                let res = await this.$axios.post('/activity/import/', item)
                console.log(res);
            }
        }
    }
</script>

<style scoped>

</style>
