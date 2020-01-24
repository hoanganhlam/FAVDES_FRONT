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
                <b-field label-position="on-border" label="in" expanded>
                    <single-select
                        @focus="mapping = true"
                        field="formatted_address"
                        v-model="form.address" size="is-medium" icon="map-marker-plus"
                        placeholder="Somewhere"
                        module="fetch_address"/>
                </b-field>
                <b-field label-position="on-border" label="Name for your place" v-if="posting && form.address">
                    <b-input v-model="form.destination_name"
                             size="is-medium"
                             icon="format-title"
                             placeholder="My point"></b-input>
                </b-field>
                <b-field v-if="posting && mapping && addresses.length">
                    <div class="tags">
                        <div class="tag clickable is-small" v-for="add in addresses" :key="add.id"
                             @click="form.address = add"
                             v-bind:class="{'is-primary': form.address && add.id === form.address.id}">
                            {{add.formatted_address}}
                        </div>
                    </div>
                </b-field>
                <b-field v-if="posting && mapping">
                    <MapBox height="150px" :addresses="form.address ? [form.address] : []" @moved="onMoved"></MapBox>
                </b-field>
            </div>
        </div>
        <div class="columns is-mobile is-multiline">
            <div class="column is-3" v-for="p in form.medias" :key="p.id">
                <div class="image">
                    <img :src="p.sizes['270_270']" alt="">
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
            <multiple-select v-model="form.taxonomies" placeholder="#hashtag" module="taxonomy"/>
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
                    address: null,
                    medias: [],
                    taxonomies: [],
                    destination_name: null
                },
                isLoading: false,
                posting: false,
                mapping: false,
                addresses: []
            }
        },
        computed: {},
        methods: {
            async submit() {
                let data = this.formatData(this.form)
                let res = await this.$api.post.post(data)
                this.$emit("done", res)
                this.form = {
                    title: null,
                    content: null,
                    address: null,
                    medias: [],
                    taxonomies: [],
                    destination_name: null
                }
                this.posting = false
            },
            onMoved(e) {
                this.addresses = e.addresses
                if (this.addresses.length) {
                    this.form.address = this.addresses[0]
                }
            }
        }
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
