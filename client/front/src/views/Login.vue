<template>
    <div class="about">
        <div class="login__form l-f">
            <div class="l-f__inner">
                <h1>LOGIN</h1>

                <div class="l-f__frap">
                    <span class="l-f__lable">EMAIL</span>
                    <input class="l-f__input" type="text" v-model="email" />
                </div>

                <div class="l-f__frap">
                    <span class="l-f__lable">PASSWORD</span>
                    <input class="l-f__input" type="text" v-model="password" />
                </div>
                <div class>
                    <button @click="login">login!</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login() {
            this.$store
                .dispatch('logIn', {
                    email: this.email,
                    password: this.password
                })
                .then(token => {
                    this.$router.push({ name: 'home' });
                    console.log(token);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    created() {
        if (this.$store.getters.loggedIn) {
            this.$router.push({ name: 'home' });
        }
    }
};
</script>
<style lang="scss" scope>
.login__form {
    width: 300px;
    margin: 15px auto 0;
    background: #eeeeee;
    .l-f__inner {
        padding: 50px 0;
        .l-f__frap {
            margin: 0 auto 15px;
            display: inline-block;
        }
    }
}
.l-f__lable {
    display: block;
    text-align: left;
    font-size: 10px;
    font-weight: 900;
}
.l-f__input {
    display: block;
}
</style>
