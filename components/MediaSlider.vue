<template>
    <div>
        <div class="columns">
            <div v-for="image in response.results" :key="image._id" :class="`column ${column}`">
                <div
                    @click="select(image)"
                    class="image 1by1 selectable"
                    v-bind:class="{'selected': isSelected(image) !== -1}">
                    <img :src="mediaDomain + (image.sizes ? image.sizes['96_96'] : image.path)" alt="">
                    <i v-if="isSelected(image) !== -1" class="fas fa-check"></i>
                </div>
            </div>
        </div>
        <div class="level">
            <div class="level-left" v-if="allowUpload">
                <b-button @click="isOpen = !isOpen">Upload</b-button>
            </div>
            <div class="level-right">
                <b-pagination
                    icon-pack="fa"
                    :total="response.total"
                    :current.sync="current"
                    @change="current = $event"
                    :simple="true"
                    :per-page="size">
                </b-pagination>
            </div>
        </div>
        <b-modal :active.sync="isOpen" has-modal-card>
            <div class="modal-card" style="width: 500px">
                <section class="modal-card-body">
                    <Upload @done="() => {fetch(); isOpen=false}"/>
                </section>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import Upload from "./Upload";

    export default {
        name: "Browser",
        components: {
            Upload
        },
        props: {
            value: {
                type: Array,
                default: () => {
                    return []
                }
            },
            size: {
                type: Number,
                default: 6
            },
            allowUpload: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                selected: this.value,
                current: 1,
                response: {
                    results: [],
                    total: 0
                },
                isOpen: false
            }
        },
        methods: {
            async fetch() {
                let query = {
                    pageSize: this.size,
                    page: this.current,
                    ordering: '-id'
                }
                this.response = await this.$api.file.list(query)
            },
            isSelected(image) {
                let temp = this.selected.map(x => x._id)
                return temp.indexOf(image._id)
            },
            select(image) {
                let index = this.isSelected(image)
                if (index === -1) {
                    this.selected.push(image)
                } else {
                    this.selected.splice(index, 1)
                }
            }
        },
        watch: {
            current() {
                this.fetch()
            },
            selected() {
                this.$emit('input', this.selected)
            }
        },
        computed: {
            column() {
                return `is-${12 / this.size}`
            }
        },
        created() {
            this.fetch()
        }
    }
</script>

<style scoped>
</style>
