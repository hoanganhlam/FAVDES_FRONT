<template>
    <b-field class="un-grouped">
        <div v-if="schema.type === types['TEXT']">
            <b-input v-model="temp" :placeholder="schema.options['placeholder']"></b-input>
        </div>
        <div v-else-if="schema.type === types['JSON']">
            <field-json v-model="temp" :schemas="schema.suggest"/>
        </div>
        <div v-else-if="schema.type === types['ARRAY']">

        </div>
        <div v-else-if="schema.type === types['DATA']">
            <data-select v-model="temp"
                         :placeholder="schema.options['placeholder']"
                         :icon="schema.options['icon']"
                         :module="schema.options['module']"
                         :dataset="schema.suggest"
                         :allow-new="schema.options['allowNew']"
                         :field="schema.options['labelField']"
                         :value-field="schema.options['valueField']"
                         :multiple="schema.options['multiple']"/>
        </div>
        <div v-else-if="schema.type === types['DATETIME']">
            <b-datetimepicker v-model="temp" rounded placeholder="Click to select..."
                              icon="calendar-today"></b-datetimepicker>
        </div>
        <div v-else-if="schema.type === types['BOOLEAN']">
            <b-switch :v-model="temp">{{schema.label}}</b-switch>
        </div>
        <div v-else-if="schema.type === types['MAP']">
            <map-select v-model="temp"/>
        </div>
        <div v-else-if="schema.type === types['MEDIA']">
            <field-media
                style="border: 1px solid #EEEEEE; padding: 1rem;"
                v-model="temp" :image-size="schema.options['imageSize']"
                :image-class="schema.options['imageClass']"
                :multiple="schema.options['multiple']"/>
        </div>
    </b-field>
</template>

<script>
    import * as types from "../../utils/data_types";

    export default {
        name: "Field",
        props: {
            schema: {
                default: () => {
                    return {
                        label: 'Name',
                        field: 'name',
                        type: types.TEXT,
                        suggest: [],
                        options: {}
                    }
                }
            },
            value: {
                default: null
            },
        },
        data() {
            let temp = this.value
            if (temp === null) {
                if (this.schema.type === types.JSON) {
                    temp = {}
                    this.$emit('input', temp)
                }
            }
            return {
                types: types,
                temp
            }
        },
        watch: {
            temp: {
                handler: function (after, before) {
                    this.$emit('input', after)
                },
                deep: true
            }
        }
    }
</script>

<style lang="scss">
    .field.un-grouped {
        margin-right: 0 !important;
    }
</style>
