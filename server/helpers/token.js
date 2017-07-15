const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    adminOnly: function(req, res, next){
        let token = req.headers.token;
        if(token){
            let decode = jwt.verify(token, process.env.SECRETBANGET);
            //console.log('ini isi decode di adminonly---------', decode);
            if(decode.role === 'admin'){
                next();
            } else {
                res.send({
                    message: 'Anda tidak terdaftar sebagai admin, fitur ini terbatas'
                })
            }
        } else {
            res.send({
                message: 'Kamu harus Log In terlebih dahulu, atau mendaftar terlebih dahulu'
            })
        }
    },
    adminAndUser: function(req, res, next){
        let token = req.headers.token;
        if(token){
            let decode = jwt.verify(token, process.env.SECRETBANGET);
            //console.log('ini isi decode di admin and user-----------', decode);
            if(decode.role === 'admin' || decode.role === 'user'){
                next();
            } else {
                res.send({
                    message: 'Anda tidak terdaftar sebagai user, fitur ini terbatas'
                })
            }
        } else {
            res.send({
                message: 'Kamu harus Log In terlebih dahulu, atau mendaftar terlebih dahulu'
            })
        }
    }
}