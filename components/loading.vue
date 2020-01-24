<template lang="html">
    <div class="loading-page hero is-fullheight" v-if="loading">
        <div class="hero-body has-text-centered">
            <img src="../static/sunny-light.svg" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            loading: false
        }),
        methods: {
            start() {
                this.loading = true
            },
            finish() {
                this.loading = false
            }
        }
    }
</script>

<style lang="scss">
    .loading-page {
        position: fixed;
        z-index: 99999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #87ceeb;

        img {
            margin: 0 auto;
        }
    }
</style>
