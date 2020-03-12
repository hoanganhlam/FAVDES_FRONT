<template>
    <div class="card step clickable">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <b-icon :icon="icon"></b-icon>
                </div>
                <div class="media-content">
                    <h4 class="value">{{value.title}}</h4>
                    <p v-if="value.destination">{{value.destination.title}}</p>
                </div>
                <div class="media-right">
                    <small>{{value.start_time}}</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Step",
        props: {
            value: {}
        },
        computed: {
            icon() {
                return 'calendar-check'
            }
        }
    }
</script>

<style scoped>

</style>
