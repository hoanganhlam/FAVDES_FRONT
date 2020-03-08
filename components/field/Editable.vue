<template>
    <span v-if="!isUpdating">{{data}}</span>
    <b-input v-else class="editable"
             :icon="icon"
             :type="type"
             v-model="data" @input="$emit('input', data)"
             :rows="rows"
             :placeholder="placeholder">
    </b-input>
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
            },
            icon: {
                type: String,
                default: null
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
