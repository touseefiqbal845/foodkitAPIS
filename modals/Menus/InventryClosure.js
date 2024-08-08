const mongoose = require('mongoose');
const { Schema } = mongoose;

const HiddenSchema = new Schema({
  hidden: [{ type: Number, required: true }],
});

const OutOfStockSchema = new Schema({
  out_of_stock: [{ type: Number, required: true }],
});

const OutOfStockExtraItemsSchema = new Schema({
  out_of_stock_extra_items: [{ type: Number, required: true }],
});

const InventryClosureSchema = new Schema({
  hidden: { type: HiddenSchema, required: true },
  out_of_stock: { type: OutOfStockSchema, required: true },
  out_of_stock_extra_items: { type: OutOfStockExtraItemsSchema, required: true },
});

module.exports = mongoose.model('InventryClosure', InventryClosureSchema);
