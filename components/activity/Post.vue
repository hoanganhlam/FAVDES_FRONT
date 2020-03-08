<template>
    <div>
        <div :class="boxClass" style="padding-bottom: 0">
            <div v-if="value.medias.length" :class="galleryClass">
                <div v-for="(img, i) in photos" :class="`clickable gallery__item gallery__item--${i + 1}`" @click="handleClick(i)">
                    <img class="gallery__img" :src="src(i)" :alt="img.title" @load="onLoad">
                </div>
            </div>
            <div v-else-if="layout === 'square'">
                <div class="gallery__item gallery__item--1">
                    <img class="gallery__img" src="/blank.jpg" alt="">
                </div>
            </div>
        </div>
        <div class="card-content content" v-bind:class="{'inside hover': layout === 'square'}">
            <h3 style="margin-bottom: 10px" class="title is-6" v-if="value.title">{{value.title}}</h3>
            <p v-if="value.content">{{value.content}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Post",
        props: {
            value: {},
            layout: {
                default: null,
                type: String
            },
            to: {
                default: '/',
                type: String
            }
        },
        methods: {
            src(index) {
                let out = null
                let size = this.value.medias.length
                if (['square'].includes(this.layout)) {
                    out = this.value.medias[index].sizes['270_270']
                } else {
                    out = this.value.medias[index].sizes['resize']
                }
                return this.cleanURI(out)
            },
            handleClick(i) {
                this.$store.dispatch('media/setData', {
                    medias: this.value.medias,
                    index: i,
                    user: this.value.user
                })
            },
            onLoad(e) {
                this.reLayout()
            }
        },
        computed: {
            photos() {
                if (this.layout === 'minimize') {
                    return this.value.medias.slice(0, 2)
                } else if (this.layout === 'square' && this.value.medias.length) {
                    return this.value.medias.slice(0, 1)
                }
                return this.value.medias
            },
            galleryClass() {
                let lu = this.value.medias.length
                if (this.layout === 'full') {
                    lu = 'full'
                } else if (this.layout === 'minimize' && this.value.medias.length === 1) {
                    lu = 'part'
                } else if (this.layout === 'square') {
                    lu = 'square'
                }
                return `gallery layout-${lu}`
            },
            boxClass() {
                return this.layout === 'square' ? 'card-image' : 'card-content'
            }
        }
    }
</script>

<style scoped>

</style>
