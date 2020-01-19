<template>
    <span v-if="!isUpdating">{{data}}</span>
    <b-input class="editable" :type="type" v-else v-model="data" @input="$emit('input', data)"
             :rows="rows"
             :placeholder="placeholder"/>
</template>

<script>
    export default {
        name: "Editable",
        props: {
            isUpdating: Boolean,
            placeholder: {},
            value: {},
            type: {
                type: String,
                default: 'input'
            },
            rows: {
                type: Number,
                default: 6
            }
        },
        data() {
            return {
                data: this.value || null
            }
        }
    }
</script>

<style scoped>

</style>
