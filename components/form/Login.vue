<template>
    <div class="card" style="width: 100%">
        <div class="card-content">
            <b-field class="has-text-centered">
                <img src="/logo.png" alt="">
            </b-field>
        </div>
        <section class="card-content">
            <b-field grouped v-show="!loginTemp">
                <b-field label="First name" expanded>
                    <b-input v-model="form.first_name" placeholder="Larry" required>
                    </b-input>
                </b-field>
                <b-field label="Last name" expanded>
                    <b-input v-model="form.last_name" placeholder="Page" required>
                    </b-input>
                </b-field>
            </b-field>
            <b-field label="Username" v-show="!loginTemp">
                <b-input type="text" v-model="form.username" placeholder="Your username" required icon="account">
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
            <b-field v-show="loginTemp" label="Password">
                <b-input
                    icon="key"
                    type="password"
                    v-model="form.password"
                    password-reveal
                    placeholder="Your password"
                    required>
                </b-input>
            </b-field>
            <b-field v-show="!loginTemp" label="Password">
                <b-input
                    icon="key"
                    type="password"
                    v-model="form.password1"
                    password-reveal
                    placeholder="Your password"
                    required>
                </b-input>
            </b-field>
            <b-field v-show="!loginTemp" label="Repeat password">
                <b-input
                    icon="key"
                    type="password"
                    v-model="form.password2"
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
                    <button class="button is-text" @click="loginTemp = !loginTemp">{{loginTemp ? 'Register' :
                        'Login'}}
                    </button>
                </div>
                <div class="level-right">
                    <div class="buttons">
                        <button class="button" type="button" @click="$emit('close')">Close</button>
                        <button class="button is-primary" @click="handleSubmit">{{loginTemp ? 'Login' : 'Register'}}
                        </button>
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
                    first_name: null,
                    last_name: null,
                    username: null,
                    email: null,
                    name: null,
                    password: null,
                    password1: null,
                    password2: null,
                },
                validForm: {},
                loginTemp: this.login
            }
        },
        methods: {
            async handleSubmit() {
                if (this.loginTemp) {
                    let res = await this.$auth.login({
                        email: this.form.email,
                        password: this.form.password
                    }).then(res => {
                        this.$emit('close')
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    await this.$axios.$post('/auth/rest-auth/registration/', this.form).then(res => {
                        this.loginTemp = true
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
