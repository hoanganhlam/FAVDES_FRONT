import Vue from 'vue'
import moment from "moment";

Vue.mixin({
    data() {
        return {
            moment: moment,
            mediaDomain: process.env.mediaDomain || "https://compare.sgp1.digitaloceanspaces.com/"
        }
    },
    methods: {
        timeSince(date) {
            let seconds = moment().diff(this.momentTime(date), 'seconds', false);
            return this.convertTime(seconds)
        },
        convertTime(seconds) {
            var interval = Math.floor(seconds / 31536000);
            if (interval > 1) {
                return interval + " years";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval > 1) {
                return interval + " month";
            }
            interval = Math.floor(seconds / 86400);
            if (interval > 1) {
                return interval + " day";
            }
            interval = Math.floor(seconds / 3600);
            if (interval > 1) {
                return interval + " hours";
            }
            interval = Math.floor(seconds / 60);
            if (interval > 1) {
                return interval + " minutes";
            }
            return Math.floor(seconds) + " seconds";
        },
        capitalizeFirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        convertName(user) {
            if (user.profile && user.profile.nick) {
                return user.profile.nick
            }
            if (user.first_name || user.last_name) {
                return user.first_name + ' ' + user.last_name
            }
            return user.username
        },
        formatDate(dateStr) {
            return new moment(dateStr, 'YYYY-MM-DD').format('YYYY-MM-DD')
        },
        cleanData(data) {
            let out = {}
            Object.keys(data).forEach(i => {
                if (data[i]) {
                    if (['start_time', 'end_time'].includes(i)) {
                        out[i] = this.momentTime(data[i]).format('YYYY-MM-DD HH:mm')
                    } else if (Array.isArray(data[i])) {
                        out[i] = data[i].map(x => x.id)
                    } else if (typeof data[i] === 'object' && data[i].id) {
                        out[i] = data[i].id
                    } else {
                        out[i] = data[i]
                    }
                }
            })
            return out
        },
        convertDate(date) {
            if (date) {
                return new Date(date + ' UTC')
            }
            return null
        },
        momentTime(date) {
            return moment(date, 'YYYY-MM-DDTHH:mm').utc()
        },
    },
    computed: {
        currentUser: {
            get() {
                return this.$store.getters['auth/getUser']
            },
            set() {

            }
        }
    }
})
