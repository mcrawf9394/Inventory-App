const majorfigures = require('../models/MajorFigures')
const { body, validationResult } = require('express-validator')
const asyncHandler = require("express-async-handler")
exports.majorfigures_list = asyncHandler(async (req, res, next) => {
    const allMajorFigures = await majorfigures.find().sort({ fullname: 1}).exec()
    res.render("majorfigures_list", {
        title: "Major Figures List",
        majorfigures_list: allMajorFigures
    })
})
exports.majorfigures_detail = asyncHandler(async (req, res, next) => {
    const Majorfigure = await majorfigures.findById(req.params.id).exec()
    res.render("majorfigures_detail", {
        title: Majorfigure.name,
        dob: Majorfigure.BirthDate,
        dod: Majorfigure.DeathDate
    })
})