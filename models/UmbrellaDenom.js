const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UmbrellaDenomSchema = new Schema ({
    name: { type: String, require: true},
    summary: { type: String, require: true}
})
UmbrellaDenomSchema.virtual("url").get(function () {
    return `/catalog/branch/${this._id}`
})
module.exports = mongoose.model('UmbrellaDenom', UmbrellaDenomSchema)