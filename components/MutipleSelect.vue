<template>
    <b-field>
        <b-taginput
            class="editable"
            :size="size"
            v-model="tags"
            :data="filteredTags"
            autocomplete
            :allow-new="allowNew"
            :open-on-focus="openOnFocus"
            field="title"
            icon="tag"
            :placeholder="placeholder"
            :before-adding="beforeAdding"
            @add="on_add"
            @input="$emit('input', tags)"
            @typing="getFilteredTags">
            <template slot-scope="props">
                {{props.option.title}}
            </template>
            <template slot="empty">
                Enter to add
            </template>
        </b-taginput>
    </b-field>
</template>

<script>
    import debounce from 'lodash/debounce'

    export default {
        name: 'MultipleSelect',
        props: {
            value: {},
            module: {},
            allowNew: {
                type: Boolean,
                default: true
            },
            size: {},
            placeholder: {
                type: String,
                default: 'Anything'
            }
        },
        data() {
            return {
                filteredTags: [],
                isSelectOnly: false,
                tags: this.value || [],
                openOnFocus: false
            }
        },
        methods: {
            async on_add(e) {
                if (typeof e === 'string') {
                    this.tags[this.tags.indexOf(e)] = await this.$api[this.module].post({title: e})
                }
            },
            beforeAdding(tag) {
                let check = this.tags.map(x => x.id).indexOf(tag.id)
                return check === -1
            },
            getFilteredTags: debounce(function (text) {
                this.$api[this.module].list({search: text}).then(res => {
                    this.filteredTags = res['results']
                })
            }, 500)
        }
    }
</script>
