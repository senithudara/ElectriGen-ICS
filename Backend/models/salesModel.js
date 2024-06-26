const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const salesSchema = new Schema({
    billID : {
        type: String,
        required:true,
        unique:true
    },
    
    bdate : {
        type: String,
    },

    items : [{
        ino:String,
        desc:String,
        qty:Number,
        price:Number,
        iamount:Number
    }],

    tot : {
        type:Number,
        default:0
    },

    totqty : {
        type:Number,
        default:0
    }

})

const Sales = mongoose.model("Sales",salesSchema);

module.exports = Sales;
