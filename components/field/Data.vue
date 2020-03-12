<template>
    <div>
        <b-taginput
            v-if="multiple"
            :loading="fetching"
            class="editable"
            :size="size"
            v-model="data"
            :data="querySet"
            autocomplete
            :allow-new="allowNew"
            :open-on-focus="openOnFocus"
            :field="field"
            :icon="icon"
            :placeholder="placeholder"
            :before-adding="beforeAdding"
            @add="onAdd"
            @typing="getQuerySet">
            <template slot-scope="props">
                {{props.option && field ? props.option[field] : props.option}}
            </template>
            <template slot="empty">got zero result</template>
        </b-taginput>
        <div class="taginput" v-else>
            <div class="taginput-container is-focusable">
                <b-autocomplete
                    :loading="fetching"
                    :size="size"
                    v-model="name"
                    :placeholder="placeholder"
                    :keep-first="keepFirst"
                    :open-on-focus="openOnFocus"
                    :data="querySet"
                    :field="field"
                    :icon="icon"
                    @focus="$emit('focus')"
                    @typing="getQuerySet"
                    @keyup.enter.native="onAdd(name)"
                    @select="onSelect">
                    <template v-if="allowNew" slot="footer">
                        <a @click="onAdd(name)">
                            <span>Add new... </span>
                        </a>
                    </template>
                    <template slot="empty">{{name ? `No results for ${name}` : 'Please input something..'}}</template>
                </b-autocomplete>
            </div>
        </div>
        <b-modal :active.sync="isActive" :can-cancel="false" custom-class="allow-scroll" animation="zoom-in">
            <div class="container small" v-if="requireModify">
                <div class="card-modal">
                    <header class="modal-card-head">
                        <div class="level modal-card-title is-mobile">
                            <div class="level-left">
                                <div class="button is-text" @click="handleBack">
                                    <b-icon size="is-small" icon="arrow-left"></b-icon>
                                    <span>back</span>
                                </div>
                            </div>
                            <div class="level-right">
                                <div class="buttons">
                                    <div class="button is-text" @click="handleSave">Save</div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div class="modal-card-body">
                        <div class="container">
                            <div class="notification">
                                <div class="media">
                                    <div class="media-left">
                                        <b-icon icon="lightbulb"></b-icon>
                                    </div>
                                    <div class="media-content"><b>Hey!</b>: You created {{copyData[field]}}, Could you update some information to it!</div>
                                </div>
                            </div>
                            <field v-for="(sch, i) in schemas" :key="i" :schema="sch"
                                   :value="typeof copyData[sch.field] === 'undefined' ? sch.options.default : copyData[sch.field]"
                                   @input="handleInput(sch.field, $event)"/>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import debounce from 'lodash/debounce'
    import getSchema from "../../utils/data_schemas";

    export default {
        name: 'Data',
        props: {
            multiple: {
                default: false,
                type: Boolean
            },
            icon: {
                default: 'tag',
                type: String
            },
            field: {
                default: 'title',
                type: String
            },
            valueField: {
                default: 'id',
                type: String
            },
            createField: {
                default: 'title',
                type: String
            },
            value: {},
            module: {},
            allowNew: {
                type: Boolean,
                default: false
            },
            size: {},
            placeholder: {
                type: String,
                default: 'Anything'
            },
            dataset: {
                type: Array,
                default: () => []
            },
            requireModify: {
                type: Boolean,
                default: false
            }
        },
        data() {
            let name = ''
            let data = this.value
            if (!Boolean(data)) {
                if (this.multiple) {
                    data = []
                } else {
                    data = null
                }
            } else {
                name = this.field ? data[this.field] : data
            }
            let schemas = []
            let isActive = false
            if (this.requireModify) {
                schemas = getSchema(this.module)
            }
            return {
                name,
                querySet: this.dataset,
                data: data,
                openOnFocus: true,
                keepFirst: false,
                fetching: false,
                isActive,
                schemas,
                copyData: {}
            }
        },
        methods: {
            onSelect(option) {
                if (option) {
                    this.data = option
                    this.name = option[this.field]
                    this.$emit('input', option)
                }
            },
            async onAdd(e) {
                if (typeof e === 'string' && e.length > 3) {
                    let res = await this.$api[this.module].post({[this.createField]: e})
                    if (res.id) {
                        if (this.multiple) {
                            this.data[this.data.indexOf(e)] = res
                        } else {
                            this.onSelect(res)
                        }
                        this.querySet.push(res)
                        this.copyData = res
                        if (this.requireModify) {
                            this.isActive = true
                        }
                    }
                }
            },
            beforeAdding(tag) {
                let check = this.data.map(x => x.id).indexOf(tag.id)
                return check === -1
            },
            getQuerySet: debounce(function (text) {
                if (this.module) {
                    this.$api[this.module].list({search: text}).then(res => {
                        this.querySet = res['results']
                    })
                }
            }, 500),
            handleInput(field, value) {
                this.$set(this.copyData, field, value)
            },
            handleBack() {
                this.isActive = false
            },
            async handleSave() {
                if (this.copyData.id) {
                    await this.$api[this.module].update(this.copyData[this.valueField], this.cleanData(this.copyData))
                }
                this.isActive = false
            }
        },
        watch: {
            value() {
                if (!this.multiple) {
                    this.onSelect(this.value)
                }
            },
            data() {
                this.$emit('input', this.data)
            },
            dataset() {
                this.querySet = this.dataset
            }
        }
    }
</script>
