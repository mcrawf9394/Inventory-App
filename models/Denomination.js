const mongoose = require("mongoose")
const Schema = mongoose.Schema
const DenominationSchema = new Schema ({
    name: { type: String, required: true},
    MajorFigures: { type: Schema.Types.ObjectId, ref: "MajorFigures", required: true},
    Summary: { type: String, required: true},
    UmbrellaDenom: { type: Schema.Types.ObjectId, ref: "UmbrellaDenom", required: true}
})
DenominationSchema.virtual("url").get(function () {
    return `/catalog/denomination/${this._id}`
})
module.exports = mongoose.model("Denomination", DenominationSchema)