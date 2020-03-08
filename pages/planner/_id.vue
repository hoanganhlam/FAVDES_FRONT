<template>
    <div>
        <div class="planner">
            <div class="subheader">
                <div class="container">
                    <b-navbar>
                        <template slot="start">
                            <b-navbar-item tag="div">
                                TRIP PLANNER
                            </b-navbar-item>
                        </template>
                        <template slot="end">
                            <b-navbar-item tag="div">
                                <b-switch v-model="publicView">Public</b-switch>
                            </b-navbar-item>
                            <b-navbar-item tag="div" v-if="!publicView">
                                <button class="button is-text" type="button" @click="showSetting = !showSetting">
                                    <b-icon size="is-small" :icon="active ? 'cogs' : 'cogs'"></b-icon>
                                    <span>Setting</span>
                                </button>
                            </b-navbar-item>
                            <b-navbar-item tag="div" v-if="publicView">
                                <div class="button is-text">
                                    <b-icon icon="message" size="is-small"></b-icon>
                                    <span>Chat</span>
                                </div>
                            </b-navbar-item>
                            <b-navbar-item tag="div"  v-if="publicView">
                                <div class="button is-text">
                                    <b-icon icon="account-plus" size="is-small"></b-icon>
                                    <span>JOIN</span>
                                </div>
                            </b-navbar-item>
                            <b-navbar-item tag="div" v-if="!publicView">
                                <div class="button is-text">
                                    <b-icon size="is-small" icon="send"></b-icon>
                                    <span>Share</span>
                                </div>
                            </b-navbar-item>
                        </template>
                    </b-navbar>
                </div>
            </div>
            <div class="container" v-bind:class="{'extra has-banner': hasBanner}">
                <div class="banner image" v-if="hasBanner">
                    <img src="https://i.picsum.photos/id/337/920/200.jpg" alt="">
                </div>
                <div class="button is-text" @click="hasBanner = !hasBanner">
                    <b-icon size="is-small" icon="plus"></b-icon>
                    <span>Add cover</span>
                </div>
            </div>
            <div class="container content">
                <h1 class="title is-2" placeholder="Untitled" contenteditable>ssss</h1>
                <p><b-dropdown aria-role="menu" trap-focus>
                    <div class="button is-text" slot="trigger">
                        <b>{{data.destination_start ? data.destination_start.title : 'Start'}}</b>
                        <b-icon size="is-small" icon="arrow-right"></b-icon>
                        <b>{{data.destination_end ? data.destination_end.title : 'End'}}</b>
                    </div>
                    <b-dropdown-item style="min-width: 300px" aria-role="menu-item" :focusable="false" custom>
                        <b-field>
                            <data-select
                                :multiple="false"
                                field="title"
                                v-model="data.destination_start" size="is-medium" icon="map-marker-plus"
                                placeholder="Start"
                                module="destination"/>
                        </b-field>
                        <b-field>
                            <data-select
                                :multiple="false"
                                field="title"
                                v-model="data.destination_end" size="is-medium" icon="map-marker-plus"
                                placeholder="End"
                                module="destination"/>
                        </b-field>
                    </b-dropdown-item>
                </b-dropdown></p>
                <div class="description" contenteditable placeholder="Description">
                </div>
                <div class="schedule">
                    <div class="level is-mobile">
                        <div class="level-left">
                            <h4 class="widget_title">
                                <b-icon icon="clock-outline" size="is-small"></b-icon>
                                <span>Schedule</span>
                            </h4>
                        </div>
                        <div class="level-right">
                            <b-dropdown aria-role="list">
                                <button class="button" slot="trigger" slot-scope="{ active }">
                                    <span>Full Schedule (3 days)</span>
                                    <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
                                </button>
                                <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
                                <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
                                <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>
                    <div>
                        <div class="columns is-multiline">
                            <div class="column is-6" v-for="(s, i) in data.steps" :key="i">
                                <div class="card step clickable" @click="showSF(s)">
                                    <div class="card-content">
                                        <div class="media">
                                            <div class="media-left">
                                                <div class="image is-32x32">
                                                    <img src="https://img.icons8.com/ios/250/000000/bicycle.png" alt="">
                                                </div>
                                            </div>
                                            <div class="media-content">
                                                <h4 class="value">Do Something</h4>
                                                <p>abc xyz</p>
                                            </div>
                                            <div class="media-right">
                                                10/3/2020 - 6:00 AM
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="has-text-centered" v-if="!publicView">
                            <div class="button is-text is-rounded" @click="showSF()">
                                <b-icon icon="plus"></b-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <client-only>
                    <MapBox height="200px" :addresses="[]"></MapBox>
                </client-only>
            </div>
<!--            <div class="container content">-->
<!--                <h4 class="widget_title">-->
<!--                    <b-icon icon="camera" size="is-small"></b-icon>-->
<!--                    <span>Gear</span>-->
<!--                </h4>-->
<!--            </div>-->
        </div>
        <b-modal :active.sync="showSetting" :width="320">
            <div class="box"></div>
        </b-modal>
        <b-modal :active.sync="showStep" :can-cancel="false" custom-class="allow-scroll" animation="zoom-in">
            <step style="min-height: 80vh"></step>
        </b-modal>
    </div>
</template>

<script>
    export default {
        name: "TripDetail",
        data() {
            return {
                options: {
                    sections: []
                },
                hasBanner: false,
                dates: [],
                active: null,
                showSetting: false,
                showStep: false,
                data: {
                    destination_start: null,
                    destination_end: null,
                    title: null,
                    description: null,
                    steps: []
                },
                publicView: false
            }
        },
        methods: {
            showSF(step) {
                this.showStep = true
            }
        }
    }
</script>

<style scoped>

</style>
