const express = require('express');
const mysql = require('mysql');
const common = require('../libs/common'); 
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'baby'
});
module.exports = () => {
    const route = express.Router();
    const getHomeStr = `SELECT product_id,product_name,product_price,product_img_url,product_uprice FROM product`;
    const getCateNames = `SELECT * FROM category ORDER BY category_id desc`;
    //get homePage datas
    route.get('/home', (req, res) => {
        getHomeDatas(getHomeStr, res);
    });

    function getHomeDatas(getHomeStr, res) {
        db.query(getHomeStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    }

    route.get('/category', (req, res) => {
        getCateNamesDatas(getCateNames, res);
    });

    function getCateNamesDatas(getCateNames, res) {
        db.query(getCateNames, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    };
    route.get('/categorygoods', (req, res) => {
        let mId = req.query.mId;
        const sql = `select * from product,category where product.category_id=category.category_id and category.category_id='${mId}'`;
        getCateGoods(sql, res);
    });

    function getCateGoods(sql, res) {
        db.query(sql, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    }
    route.get('/detail', (req, res) => {
        let produId = req.query.mId;
        const imagesStr = `select image_url from product_image where product_id='${produId}'`;
        const productStr = `select * from product where product_id='${produId}'`;
        let detailDatas = [];
        db.query(imagesStr, (err, imgDatas) => {
            if (err) {
                console.error(err);
                res.status(500).send('database err').end();
            } else {
                detailDatas.push(imgDatas);
                db.query(productStr, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('database err').end();
                    } else {
                        detailDatas.push(data);
                        res.send(detailDatas);
                    }
                });
            }
        });

    });

    route.post('/addcar',(req,res) => {
        let mObj = {};
        for (let obj in req.body) {
            mObj = JSON.parse(obj);
        }
        let pId = mObj.pId;
        let uId = mObj.uId;
        let cId = mObj.cId;
        const AddToCar = `insert into goods_cart(cart_id,user_id,product_id) values('${cId}','${uId}','${pId}')`;
        const changenum = `update goods_cart set goods_num = goods_num + 1 where product_id = '${pId}'`;
        db.query(AddToCar, (err) => {
            if (err) {
                console.log(err);
                res.send({ 'msg': '服务器出错', 'status': 0 }).end();
            }else{
                db.query( changenum ,(err) =>{
                    if(err){
                        console.log(err);
                        res.send({'msg':'服务器出错','status': 0}).end();
                    }else{
                        res.send({ 'msg':'添加到购物车成功','status' : 10}).end();
                    }
                })
            }
        })
    });

    route.post('/addorders',(req,res) =>{
        let mObj = {};
        for (let obj in req.body) {
            mObj = JSON.parse(obj);
        }
        let uId = mObj.uid;
        let pId = mObj.pid;
        let cId = mObj.cid;
        let num = mObj.ocount;
        let price = mObj.price;
        let img = mObj.pic;
        let name = mObj.pname;
        const AddOrders = `INSERT INTO ORDERS(user_id,cart_id,product_id,ocount,price,product_img_url,product_name) values('${uId}','${pId}','${cId}','${num}','${price}','${img}','${name}')`; 
        db.query(AddOrders, (err) => {
            if (err) {
                console.log(err);
                res.send({ 'msg': '服务器出错', 'status': 0 }).end();
            }else{
                res.send({ 'msg': '下单成功','status': 1}).end();
            };
        })
    });


    route.post('/changenum',(req,res) =>{
        let mObj = {};
        for (let obj in req.body){
            mObj = JSON.parse(obj)
        }
        let num = mObj.number;
        let pId = mObj.pid;
        const changenum = `update goods_cart set goods_num = '${num}' where product_id = '${pId}'`;
        db.query(changenum,(err) =>{
            if(err){
                console.log(err);
                res.send({'msg':'服务器出错','status':0 }).end();
            }else{
                res.send({'msg':'修改成功','status':1}).end();
            }
        })
    })

    route.post('/delcart', (req,res) =>{
        let mObj = {};
        for (let obj in req.body){
            mObj = JSON.parse(obj)
        }
        let pid = mObj.pid
        const delStr = `DELETE FROM goods_cart WHERE product_id = '${pid}'`;
        db.query(delStr,(err) =>{
            if(err){
            console.log(err);
                res.send({'msg':'服务器出错','status': 0}).end();
            }else{
                res.send({ 'msg':'删除成功','status' : 25}).end();
            }
        })
    });

    route.get('/cart', (req, res) => {
        let uid = req.query.uId;
        const cartStr = `SELECT cart_id,user.user_id,product.product_id,product_name,product_uprice,product_img_url,goods_num,product_num,shop_name FROM product,user,goods_cart,shop where product.product_id=goods_cart.product_id and user.user_id = goods_cart.user_id and shop.shop_id = product.shop_id and goods_cart.user_id = '${uid}'`;
        const productimg = `SELECT image_url from product_image,goods_cart where product_image.product_id = goods_cart.product_id`;
        db.query(cartStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    db.query(productimg ,(err)=>{
                        if(err){
                            console.log(err);
                            res.send({'msg':'服务器出错','status':0}).end();
                        }else{
                            res.send(data);
                        }
                    })
                }
            }
        });
    })

    route.get('/orders',(req,res) =>{
        let uid = req.query.uId;
        const orderStr = `SELECT * FROM orders where user_id = '${uid}'`;
        db.query(orderStr ,(err,data) => {
            if (err){
                console.log(err);
                res.status(500),send('database err').end();
            }else{
                res.send(data);
            }
        })
    })

    route.get('/search', (req, res) => {
        let keyWord = req.query.kw;
        let hot = req.query.hot;
        let priceUp = req.query.priceUp;
        let priceDown = req.query.priceDown;
        const keywordStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%'`;
        const hotStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%' order by product_comment_num desc`;
        const priceUpStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%' order by product_uprice asc`;
        const priceDownStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%' order by product_uprice desc`;
        if (keyWord != '') {
            if (hot != '') {
                getSearchDatas(hotStr, res);
            } else if (priceUp != '') {
                getSearchDatas(priceUpStr, res);
            } else if (priceDown != '') {
                getSearchDatas(priceDownStr, res);
            } else {
                getSearchDatas(keywordStr, res);
            }
        }

    });
    /**
        get search datas
    */
    function getSearchDatas(keywordStr, res) {
        db.query(keywordStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    }
    /*
     *user reg func
     */
    route.post('/changepwd',(req,res) => {
        let mObj ={};
        for (let obj in req.body){
            mObj = JSON.parse(obj);
        }
        let userid = mObj.uId;
        let oldpwd = common.md5(mObj.opwd + common.MD5_SUFFXIE);;
        let newpwd = common.md5(mObj.npwd + common.MD5_SUFFXIE);;
    const checkuser = `SELECT * FROM user where user_id='${userid}'`;
    const upadatepwd = `UPDATE user SET login_password='${newpwd}' WHERE user_id='${userid}'`
    db.query(checkuser,(err,data) =>{
        if (err){
            console.log(err);
            res.send({'msg': '服务器出错','status': 0 }).end();
        }else {
            if(data.length == 0){
                res.send({'msg':'请先登录','staus':-1}).end();
            }else{
                let dataw = data[0];
                if (dataw.login_password !== oldpwd) { 
                res.send({ 'msg': '原密码不正确', 'status': -2 }).end();
                console.log(dataw);
                }else {
                    db.query(upadatepwd,(err) =>{
                        if(err){
                            console.log(err);
                            res.send({'msg':'修改失败','status':0}).end()
                        }else{
                            res.send({'msg':'修改成功','status':1})
                        }
                    })

                }
        }
    }
    });
    }),

    route.post('/paypwd',(req,res) => {
        let mObj ={};
        for (let obj in req.body){
            mObj = JSON.parse(obj);
        }
        let userid = mObj.uId;
        let paypwd = mObj.paypwd;
    const changepaypwd = `UPDATE user SET pay_password= '${paypwd}' WHERE user_id='${userid}'`
    db.query(changepaypwd,(err,data) =>{
        if(err){
            console.log(err);
            res.send({'msg':'服务器出错','status':0}).end();
        }else{
            res.send({'msg':'修改成功','status':1})
        }
    })
    }),
    route.post('/reg', (req, res) => {

        let mObj = {};
        for (let obj in req.body) {
            mObj = JSON.parse(obj);
        }
        let regName = mObj.regName;
        let regPasswd = mObj.regPasswd;
        regPasswd = common.md5(regPasswd + common.MD5_SUFFXIE);
        const checkuser =`SELECT * FROM user where user_name='${regName}'`;
        db.query(checkuser, (err,data)=> {
            if (err){
                console.log(err);
                res.send({'msg':'服务器出错', 'status': 0 }).end();
            }else{
                if (data.length != 0){
                    res.send({'msg': '该用户名已占用', 'status': -2 }).end()
                }else{
                    const insUserInfo = `INSERT INTO user(user_name,login_password,user_number) VALUES('${regName}','${regPasswd}','${regName}')`;
                    delReg(insUserInfo, res);
                }
            }
        })
        
    });
    /*
     *deal user register
     */
    function delReg(insUserInfo, res) {
        db.query(insUserInfo, (err) => {
            if (err) {
                console.error(err);
                res.send({ 'msg': '服务器出错', 'status': 0 }).end();
            } else {
                res.send({ 'msg': '注册成功', 'status': 1 }).end();
            }
        })
    };
    route.post('/login', (req, res) => {

        let mObj = {};
        for (let obj in req.body) {
            mObj = JSON.parse(obj);
            console.log(mObj);
        }
        let username = mObj.loginName;
        let password = common.md5(mObj.loginPawd + common.MD5_SUFFXIE);;
        // console.log(username, mObj.passwd);
        const selectUser = `SELECT * FROM user where user_name='${username}'`;
        db.query(selectUser, (err, data) => {
            if (err) {
                console.log(err);
                res.send({ 'msg': '服务器出错', 'status': 0 }).end();
            } else {
                if (data.length == 0) {
                    res.send({ 'msg': '该用户不存在', 'status': -1 }).end();
                } else {
                    let dataw = data[0];
                    //login sucess
                    if (dataw.login_password === password) {
                        //save the session 
                        req.session['user_id'] = dataw.user_id;
                        dataw.msg = "登录成功";
                        dataw.status = 1;
                        res.send(dataw).end();
                    } else {
                        res.send({ 'msg': '密码不正确', 'status': -2 }).end();
                    }
                }
            }
        });

    });
    route.get('/userinfo', (req, res) => {
        let uId = req.query.uId;
        const getU = `SELECT user_name,user_number FROM user where user_id='${uId}'`;
        db.query(getU, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data[0]);
                }
            }
        });
    });
    return route;
}