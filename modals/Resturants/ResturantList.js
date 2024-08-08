const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImageSchema = new Schema({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  src: { type: String, required: true }
});

const LocaleSchema = new Schema({
  name: { type: String, required: true },
  short_name: { type: String, required: true },
  description: { type: String, required: true },
  subtitle: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: true },
  suburb: { type: String, required: true },
  city: { type: String, required: true },
  postcode: { type: String, required: true },
  country: { type: String, required: true }
});

const CategoryLocalesSchema = new Schema({
  en: { type: LocaleSchema, required: true },
  th: { type: LocaleSchema, required: true }
});

const CategorySchema = new Schema({
  id: { type: Number, required: true },
  locales: { type: CategoryLocalesSchema, required: true }
});

const VendorLocalesSchema = new Schema({
  en: { type: LocaleSchema, required: true },
  ar: { type: LocaleSchema, required: true }
});

const OpeningHourSlotsSchema = new Schema({
  m: { type: [[Number]], default: [[]] },
  tu: { type: [[Number]], default: [[]] },
  w: { type: [[Number]], default: [[]] },
  th: { type: [[Number]], default: [[]] },
  f: { type: [[Number]], default: [[]] },
  sa: { type: [[Number]], default: [[]] },
  su: { type: [[Number]], default: [[]] }
});

const ResturantSchema = new Schema({
  id: { type: Number, required: true },
  brand_id: { type: Number, required: true },
  code: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  minimum_order: { type: Number, required: true },
  opening_hour_slots: { type: OpeningHourSlotsSchema, required: true },
  logo_images: { type: [ImageSchema], required: true },
  banner_images: { type: [ImageSchema], required: true },
  categories: { type: [CategorySchema], required: true },
  locales: { type: VendorLocalesSchema, required: true },
  is_realtime_enabled: { type: Boolean, required: true },
  is_scheduled_enabled: { type: Boolean, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true }
});

module.exports = mongoose.model('Resturants', ResturantSchema);
