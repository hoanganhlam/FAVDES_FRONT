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
            let seconds = moment().diff(date, 'seconds', false);
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
            if (user.firstName || user.lastName) {
                return user.firstName + ' ' + user.lastName
            }
            return user.username
        },
        formatDate(dateStr) {
            return new moment(dateStr, 'YYYY-MM-DD').format('YYYY-MM-DD')
        },
        handleDelete(module, title, id) {
            this.$buefy.dialog.confirm({
                title: `Deleting ${title}`,
                message: `Are you sure you want to <b>delete</b> ${title}? This action cannot be undone.`,
                confirmText: 'Sure',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => {
                    this.$api[module].delete(id).then(res => {
                        this.$buefy.toast.open(`${title} deleted!`)
                        this.$router.replace({path: '/'})
                    })
                }
            })
        },
        getVerb(VERB) {
            switch (VERB) {
                case 'REVIEW':
                    return 'posted'
                case 'VOTE':
                    return 'voted for'
                case 'COMMENT':
                    return 'comment'
                case 'CREATED':
                    return 'posted'
                case 'JOIN':
                    return 'joined'
                default:
                    return ''
            }
        },
        getAction(MODEL) {
            switch (MODEL) {
                case 'Compare':
                    return 'a comparison'
                case 'Review':
                    return 'a review'
                case 'User':
                    return 'profile'
                case 'Stack':
                    return 'a stack'
                default:
                    return ''
            }
        },
        getSlug(MODEL) {
            switch (MODEL) {
                case 'Compare':
                    return 'compare'
                case 'Review':
                    return null
                case 'User':
                    return 'profile'
                case 'Stack':
                    return 'stack'
                default:
                    return ''
            }
        },
        async addStack(form) {
            if (this.$auth.loggedIn) {
                if (this.adding && this.form.title) {
                    let res = await this.$api.stack.post(form)
                    this.$router.replace({path: `/stack/${res.slug}`})
                } else if (!this.adding) {
                    this.adding = true
                } else if (form.title === null || form.title.length < 5) {
                    this.$buefy.snackbar.open({
                        duration: 3000,
                        message: 'Please input stack name!!!',
                        type: 'is-warning',
                        position: 'is-bottom-right',
                        actionText: 'OK',
                        queue: true
                    })
                }
            } else {
                this.$buefy.snackbar.open({
                    duration: 3000,
                    message: 'Please login first!!!!',
                    type: 'is-warning',
                    position: 'is-bottom-right',
                    actionText: 'OK',
                    queue: true
                })
            }
        },
    }
})
