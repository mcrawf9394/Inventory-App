const umbrelladenom = require('../models/UmbrellaDenom')
const { body, validationResult } = require('express-validator')
const asyncHandler = require("express-async-handler")
exports.umbrelladenom_list = asyncHandler(async (req, res, next) => {
    const allUmbrellaDenom = await umbrelladenom.find().sort({ fullname: 1}).exec()
    res.render("umbrelladenom_list", {
        title: "Branches List",
        umbrelladenom_list: allUmbrellaDenom
    })
})