<template>
    <div class="about">
        <div class="login__form l-f">
            <div class="l-f__inner">
                <h1>Add todo</h1>
                <div class="l-f__frap">
                    <span class="l-f__lable">TODO</span>
                    <input class="l-f__input" type="text" v-model="todo" />
                </div>
                <div class="l-f__frap">
                    <span class="l-f__lable">AMOUNT</span>
                    <input class="l-f__input" type="text" v-model.number="amount" />
                </div>

                <div class>
                    <button @click="login">add</button>
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
            todo: '',
            amount: ''
        };
    },
    methods: {
        login() {
            console.log(this.loggedIn);
            if (!this.loggedIn) {
                this.$router.push({ name: 'login' });
            } else {
                this.$store
                    .dispatch('addTodo', {
                        todo: this.todo,
                        amount: this.amount
                    })
                    .then(data => {
                        //console.log(data.trans_token);
                        this.$router.push({ name: 'listdata' });
                        // console.log(data.trans_token);
                        // alert('data added');
                    })
                    .catch(err => {
                        alert(err.data);
                        console.log(err);
                    });
            }
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn;
        }
    },
    created() {
        if (!this.$store.getters.loggedIn) {
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
