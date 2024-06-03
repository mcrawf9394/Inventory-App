const Denomination = require('../models/Denomination')
const { body, validationResult } = require('express-validator')
const asyncHandler = require("express-async-handler")
const MajorFigures = require('../models/MajorFigures')
const UmbrellaDenom = require('../models/UmbrellaDenom')
exports.denomination_list = asyncHandler(async (req, res, next) => {
    const allDenomination = await Denomination.find().sort({ name: 1}).exec()
    res.render("denomination_list", {
        title: "Denomination List",
        denomination_list: allDenomination
    })
})