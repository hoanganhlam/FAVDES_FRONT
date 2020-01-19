<template>
    <div class="card" style="width: 100%">
        <div class="card-image">
            <b-field class="has-text-centered">
                <img src="/logo.png" alt="">
            </b-field>
        </div>
        <section class="card-content">

            <b-field label="Username" v-if="!login">
                <b-input v-model="form.username" placeholder="Your username" required>
                </b-input>
            </b-field>
            <b-field label="Email">
                <b-input
                    type="email"
                    icon="at"
                    v-model="form.email"
                    placeholder="Your email"
                    required>
                </b-input>
            </b-field>
            <b-field label="Password">
                <b-input
                    icon="key"
                    type="password"
                    v-model="form.password"
                    password-reveal
                    placeholder="Your password"
                    required>
                </b-input>
            </b-field>
            <b-field>
                <b-checkbox>Remember me</b-checkbox>
            </b-field>
            <div class="level">
                <div class="level-left">
                    <button class="button" @click="login = !login">{{login ? 'Register' : 'Login'}}</button>
                </div>
                <div class="level-right">
                    <div class="buttons">
                        <button class="button" type="button" @click="$emit('close')">Close</button>
                        <button class="button is-primary" @click="handleSubmit">{{login ? 'Login' : 'Register'}}</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Login",
        props: {
            login: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                isActive: false,
                form: {
                    username: null,
                    email: null,
                    name: null,
                    password: null
                },
                validForm: {}
            }
        },
        methods: {
            async handleSubmit() {
                if (this.login) {
                    let res = await this.$auth.login({
                        email: this.form.email,
                        password: this.form.password
                    }).then(res => {
                        this.$emit('close')
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    await this.$api.user.post(this.form).then(res => {
                        this.$emit('close')
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
