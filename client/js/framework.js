var app = new Vue({
    el: '#app',
    data: {
        items: [],
        itemDetail: {},
        cartCount: 0,
        discountPrice: 0,
        searchItem: '',
        cartItems: [],
        totalPayment: 0,
        updateTotalItem: 0,
        cartItemDetail: {}
    },
    methods: {
        //--------------JQuery----------------------------------------
        goSideBar () {
            $('#toggle').click(function(){
                $('.ui.sidebar')
                .sidebar('setting', 'transition', 'slide out')
                .sidebar('toggle');
            });
        },
        goDimmerEffect () {
            $('.special.cards .image').dimmer({
                on: 'hover'
            });
        },
        goCartModalShow: function(){
            $('#cart-modal')
            .modal('setting', 'transition', 'vertical flip')
                .modal('show')
            ;
        },
        goCartModalDetailShow: function(){
            $('#cart-detail-modal')
            .modal('setting', 'transition', 'vertical flip')
                .modal('show')
            ;
        },
        goSideCard (index) {
            $(`#shape-${index}`)
            .shape('flip up')
        },
        goDetailProductModal (item){
            let self = this;
            console.log('ini itemDetail -----------', self.itemDetail);
            self.itemDetail = item
            $('#modal-detail-product')
            .modal('setting', 'transition', 'scale')
                .modal('show')
            ;
            self.getDiscount();
        },
        getCartCounter () {
            this.cartCount = this.cartItems.length;
        },
        getTotalPayment () {
            let self = this;
            self.cartItems.forEach(function(item){
                self.totalPayment =+ item.total_price;
            })
        },
        //----------axios and javasript methods----------------------------
        getAllItems () {
            let self = this;
            axios.get('http://localhost:3000/api/item')
            .then((responses)=>{
                console.log(responses);
                self.items = responses.data
            })
            .catch((err)=>{
                console.log(err)
                alert("error on database!")
            })
        },
        getDiscount () {
            this.discountPrice = this.itemDetail.price - (this.itemDetail.price*this.itemDetail.promotion);
        },
        showByCategory (category) {
            let self = this;
            axios.get('http://localhost:3000/api/item/category/'+category)
            .then((responses)=>{
                console.log(responses);
                self.items = responses.data
            })
            .catch((err)=>{
                console.log(err)
                alert("error on database!")
            })
        },
        showSearchItem: function(){
            let self = this;
            if (self.searchItem === '') {
                self.getAllItems()
            } else {
                axios.get(`http://localhost:3000/api/item/search/${self.searchItem}`)
                .then((response)=>{
                console.log(response);
                self.items = response.data
                })
                .catch((err)=>{
                console.log(err);
                })
            }
        },
        pushToCartUpToDate (id) {
            self.cartItems.forEach((item)=>{
                if(item.id === id){
                    item.total_item += updateTotalItem;
                    item.total_price += ((updateTotalItem * item.price)*item.discount);
                }
            })
        },
        cartTemporaryItems (id) {
            let self = this;
            let nowDate = new Date();
            let idCheck = [];
            self.cartItems.forEach((item)=>{
                    if(item.id === id){
                        idCheck.push(item)
                        // item.total_item += updateTotalItem;
                        // item.total_price += ((updateTotalItem * item.price)*item.discount);
                        // self.cartItemDetail = item
                    }
                })
            if(idCheck.length !== 0){
                console.log('---------------------------------------');
                self.cartItemDetail = idCheck[0];
                self.goCartModalDetailShow();
            } else {
                console.log('*****************************************')
                axios.get('http://localhost:3000/api/item/'+id)
                    .then((response)=>{
                        if(response.data.hasOwnProperty('error')){
                            alert(response.data.message);
                        } else {
                            let itemTotal = 1;
                            let discount = response.data.promotion;
                            self.cartItems.push({
                                id: response.data._id,
                                name: response.data.name,
                                price: response.data.price,
                                category: response.data.category,
                                waranti: response.data.waranti,
                                discount: response.data.promotion,
                                pict: response.data.pict,
                                total_item: itemTotal,
                                total_price: (response.data.price * discount) * itemTotal,
                                date:  `${nowDate.getDate()} / ${nowDate.getMonth()} / ${nowDate.getFullYear()}`
                            });
                        }
                        console.log('ini cartItems', self.cartItems)
                        self.getCartCounter();
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            }
        },
        getEmptyCart () {
            let self = this;
            self.cartItems.splice(0, cartCount);
            self.cartCount = 0;
        }
    },
    created () {
        this.getAllItems();
        this.getCartCounter();
    }
})

/*

axios.get('http://localhost:3000/api/item'+id)
                    .then((response)=>{
                        if(response.data.hasOwnProperty('error')){
                            alert(response.data.message);
                        } else {
                            let itemTotal = 1;
                            let discount = response.data.promotion;
                            self.cartItems.push({
                                name: respanse.data.name,
                                price: response.data.price,
                                category: response.data.category,
                                waranti: response.data.waranti,
                                pict: response.data.pict,
                                total_item: itemTotal,
                                total_price: (response.data.price * discount) * item,
                                date:  `${nowDate.getDate()} / ${nowDate.getMonth()} / ${nowDate.getFullYear()}`
                            });
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                    })

*/