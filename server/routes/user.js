const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secret = "secert";
const User = require("../models/user");
const Transactions = require("../models/transactions");
const bcrypt = require("bcrypt-nodejs");

const maxBalance = 2000;

function auth(req, res, next) {
    console.log(req.headers["authorization"]);
    const token = req.headers["authorization"];
    if (typeof token !== "undefined" || !req.headers["authorization"]) {
        // const bearer = token.split(' ');
        // const bearerToken = bearer[1];
        req.token = token;
        next();
    } else {
        res.status(401).send("Invalid email or password");
    }
}

function createToken(email) {
    const token = jwt.sign({
            userID: email
        },
        secret
    );
    return token;
}

//==========================================
//Create/Register a user
// Передаём {username, password, email}

router.post("/users", (req, res) => {
    console.log(req.body);
    if (req.body.username && req.body.email && req.body.password) {
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    return res.status(400).send("A user with that email already exists");
                } else {
                    bcrypt.hash(req.body.password, null, null, (err, hash) => {
                        User.create({
                                username: req.body.username,
                                email: req.body.email,
                                password: hash
                            })
                            .then(newUser => {
                                res.send({
                                    token_id: createToken(req.body.email)
                                });
                            })
                            .catch(err => {});
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        res.status(400).send("You must send username and password");
    }
});

//======================================================
// Login

router.post("/sessions/create", async (req, res) => {
    if (!req.body.email && !req.body.password) {
        res.status(400).send("You must send email and password");
    } else {
        console.log(req.body);
        User.findOne({
                email: req.body.email
            })
            .then(_user => {
                if (!_user) {
                    res.status(401).send("Invalid email or password");
                } else {
                    bcrypt.compare(req.body.password, _user.password, (err, result) => {
                        if (!result) {
                            res.status(401).send("Invalid email or password");
                        } else {
                            res.send({
                                token_id: createToken(req.body.email)
                            });
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
});

//======================================================
// List of logged user transactions
// Получает из токена пользователя, по ид пользователя ищет все записи этого пользователя в таблице Transactions

router.get("/api/protected/transactions", auth, (req, res) => {
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            // Авторизация не прошла
            res.status(401).send("UnauthorizedError");
        } else {
            User.findOne({
                    email: authData.userID
                })
                .then(_user => {
                    Transactions.find({
                            user: _user._id
                        })
                        .select("amount createdAt balance name category")
                        .then(trans_token => {
                            res.send({
                                trans_token
                            });
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    });
});

//============================================================
//Create a transaction
//Sender: logged user
// {name, amount}
// находит по токену пользоватяля в таблице User, создаёт запись в таблице Transactions с привязкой к id полученного пользователя из токена.

router.post("/api/protected/transactions", auth, (req, res) => {
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            // Авторизация не прошла
            res.status(401).send("UnauthorizedError");
        } else {
            User.findOne({
                    email: authData.userID
                })
                .then(_user => {
                    console.log(_user.balance, req.body.amount);
                    if (parseInt(_user.balance) < maxBalance) {


                        Transactions.create({
                                name: req.body.name,
                                amount: req.body.amount,
                                user: _user._id,
                                category: req.body.category || null
                            })
                            .then(transition => {
                                _user.balance =
                                    parseInt(req.body.amount) + parseInt(_user.balance);
                                console.log(_user.balance);
                                _user
                                    .save()
                                    .then(s => {
                                        console.log(transition);
                                        res.send({
                                            trans_token: {
                                                id: transition._id,
                                                amount: transition.amount,
                                                date: transition.createdAt,
                                                name: transition.name
                                            }
                                        });
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    } else {
                        res.status(400).send("balance exceeded");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    });
});

//======================================================================================
// Logged user info
// Проверят есть ли токет, по токету ищет пользователя в таблице User, и возвращает объект с в B username найденного пользователя

router.get("/api/protected/user-info", auth, async (req, res) => {
    const user = await jwt.verify(req.token, secret);
    if (user) {
        const data = await User.findOne({
            email: user.userID
        });
        if (data) {
            res.send({
                id: data._id,
                name: data.username,
                balance: data.balance
            });
        } else {
            res.status(400).send("user not found");
        }
    } else {
        res.status(401).send("UnauthorizedError");
    }
});

//======================================================================================
// Filtered User list
// Фильтр принимат объект со сторокой, для поиска по таблице User и возращает найденного пользователей или сообщение что такого пользователя нет.
router.post("/api/protected/users/list", auth, async (req, res) => {
    const user = await jwt.verify(req.token, secret);
    console.log(req.body.filter);
    if (user) {
        if (!req.body.filter) {
            res.status(401).send("No search string");
        } else {
            const data = await User.find({
                    username: {
                        $regex: req.body.filter,
                        $options: "i"
                    }
                })
                .limit(5)
                .select("username id");
            console.log(data);
            if (!data) {
                res.status(401).send("Invalid user");
            } else {
                res.send({
                    data
                });
            }
        }
    } else {
        res.status(401).send("UnauthorizedError");
    }
});

//======================================================================================
// Filtered Transactions list
// Фильтр принимат объект со сторокой, для поиска по таблице User и возращает найденного пользователей или сообщение что такого пользователя нет.
router.post("/api/protected/transactions/list", auth, async (req, res) => {
    const user = await jwt.verify(req.token, secret);
    console.log(req.body.filter);
    if (user) {
        if (!req.body.filter) {
            res.status(401).send("No search string");
        } else {
            const data = await Transactions.find({
                    name: {
                        $regex: req.body.filter,
                        $options: "i"
                    }
                })
                .limit(5)

            console.log(data);
            if (!data) {
                res.status(401).send("Invalid user");
            } else {
                res.send({
                    data
                });
            }
        }
    } else {
        res.status(401).send("UnauthorizedError");
    }
});


//======================================================================================
// api/remove-item
// Принимает Id записи в таблице и удаляет

router.post("/api/remove-item", auth, async (req, res) => {
    const user = await jwt.verify(req.token, secret);
    //console.log(req.body.id);
    if (user) {
        if (!req.body.id) {
            res.status(401).send("No id to remove");
        } else {
            const data = await Transactions.deleteOne({
                _id: req.body.id
            });
            if (data) {
                res.send({
                    message: 'item delited'
                });
            } else {
                res.status(401).send("Item not delited");
            }

        }
    } else {
        res.status(401).send("UnauthorizedError");
    }
});

module.exports = router;