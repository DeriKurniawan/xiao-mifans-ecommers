const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
var model = {};

model.signup = function(req, res){
    let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    let body = req.body;
    User.create({
        name: body.name,
        password: password,
        username: body.username,
        email: body.email,
        address: body.address,
        nationality: body.nationality,
        zipcode: body.zipcode,
        role: body.role || 'user',
        gender: body.gender,
        pict: body.pict || 'https://semantic-ui.com/images/avatar/large/elliot.jpg' 
    }, (err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Ada kesalahan dalam database, data anda harus unik atau data sudah pernah dimasukkan',
                error: err
            })
        } else {
            res.status(200)
            .send({
                message: 'Berhasil ditambahkan',
                data: result
            })
        }
    })
}

model.signin = function(req, res){
    let body = req.body
    User.findOne({
        username: body.username
    }, (err, data)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Ada kesalahan dalam database, data anda harus benar!',
                error: err
            })
        } else {
            //console.log("ini result", result);
            if(!data){
                res.send({
                    message: 'Anda belum terdaftar!, atau username yang anda masukan salah'
                })
            } else if(bcrypt.compareSync(body.password, data.password)){
                let token = jwt.sign({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    address: data.address,
                    nationality: data.nationality,
                    gender: data.gender,
                    pict: data.pict,
                    role: data.role,
                    zipcode: data.zipcode
                }, process.env.SECRETBANGET, {expiresIn: '2d'});
                res.status(200)
                .send({
                    msg: 'Log in sukses!',
                    data: token
                })
            } else {
                res.send({
                    message: "paswword yang anda masukan salah!"
                })
            }
        }
    })
}

model.getAllUser = function(req, res){
    User.find({}, (err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'terjadi kesalahan database, tidak bisa memuat data user',
                error: err
            })
        } else {
            res.status(200)
            .send({
                msg: 'Berhasil mendapatkan data user',
                data: result
            })
        }
    })
}

model.getOneUser = function(req, res){
    User.findOne({
        username: req.params.username
    }, (err, result)=>{
       if(err){
            res.status(400)
            .send({
                message: 'terjadi kesalahan database, tidak bisa memuat data user',
                error: err
            })
        } else {
            res.status(200)
            .send({
                msg: 'Berhasil mendapatkan data user',
                data: result
            })
        } 
    })
}

model.updateUserData = function(req, res){
    let body = req.body
    User.findById(req.params.id, (err, data)=>{
        if(err){
            res.status(400)
            .send({
                message: 'terjadi kesalahan database, tidak bisa memuat data user',
                error: err
            })
        } else {
            data.name = body.name || data.name;
            data.password = data.password;
            data.username = body.username || data.username;
            data.email = body.email || data.email;
            data.address = body.address || data.address;
            data.zipcode = body.zipcode || data.zipcode;
            data.nationality = body.nationality || data.nationality;
            data.role = body.role || data.role;
            data.pict = body.pict || data.pict;
            data.gender = body.gender || data.gender;

            data.save((err, result)=>{
                 if(err){
                    res.status(400)
                    .send({
                        message: 'Ada kesalahan dalam database, data anda harus unik atau data sudah pernah dimasukkan',
                        error: err
                    })
                } else {
                    res.status(200)
                    .send({
                        message: 'Data berhasil diubah!',
                        data: result
                    });
                }
            })
        }
    })
}

model.removeOneUser = function(req, res){
    User.findByIdAndRemove(req.params.id, (err, result)=>{
            if(err){
                res.status(400)
                .send({
                    message: 'Ada kesalahan dalam database, tidak bisa menghapus data',
                    error: err
                })
            } else {
                res.status(200)
                .send({
                    message: 'Data berhasil dihapus!',
                    data: result
                });
            }
    })
}

module.exports = model;