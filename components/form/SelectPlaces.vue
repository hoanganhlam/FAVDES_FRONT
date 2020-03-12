<template>
    <div class="place-picker" v-bind:class="{'static': !(start_temp && end_temp)}">
        <b-dropdown aria-role="menu" trap-focus>
            <div class="button is-text" slot="trigger">
                <b>{{start_temp ? start_temp.title : 'Start'}}</b>
                <b-icon size="is-small" icon="arrow-right"></b-icon>
                <b>{{end_temp ? end_temp.title : 'End'}}</b>
            </div>
            <b-dropdown-item aria-role="menu-item" :focusable="false" custom>
                <b-field>
                    <data-select
                        :multiple="false"
                        field="title"
                        v-model="start_temp" size="is-medium" icon="map-marker-plus"
                        placeholder="Start"
                        @input="handleInput('start', $event)"
                        module="destination"/>
                </b-field>
            </b-dropdown-item>
            <b-dropdown-item aria-role="menu-item" :focusable="false" custom>
                <b-field>
                    <data-select
                        :multiple="false"
                        field="title"
                        @input="handleInput('end', $event)"
                        v-model="end_temp" size="is-medium" icon="map-marker-plus"
                        placeholder="End"
                        module="destination"/>
                </b-field>
                <aside class="menu">
                    <p class="menu-label">Suggestion</p>
                    <ul class="menu-list">
                        <li><a>Dashboard</a></li>
                        <li><a>Customers</a></li>
                    </ul>
                </aside>
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
    export default {
        name: "SelectPlaces",
        props: {
            start: {},
            end: {}
        },
        data() {
            return {
                start_temp: this.start,
                end_temp: this.end
            }
        },
        methods: {
            handleInput(pos, data) {
                this.$emit(pos, data)
            }
        }
    }
</script>

<style lang="scss">
    .place-picker {
        margin-bottom: 1rem;

        &.static {
            .button {
                color: #DDDDDD;
            }
        }

        .dropdown-content {
            width: 300px;

            ul {
                list-style: none;
                margin-left: 0;
                margin-top: 0;
            }
        }
    }
</style>
