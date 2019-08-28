<template>
    <div class="about">
        <div class="login__form l-f">
            <div class="l-f__inner">
                <h1>LOGOUT</h1>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'logout',
    data() {
        return {};
    },
    methods: {
        login() {}
    },
    created() {
        this.$store.dispatch('logOut');
        this.$router.push({ name: 'login' });
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
