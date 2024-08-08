const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    w: { type: Number, required: true },
    h: { type: Number, required: true },
    src: { type: String, required: true },
  },
  { timestamps: true }
);

const localesSchema = new Schema(
  {
    en: { name: { type: String, required: true } },
    th: { name: { type: String, required: true } },
  },
  { timestamps: true }
);

const itemsSchema = new Schema(
  {
    brand_id: { type: Number, required: true },
    category_id: { type: Number, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    before_sale_price: { type: Number, required: true },
    has_comments: { type: Boolean, required: true },
    extra_ids: [{ type: Number, required: true }],
    images: { type: [imageSchema], required: true },
    tag_ids: [{ type: Number, required: true }],
    visible: [{ type: String, required: true }],
    combo: { type: Boolean, required: true, default: false },
    combo_only: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const categoriesSchema = new Schema(
  {
    brand_id: { type: Number, required: true },
    category_image_src: { type: String, required: true },
  },
  { timestamps: true }
);

const extrasSchema = new Schema(
  {
    mix: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  { timestamps: true }
);

const extrasItemsSchema = new Schema(
  {
    extra_id: { type: Number, required: true },
    code: { type: String, required: true },
    order: { type: Number, required: true },
    is_default: { type: Boolean, required: true },
    price: { type: Number, required: true },
    image_src: { type: String, required: true },
    locales: { type: localesSchema, required: true },
  },
  { timestamps: true }
);

const tagsSchema = new Schema({}, { timestamps: true });

const comboGroupsItemsSchema = new Schema(
  {
    combo_group_id: { type: Number, required: true },
    custom_price: { type: Number, required: true },
    product_id: { type: Number, required: true },
  },
  { timestamps: true }
);

const comboGroupsSchema = new Schema(
  {
    product_id: { type: Number, required: true },
    fixed_price: { type: Number, required: true },
    add_modifier_price: { type: Number, required: true },
    pricing_strategy: { type: Number, required: true },
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    items: { type: [comboGroupsItemsSchema], required: true },
  },
  { timestamps: true }
);

const MenuSchema = new Schema(
  {
    items: { type: [itemsSchema], required: true },
    categories: { type: [categoriesSchema], required: true },
    extras: { type: [extrasSchema], required: true },
    extras_items: { type: [extrasItemsSchema], required: true },
    tags: { type: [tagsSchema], required: true },
    combo_groups: { type: [comboGroupsSchema], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", MenuSchema);
