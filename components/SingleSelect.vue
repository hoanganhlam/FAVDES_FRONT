<template>
    <b-field>
        <b-autocomplete
            :loading="fetching"
            :size="size"
            v-model="name"
            :placeholder="placeholder"
            :keep-first="keepFirst"
            :open-on-focus="openOnFocus"
            :data="filteredTags"
            :field="field"
            :icon="icon"
            @focus="$emit('focus')"
            @typing="getAsyncData"
            @keyup.enter.native="on_add(name)"
            @select="handle_select">
        </b-autocomplete>
    </b-field>
</template>

<script>
    import debounce from 'lodash/debounce'

    export default {
        name: 'SingleSelect',
        props: {
            value: {},
            module: {},
            allowNew: {
                type: Boolean,
                default: true
            },
            size: {

            },
            placeholder: {
                type: String,
                default: 'Anything'
            },
            icon: {
                default: 'tag',
                type: String
            },
            field: {
                default: 'title',
                type: String
            },
            addNew: {
                default: false,
                type: Boolean
            }
        },
        data() {
            return {
                filteredTags: [],
                keepFirst: false,
                openOnFocus: false,
                name: this.value ? this.value.title : '',
                selected: this.value,
                fetching: false
            }
        },
        methods: {
            handle_select(option) {
                this.selected = option
                this.$emit('input', option)
            },
            async on_add(e) {
                if (this.addNew) {
                    if (this.fetching || this.filteredTags.length) {
                        return
                    }
                    if (typeof e === 'string') {
                        this.selected = await this.$api[this.module].post({title: e})
                        this.name = this.selected[this.field]
                    } else {

                    }
                }
            },
            getAsyncData: debounce(function (name) {
                if (!name.length) {
                    this.filteredTags = []
                    return
                }
                this.fetching = true
                this.$api[this.module].list({search: name}).then(res => {
                    this.filteredTags = res['results']
                    this.fetching = false
                })
            }, 500)
        },
        watch: {
            value() {
                this.selected = this.value
                if (this.value) {
                    this.name = this.selected[this.field]
                } else {
                    this.name = null
                }
            }
        }
    }
</script>
