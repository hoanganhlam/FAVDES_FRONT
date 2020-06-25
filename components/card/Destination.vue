<template>
    <div class="card">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <avatar class="is-64x64" :value="media" :name="value.title"/>
                </div>
                <div class="media-content">
                    <n-link :to="`/${value.slug}`">{{value.title}}</n-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Destination",
        props: {
            value: {
                default: () => {
                    return {
                        title: "Hà Nội",
                        slug: "hanoi"
                    }
                }
            },
            type: {
                type: String,
                default: 'destination'
            }
        },
        computed: {
            slug() {
                return `/${this.value.slug}`
            },
            media() {
                if (this.value.medias && this.value.medias.length) {
                    return this.value.medias[0];
                } else {
                    return this.value['temp_media']
                }
            }
        }
    }
</script>

<style lang="scss">
</style>
