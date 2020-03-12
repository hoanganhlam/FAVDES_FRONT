<template>
    <div class="el-card">
        <div class="el-card__body">
            <field v-for="(sch, i) in schemas" :key="i" :schema="sch" :value="temp[sch.field]"
                   @input="temp[sch.field] = $event"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Json",
        props: {
            schemas: {},
            value: {
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                temp: this.value
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

<style scoped>

</style>
