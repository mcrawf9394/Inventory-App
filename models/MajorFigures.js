const mongoose = require("mongoose")
const {DateTime} = require('luxon')
const Schema = mongoose.Schema
const MajorFiguresSchema = new Schema({
    first_name: {type: String, required: true, maxLength: 20},
    last_name: {type: String, required: true, maxLength: 20},
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
})
MajorFiguresSchema.virtual("name").get(function () {
    let fullname = ""
    if (this.first_name && this.last_name) {
        fullname = `${this.first_name} ${this.last_name}`
    }
    return fullname
})
MajorFiguresSchema.virtual("url").get(function () {
    return `/catalog/MajorFigures/${this._id}`
})
MajorFiguresSchema.virtual("BirthDate").get(function () {
    if (this.date_of_birth) {
        return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATETIME_MED)
    } else {
        return ''
    }
})
MajorFiguresSchema.virtual("DeathDate").get(function () {
    if (this.date_of_death) {
        return DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATETIME_MED)
    } else {
        return ''
    }
})
module.exports = mongoose.model("MajorFigures", MajorFiguresSchema)