<template>
    <div>
        <div :class="boxClass" style="padding-bottom: 0">
            <div v-if="value.medias.length" :class="galleryClass">
                <div v-for="(img, i) in photos" :class="`clickable gallery__item gallery__item--${i + 1}`" @click="handleClick(i)">
                    <img class="gallery__img" :src="src(i)" :alt="img.title">
                </div>
            </div>
            <div v-else-if="layout === 'square'">
                <div class="gallery__item gallery__item--1">
                    <img class="gallery__img" src="/blank.jpg" alt="">
                </div>
            </div>
        </div>
        <div class="card-content content" v-bind:class="{'inside hover': layout === 'square'}">
            <h3 style="margin-bottom: 10px" class="title is-6" v-if="value.title">
                <n-link :to="to">{{value.title}}</n-link>
            </h3>
            <p v-if="value.content">
                <n-link :to="to">{{value.content}}</n-link>
            </p>
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
                if (size === 1) {
                    out = this.value.medias[0].sizes['resize']
                } else if (!['full', 'minimize'].includes(this.layout)) {
                    out = this.value.medias[0].sizes['resize']
                } else if (['full', 'square'].includes(this.layout)) {
                    out = this.value.medias[index].sizes['270_270']
                } else {
                    out = this.value.medias[index].sizes['540_540']
                }
                return this.cleanURI(out)
            },
            handleClick(i) {
                this.$store.dispatch('media/setData', {
                    medias: this.value.medias,
                    index: i,
                    user: this.value.user
                })
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
                if (['full', 'minimize'].includes(this.layout)) {
                    lu = 'full'
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
