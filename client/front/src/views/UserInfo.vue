<template>
    <div class="about">
        <h1>Logged user</h1>
        <div class="container">
            Имя: {{user.name}}
            <br />
            Баланс доступный: {{user.balance}}
            <br />
        </div>
    </div>
</template>
<script>
export default {
    name: 'UserInfo',
    data() {
        return {
            user: {}
        };
    },
    methods: {},
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn;
        }
    },
    created() {
        if (!this.$store.getters.loggedIn) {
            this.$router.push({ name: 'home' });
        } else {
            this.$store
                .dispatch('getUserInfo')
                .then(userInfo => {
                    console.log(userInfo.data);
                    this.user = userInfo.data;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>
<style>
.container {
    max-width: 600px;
    margin: 0 auto;
}
li {
    text-align: left;
    list-style-type: none;
}
</style>