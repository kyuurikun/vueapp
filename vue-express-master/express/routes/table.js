var express = require('express');
var router = express.Router();
var db = require("../config/db");
const jwt = require('jsonwebtoken')
const token = require("../config/token")
var data={data:'',meta:{code:'200',message:''}}
/* GET users listing. */
// var meta={'code':'','message':'','date':''}
router.post('/addinfo', function(req, res, next) {
    let table = req.body;
    db.query("INSERT INTO `table` (`date`,`name`,`province`,`city`,`address`,`zip`) VALUES (?,?,?,?,?,?)",[table.date,table.name,table.province,table.city,table.address,table.zip],function(err,rows){
        data={data:'',meta:{code:'200',message:''}}
        res.send(data)
    });
    
});
router.get('/tablelist', function(req, res, next) {
    let query = req.query;
    let sql="SELECT * FROM `table`"
    if(query.user){
        sql+= "where name="+query.user
    }
    if(query.region){
        sql+= "where zip="+query.region
    }
    db.query(sql,[],function(err,rows){
        data={data:rows,meta:{code:'200',message:''}}
        res.send(data)
    })
    
});
router.post('/delinfo', function(req, res, next) {
    let row = req.body.rows;

    let sql="delete from  `table` where  id ="+row
    db.query(sql,[],function(err,rows){
        data={data:'',meta:{code:'200',message:''}}
        res.send(data)
    })
    
});
router.post('/upinfo', function(req, res, next) {
    let row = req.body;
    db.query("UPDATE `table` SET name='"+row.name+"',date='"+row.date+"',province='"+row.province+"',city='"+row.city+"',address='"+row.address+"',zip='"+row.zip+"' where `id`='"+row.id+"'",[],function(err,rows){
        data={data:'',meta:{code:'200',message:''}}
        res.send(data)
    });
    
});

// start from here
// const basePath = '/projectA'
router.get('/getProduct', (req, res, next) => {
    db.query('SELECT * FROM product', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            // let data = result.map(item => {
            //     return  {
            //         // 添加需要的字段
            //         productId: item.product_id
            //     }
            // })
            res.send({
                code: 600,
                data: result,
                msg: 'ok'
            })
        }
    })
})

router.get('/getUser', (req, res, next) => {
    db.query('SELECT * FROM user', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            // let data = result.map(item => {
            //     return  {
            //         // 添加需要的字段
            //         productId: item.product_id
            //     }
            // })
            res.send({
                code: 600,
                data: result,
                msg: 'ok'
            })
        }
    })
})

router.get('/getOrders', (req, res, next) => {
    db.query('SELECT * FROM orders', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            // let data = result.map(item => {
            //     return  {
            //         // 添加需要的字段
            //         productId: item.product_id
            //     }
            // })
            res.send({
                code: 600,
                data: result,
                msg: 'ok'
            })
        }
    })
})

router.post('/addProduct', (req, res, next) => {
    let data = req.body   
    db.query(`INSERT INTO product (product_id,category_id,product_name,product_img_url,product_price,product_num,product_detail) VALUES (null,'${data.value}','${data.name}','${data.img}','${data.price}','${data.num}','${data.detail}') `, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            // let data = result.map(item => {
            //     return  {
            //         // 添加需要的字段
            //         productId: item.product_id
            //     }
            // })
            if (result) {
                res.send({
                    code: 600,
                    data: null,
                    msg: '新增成功'
                })
            } else {
                res.send({
                    code: 601,
                    msg: '插入失败'
                })
            }
        }
    })
})

router.get('/delProduct', (req, res, err) => {
    //  let data = req.body
     let id = req.query.id
    //  return res.send(id)
     db.query(`DELETE FROM product where product_id = '${id}'`,(err,result) => {
         if (err) {
            console.log(err)
        } else {
            // let data = result.map(item => {
            //     return  {
            //         // 添加需要的字段
            //         productId: item.product_id
            //     }
            // })
            if (result) {
                res.send({
                    code: 600,
                    data: null,
                    msg: '删除成功'
                })
            } else {
                res.send({
                    code: 601,
                    msg: '删除失败'
                })
            }
        }
     })
})

router.get('/dealOrder', (req, res, err) => {
    //  let data = req.body
     let id = req.query.id
    //  return res.send(id)
     db.query(`UPDATE orders SET type = '已处理' where product_id = '${id}'`,(err,result) => {
         if (err) {
            console.log(err)
        } else {
            // let data = result.map(item => {
            //     return  {
            //         // 添加需要的字段
            //         productId: item.product_id
            //     }
            // })
            if (result) {
                res.send({
                    code: 600,
                    data: null,
                    msg: '修改成功'
                })
            } else {
                res.send({
                    code: 601,
                    msg: '修改失败'
                })
            }
        }
     })
})
module.exports = router;
