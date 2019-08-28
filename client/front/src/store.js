import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null
    },
    getters: {
        loggedIn(state) {
            return state.token !== null;
        }
    },
    mutations: {
        retrieveToken(state, token) {
            state.token = token;
        },
        destroyToken(state) {
            state.token = null
        }
    },
    actions: {
        logOut(context) {
            localStorage.removeItem('access_token');
            context.commit('destroyToken');
        },
        getToken(context, credentials) {
            return new Promise((resolve, reject) => {
                axios
                    .post('http://localhost:8000/users', {
                        username: credentials.name,
                        password: credentials.password,
                        email: credentials.email
                    })
                    .then(tkn => {
                        const token = tkn.data.token_id;
                        localStorage.setItem('access_token', token);
                        context.commit('retrieveToken', token);
                        resolve(token);
                    })
                    .catch(err => {
                        reject('failure reason');
                        console.log(err);
                    });
            });
        },
        logIn(context, credentials) {
            return new Promise((resolve, reject) => {
                axios
                    .post('http://localhost:8000/sessions/create', {
                        password: credentials.password,
                        email: credentials.email
                    })
                    .then(tkn => {
                        const token = tkn.data.token_id;
                        localStorage.setItem('access_token', token);
                        context.commit('retrieveToken', token);
                        resolve(tkn);
                    })
                    .catch(err => {
                        reject('failure reason');
                        console.log(err);
                    });
            });
        },
        addTodo(context, credentials) {
            return new Promise((resolve, reject) => {
                axios
                    .post(
                        'http://localhost:8000/api/protected/transactions', {
                            name: credentials.todo,
                            amount: credentials.amount
                        }, {
                            headers: {
                                authorization: this.state.token
                            }
                        }
                    )
                    .then(tkn => {
                        //   console.log();
                        resolve(tkn);
                    })
                    .catch(err => {

                        reject(err.response);

                        // console.log(err.response);
                    });
            });
        },
        getUserTodos(context) {
            return new Promise((resolve, reject) => {
                axios
                    .get('http://localhost:8000/api/protected/transactions', {
                        headers: {
                            authorization: this.state.token
                        }
                    })
                    .then(tkn => {
                        console.log(tkn);
                        resolve(tkn);
                    })
                    .catch(err => {
                        reject('failure reason');
                        console.log(err);
                    });
            });
        },
        getUserInfo(context) {
            return new Promise((resolve, reject) => {
                axios
                    .get('http://localhost:8000/api/protected/user-info', {
                        headers: {
                            authorization: this.state.token
                        }
                    })
                    .then(user => {

                        resolve(user);
                    })
                    .catch(err => {
                        reject('failure reason');
                        console.log(err);
                    });
            });
        }
    }
});
