# xiao-mifans-ecommers
### Website kecil untuk project e-commers

project ini berhubungan dengan project di hacktiv8 tentang membangun website e-commers dengan back-end process sampai front-end menggunakan `VueJS`

>**NodeJs** dan **NPM** diperlukan dalam menjalankan file ini.
>**VueJs** dan **Axios Ajax** juga diperlukan dalam menjalankan app dibagian client side. Serta menggunakan `Semantic UI`

### Cara untuk menjalankan app
Ini adalah cara menjalankannya:

* NPM install
* NPM start
    * `$ npm install`
    * `$ npm start`

Sedangkan untuk menjalankan client side:

* Live Server
    * `$ live-server`

*`$ live-server`* adalah sebuah paket yang dibawa oleh npm package. cara install-nya membutuhkan permition `sudo`

    `$ sudo npm install -g live-server`

## Table untuk back-end

Ingat selalu gunakan `http://localhost:3000`

#### * Tabel User (Users model)

| Nama routes | Methods | Kegunaan |
|:-------------|:---------:|:----------|
| /api/user/signup | POST | untuk mendaftar user baru |
| /api/user/signin | POST | untuk masuk ke dalam website |
| /api/user/ | GET | untuk menampilkan seluruh user |
| /api/user/:id | GET | untuk mendapatkan 1 user |

#### * Tabel Item (Items model)

| Nama routes | Methods | Kegunaan |
|:-------------|:---------:|:----------|
| /api/item/ | GET | untuk mendapatkan semua Item |
| /api/item/:id | GET | untuk mendapatkan 1 Item dengan parameter ID |
| /api/item/ | POST | untuk membuat item baru |
| /api/item/:id | PUT | untuk meng-update item dengan parameter ID |
| /api/item/:id | DELETE | untuk menghapus item dari daftar product |

#### * Tabel Transaction (Transactions model)

| Nama routes | Methods | Kegunaan |
|:-------------|:---------:|:----------|
| /api/transaction/ | GET | untuk mendapatkan semua transaksi |
| /api/transaction/:id | GET | untuk mendapatkan 1 transaksi dengan parameter ID |
| /api/transaction/ | POST | untuk membuat transaksi baru |
| /api/transaction/:id | PUT | untuk meng-update transaksi dengan parameter ID |
| /api/transaction/:id | DELETE | untuk menghapus transaksi dari daftar |





