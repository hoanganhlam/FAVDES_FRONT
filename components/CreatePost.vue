<template>
    <div class="submit">
        <b-field>
            <b-input size="is-medium" icon="link" icon-pack="fas" :loading="isLoading" v-model="url" placeholder="Just a link!" @blur="scrape()"></b-input>
        </b-field>
        <div v-if="posting" class="skeleton">
            <Submistion v-if="item" v-model="item" :preview="true" @done="handleDone"></Submistion>
        </div>
    </div>
</template>

<script>
    function validateUrl(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
    }

    export default {
        name: "CreatePost",
        data() {
            return {
                url: null,
                item: null,
                isLoading: false,
                posting: false
            }
        },
        methods: {
            scrape() {
                if (this.url === null || this.url === '' || !validateUrl(this.url)) {
                    this.posting = false
                    this.isLoading = false
                    return
                }
                this.posting = true
                this.isLoading = true
                this.item = null
                this.$axios.$get(`/utilities/scrape?url=${this.url}`).then(res => {
                    res.url = this.url
                    res.cType = 'Articles'
                    this.item = res
                }).finally(() => {
                    this.isLoading = false
                })
            },
            handleDone(item) {
                this.url = null
                this.item = null
                this.posting = false
                this.$emit('done', item)
            }
        }
    }
</script>

<style lang="scss">
    .submit {
        margin-bottom: 1rem;
    }
</style>
