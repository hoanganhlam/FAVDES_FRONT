<template>
    <div>
        <div :class="boxClass" style="padding-bottom: 0" @click="handleClick()">
            <div v-if="value.medias && value.medias.length">
                <div v-for="(img, i) in photos" :class="`clickable`">
                    <img class="gallery__img" :src="src(i)" :alt="img.title" @load="onLoad">
                </div>
            </div>
            <div v-else-if="layout === 'square'">
                <div class="gallery__item gallery__item--1">
                    <img class="gallery__img" src="/blank.jpg" alt="">
                </div>
            </div>
        </div>
        <div class="card-content content">
            <h3 style="margin-bottom: 10px" class="title is-6" v-if="value.title">{{value.title}}</h3>
            <p v-if="value.content">{{value.content}}</p>
            <slot></slot>
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
                let out = null;
                if (['square'].includes(this.layout)) {
                    out = this.value.medias[index].sizes['thumb_270_270'];
                } else {
                    out = this.value.medias[index].sizes['full_size'];
                }
                return this.cleanURI(out);
            },
            handleClick(i) {
                if (this.to !== this.$route.path) {
                    this.$router.replace({path: this.to});
                }
            },
            onLoad(e) {
                this.reLayout();
            }
        },
        computed: {
            photos() {
                if (this.layout === 'minimize') {
                    return this.value.medias.slice(0, 2);
                } else if (this.layout === 'square' && this.value.medias.length) {
                    return this.value.medias.slice(0, 1);
                }
                return this.value.medias;
            },
            boxClass() {
                return `card-image${this.layout === 'square' ? ' image is-1by1' : ''}`;
            }
        }
    }
</script>

<style scoped>

</style>
