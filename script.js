'use strict';
const{createApp} = Vue;
createApp({
    data(){
        return {
            items: [],
            exchangerates: {
                USD: 1,
                EUR: 0.85,
                RUB: 0.92,
            },
            placeholder1: 'Введите сумму',
            fromrate: 1,
            torate: 1,
            rates : ['USD', 'EUR', 'RUB'],
            valuetoconvert: null,
            result: null,
            history: JSON.parse(localStorage.getItem('conversion')),

        }
    },
    methods: {
        convert(){
            let fromrate_ = this.exchangerates[this.rates[this.fromrate - 1]];
            let torate_ = this.exchangerates[this.rates[this.torate - 1]];
            this.result = (this.valuetoconvert * fromrate_ / torate_).toFixed(2);  
            this.save();
            
        },
        

    },
    computed: {
        save(){
            try{
               let cool = JSON.parse(localStorage.getItem('conversion'));
                cool.push({
                    valuetoconvert: this.valuetoconvert,
                    result: this.result,
                    fromrate: this.rates[this.fromrate - 1],
                    torate: this.rates[this.torate - 1],
                });
                localStorage.setItem('conversion', JSON.stringify(cool));
            }catch(e){
                this.items.push({
                    valuetoconvert: this.valuetoconvert,
                    result: this.result,
                    fromrate: this.rates[this.fromrate - 1],
                    torate: this.rates[this.torate - 1],
                });
                localStorage.setItem('conversion', JSON.stringify(this.items));
            }
        }
        
    },
    watch: {
        result(newval, oldval){
            this.save();
            console.log('Данные были сохранены');
        }
    }
}).mount('#app');