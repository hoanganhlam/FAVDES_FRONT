<template>
    <div>
        <img v-if="display" :src="`${display.sizes['270_270']}`" alt="">
        <img v-else src="/blank.jpg" alt="">
    </div>
</template>

<script>
    export default {
        name: "Thumbnail",
        props: {
            value: {}
        },
        data() {
            return {
                index: 0
            }
        },
        computed: {
            display() {
                if (Array.isArray(this.value)) {
                    if (this.value.length) {
                        return this.value[this.index]
                    }
                    return null
                }
                return this.value
            }
        }
    }
</script>

<style scoped>

</style>
