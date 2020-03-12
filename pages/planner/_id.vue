<template>
    <div>
        <div class="planner">
            <div class="subheader">
                <div class="container">
                    <div class="level is-mobile">
                        <div class="level-left">
                            <h1>{{data.id ? data.title : 'TRIP PLANNER'}}</h1>
                        </div>
                        <div class="level-right">
                            <n-link v-if="data.id" :to="`/planner/${data.id}`" class="button is-text">
                                {{saving ? 'Saving' : 'Saved'}}
                            </n-link>
                            <b-switch v-model="publicView">Public</b-switch>
                            <div class="buttons">
                                <button v-if="!publicView" class="button is-text" type="button"
                                        @click="showSetting = !showSetting">
                                    <b-icon size="is-small" :icon="active ? 'cogs' : 'cogs'"></b-icon>
                                    <span>Setting</span>
                                </button>
                                <div class="button is-text" v-if="publicView">
                                    <b-icon icon="message" size="is-small"></b-icon>
                                    <span>Chat</span>
                                </div>
                                <div class="button is-text" v-if="publicView">
                                    <b-icon icon="account-plus" size="is-small"></b-icon>
                                    <span>JOIN</span>
                                </div>
                                <div class="button is-text" v-if="!publicView">
                                    <b-icon size="is-small" icon="send"></b-icon>
                                    <span>Share</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container" v-bind:class="{'extra has-banner': data.options.banner}">
                <transition name="fade">
                    <field-media style="max-height: 200px" :multiple="false" v-if="data.options.banner"
                                 v-model="data.media"/>
                </transition>
                <div class="banner-control">
                    <div class="button" v-bind:class="{'is-text' : !data.options.banner}"
                         @click="data.options.banner = !data.options.banner">
                        <b-icon size="is-small" icon="plus"></b-icon>
                        <span>{{data.options.banner ? 'Remove' : 'Add'}} cover</span>
                    </div>
                </div>
            </div>
            <div class="container content">
                <ce elm="h1" :editable="true" placeholder="Untitled" class="title is-2" v-model="data.title"></ce>
                <places-picker
                    :start="data.destination_start"
                    :end="data.destination_end"
                    @start="data.destination_start = $event"
                    @end="data.destination_end = $event"
                />
                <ce elm="p" :editable="true" placeholder="Description" class="description" v-model="data.note"></ce>
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
                            <div class="column is-12" v-for="(s, i) in tasks" :key="`step_${i}`">
                                <card-step :value="s" @click.native="showSF(s, i)"></card-step>
                            </div>
                        </div>
                        <div class="has-text-centered" v-if="!publicView">
                            <div class="button is-text is-rounded" @click="showSF(null, -1)">
                                <b-icon icon="plus"></b-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <client-only>
                    <MapBox height="200px" :addresses="addresses"></MapBox>
                </client-only>
            </div>
        </div>
        <b-modal :active.sync="showSetting" :width="320">
            <div class="box"></div>
        </b-modal>
        <b-modal :active.sync="showStep" :can-cancel="false" custom-class="allow-scroll" animation="zoom-in">
            <step :schedule="data" v-model="activeStep" style="min-height: 80vh" @save="onAddStep"
                  @delete="onDeleteStep"></step>
        </b-modal>
    </div>
</template>

<script>
    import SelectPlaces from "../../components/form/SelectPlaces";
    import debounce from 'lodash/debounce'

    export default {
        name: "TripDetail",
        head() {
            return {
                title: this.data.id ? this.data.title : "Trip Plan"
            }
        },
        components: {
            'places-picker': SelectPlaces
        },
        async asyncData({$api, params}) {
            let data = {
                destination_start: null,
                destination_end: null,
                title: null,
                note: null,
                tasks: [],
                options: {
                    banner: false
                }
            }
            if (params.id && params.id !== 'create') {
                data = await $api.schedule.get(params.id)
                if (!Boolean(data.options)) {
                    data.options = {
                        banner: false
                    }
                }
            }
            return {
                data,
                tasks: data.tasks
            }
        },
        data() {
            return {
                options: {
                    sections: []
                },
                dates: [],
                active: null,
                showSetting: false,
                showStep: false,
                publicView: false,
                activeStep: null,
                saving: false
            }
        },
        methods: {
            showSF(task, index) {
                this.showStep = true
                if (task) task.index = index
                this.activeStep = task
            },
            onAddStep(task) {
                if (typeof task.index === 'undefined') {
                    this.data.tasks.push({...task})
                }
                this.showStep = false
            },
            onDeleteStep(task) {
                if (typeof task.index === 'undefined') {
                    this.tasks.splice(-1, 1)
                } else {
                    this.tasks.splice(task.index, 1)
                }
            },
            handleSave: debounce(async function () {
                const data = {...this.cleanData(this.data)}
                let res = null
                this.saving = true
                if (this.data.id) {
                    res = await this.$api.schedule.update(this.data.id, this.cleanData(data))
                } else {
                    res = await this.$api.schedule.post(data)
                }
                if (res) {
                    if (typeof this.data.id === 'undefined') {
                        const filtered = this.tasks.filter(x => typeof x.id === 'undefined')
                        for (let i = 0; i < filtered.length; i++) {
                            await this.$api.task.post({
                                schedule: res.id,
                                ...this.cleanData(filtered[i])
                            })
                        }
                    }
                    this.data.id = res.id
                    this.saving = false
                }
            }, 800)
        },
        computed: {
            addresses() {
                return this.tasks.filter(x => Boolean(x.destination)).map(x => x.destination.address)
            }
        },
        watch: {
            data: {
                handler() {
                    this.handleSave()
                },
                deep: true
            }
        },
        created() {
            if (process.client) {
                this.tasks.forEach(x => {
                    x.start_time = this.convertDate(x.start_time)
                    x.end_time = this.convertDate(x.end_time)
                })
            }
        }
    }
</script>

<style scoped>

</style>
