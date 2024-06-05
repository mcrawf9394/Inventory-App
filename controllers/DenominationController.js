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
exports.denomination_detail = asyncHandler(async (req, res, next) => {
    const [denomination] = await Promise.all([
        Denomination.findById(req.params.id).exec()
    ])
    const [majorfigure, umbrelladenom] = await Promise.all([
        MajorFigures.findById(denomination.MajorFigures),
        UmbrellaDenom.findById(denomination.UmbrellaDenom)
    ])
    res.render("denomination_detail", {
        title: denomination.name,
        summary: denomination.Summary,
        MajorFigure: majorfigure.name,
        branch: umbrelladenom.name
    }) 
})
exports.denomination_add_get = asyncHandler(async (req, res, next) => {
    const [allMajorFigures, allUmbrellaDenoms] = await Promise.all([
        MajorFigures.find().sort({last_name: 1}).exec(),
        UmbrellaDenom.find().sort({name: 1}).exec()
    ])
    res.render("denomination_add_form", {
        title: "Add Denomination",
        majorfigures: allMajorFigures,
        umbrelladenoms: allUmbrellaDenoms
    }) 
})
exports.denomination_add_post = [
    body("name", "Must provide a name")
        .trim()
        .isLength({min:1})
        .escape(),
    body("majorfigures", "Must have a Major Figure")
        .trim()
        .isLength({min:1})
        .escape(),
    body("Summary", "Must Provide a summary")
        .trim()
        .isLength({min:1})
        .escape(),
    body("UmbrellaDenom", "Must provide a branch")
        .trim()
        .isLength({min:1})
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        const newDenom = new Denomination({
            name: req.body.name,
            MajorFigures: req.body.majorfigures,
            Summary: req.body.Summary,
            UmbrellaDenom: req.body.UmbrellaDenom
        })
        if (!errors.isEmpty()) {
            const [allMajorFigures, allUmbrellaDenoms] = await Promise.all([
                MajorFigures.find().sort({last_name: 1}).exec(),
                UmbrellaDenom.find().sort({name: 1}).exec()
            ])
            res.render("denomination_add_form", {
                title: "Add Denomination",
                majorfigures: allMajorFigures,
                umbrelladenoms: allUmbrellaDenoms,
                errors: errors.array()
            }) 
        } else {
            await newDenom.save()
            res.redirect(newDenom.url)
        }
    })
]