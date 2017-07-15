const Item = require('../models/items');
var model = {};

model.showAllItems = function(req, res){
    Item.find({}, (err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Tidak bisa mendapatkan data, ada yang salah dengan database',
                error: err
            })
        } else {
            res.status(200)
            .send(result)
        }
    })
}

model.showOneItem = function(req, res){
    let id = req.params.id;
    Item.findById(id, (err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Tidak bisa mendapatkan data, ada yang salah dengan database',
                error: err
            })
        } else {
            res.status(200)
            .send(result)
        }
    })
}

model.searchAllCategory = function(req, res){
    let name = req.params.search;
    Item.find({
        name: new RegExp(name, 'i')
    }, (err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Tidak bisa mendapatkan data, ada yang salah dengan database',
                error: err
            })
        } else {
            if(!result){
                res.status(200)
                .send({
                    message: 'Product tidak ditemukan, silahkan periksa katakunci dan masukkan dengan benar',
                    data: result
                })
            } else {
                res.status(200).send(result);
            }
        }
    })
}

model.searchByCategory = function(req, res){
    let category = req.params.category;
    Item.find({
        category: new RegExp(category)
    }, (err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Tidak bisa mendapatkan data, ada yang salah dengan database',
                error: err
            })
        } else {
            if(!result){
                res.status(200)
                .send({
                    message: 'Product tidak ditemukan dalam category, silahkan periksa katakunci dan masukkan dengan benar',
                    data: result
                })
            } else {
                res.status(200).send(result);
            }
        }
    })
}

model.createNewItem = function(req, res){
    let data = req.body
    Item.create({
        name: data.name,
        price: data.price,
        category: data.category,
        stock: data.stock,
        pict: data.pict || 'https://openclipart.org/image/800px/svg_to_png/215820/Smiling-Penguin.png',
        procesor: data.processor,
        camera: data.camera,
        waranti: data.waranti,
        description: data.description || 'No description',
        available: data.available || true,
        promotion: data.promotion || 0
    }, (err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Tidak bisa memasukkan data, ada yang salah dengan database',
                error: err
            })
        } else {
            res.status(200)
            .send(result)
        }
    })
}

model.removeOneItem = function(req, res){
    let id = req.params.id
    Item.findByIdAndRemove(id, (err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Tidak bisa menghapus data, ada yang salah dengan database',
                error: err
            })
        } else {
            res.status(200)
            .send({
                message: `Product ${result.name} berhasil di hapus dari daftar`,
                data: result
            })
        }
    })
}

model.updateOneItem = function(req, res){
    let id = req.params.id;
    let body = req.body;
    Item.findById(id, (err, data)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Tidak bisa merubah data, ada yang salah dengan database',
                error: err
            })
        } else {
            console.log('ini adlah item di method update', data);
            data.name = body.name || data.name;
            data.price = body.price || data.price;
            data.category = body.category || data.category;
            data.stock = body.stock || data.stock;
            data.pict = body.pict || data.pict;
            data.processor = body.processor || data.processor;
            data.camera = body.camera || data.camera;
            data.waranti = body.waranti || data.waranti;
            data.description = body.description || data.description;
            data.available = body.available || data.available;
            data.promotion = body.promotion || data.promotion;

            data.save((err, result)=>{
                if(err){
                    res.status(400)
                    .send({
                        message: 'Tidak bisa merubah data, ada yang salah dengan database',
                        error: err
                    })
                } else {
                    res.status(200)
                    .send({
                        message: `data ${result.name} berhasil terupdate!`,
                        data: result
                    })
                }
            })
        }
    })
}

model.showByKeyword = function(req, res){
    let search = req.params.search;
    Item.find({
        name: new RegExp(search, "i")
    }, (err, result)=>{
        if(err){
            res.status(500).send({
                msg: 'Error on Database',
                error: err
            })
        } else {
            res.send(result)
            }
        }
    )
}

model.showByCategory = function(req, res){
    let search = req.params.search;
    Item.find({
        category: new RegExp(search, "i")
    }, (err, result)=>{
        if(err){
            res.status(500).send({
                msg: 'Error on Database',
                error: err
            })
        } else {
            res.send(result)
            }
        }
    )
}

module.exports = model;