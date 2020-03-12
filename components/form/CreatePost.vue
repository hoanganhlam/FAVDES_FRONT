<template>
    <div class="submit">
        <div class="columns is-multiline">
            <div class="column" v-bind:class="{'is-12': posting}">
                <b-field label-position="on-border" label="What are you doing?" expanded>
                    <b-input v-model="form.content" :size="posting ? '_' : 'is-medium'" icon="format-title"
                             @input="posting = true" rows="3"
                             :type="posting ? 'textarea' : 'text'" placeholder="Something"></b-input>
                </b-field>
            </div>
            <div class="column" v-bind:class="{'is-12': posting}">
                <b-field label-position="on-border" label="in" expanded grouped>
                    <div class="control is-expanded is-clearfix">
                        <data-select
                            require-modify
                            v-model="form.destination"
                            :multiple="false"
                            :allow-new="true"
                            field="title"
                            value-field="slug"
                            size="is-medium"
                            icon="map-marker-plus"
                            placeholder="Somewhere"
                            module="destination"/>
                    </div>
                </b-field>
            </div>
        </div>
        <div class="columns is-mobile is-multiline">
            <div class="column is-3" v-for="p in form.medias" :key="p.id">
                <div class="image">
                    <img :src="p.sizes['thumb_270_270']" :alt="p.title">
                </div>
            </div>
            <div class="column" v-bind:class="{'is-3': form.medias.length}">
                <Upload @done="form.medias = $event"></Upload>
            </div>
        </div>
        <b-field v-if="posting">
            <b-input icon="text" v-model="form.title" placeholder="Title for this"></b-input>
        </b-field>
        <b-field v-if="posting">
            <data-select multiple v-model="form.taxonomies" placeholder="#hashtag" module="taxonomy"/>
        </b-field>
        <div v-if="posting" class="buttons">
            <div class="button is-medium" style="width: calc(20% - 0.5rem)" @click="posting = false">
                <b-icon icon="close"></b-icon>
            </div>
            <div class="button is-medium is-success" style="width: 80%" @click="submit">
                <b-icon size="is-small" icon="send"></b-icon>
                <span>Send</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CreatePost",
        data() {
            return {
                form: {
                    title: null,
                    content: null,
                    destination: null,
                    medias: [],
                    taxonomies: []
                },
                isLoading: false,
                posting: false
            }
        },
        methods: {
            async submit() {
                let data = this.formatData(this.form)
                let res = await this.$api.post.post(data)
                this.$emit("done", res)
                this.form = {
                    title: null,
                    content: null,
                    destination: null,
                    medias: [],
                    taxonomies: []
                }
                this.posting = false
            }
        },
        computed: {}
    }
</script>

<style lang="scss">
    .submit {
        .mgl-map-wrapper {
            overflow: hidden;
            border-radius: 2px;
        }
    }
</style>
