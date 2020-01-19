<template>
    <div class="card">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <div class="image is-64x64">
                        <img src="/logo.png" alt="">
                    </div>
                </div>
                <div class="media-content">
                    <h4 class="title is-5"><n-link :to="slug">{{value.title}}</n-link></h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Destination",
        props: {
            value: {},
            type: {
                type: String,
                default: 'destination'
            }
        },
        computed: {
            slug() {
                return `/${this.value.slug}`
            }
        }
    }
</script>

<style scoped>

</style>
