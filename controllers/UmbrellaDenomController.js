const umbrelladenom = require('../models/UmbrellaDenom')
const { body, validationResult } = require('express-validator')
const asyncHandler = require("express-async-handler")
const UmbrellaDenom = require('../models/UmbrellaDenom')
const Denomination = require('../models/Denomination')
exports.umbrelladenom_list = asyncHandler(async (req, res, next) => {
    const allUmbrellaDenom = await umbrelladenom.find().sort({ fullname: 1}).exec()
    res.render("umbrelladenom_list", {
        title: "Branches List",
        umbrelladenom_list: allUmbrellaDenom
    })
})
exports.umbrelladenom_detail = asyncHandler(async (req, res, next) => {
    const branchDetail = await umbrelladenom.findById(req.params.id).exec()
    res.render("umbrelladenom_detail", {
        title: branchDetail.name,
        summary: branchDetail.summary,
        id: req.params.id
    })
})
exports.umbrelladenom_add_get = asyncHandler(async (req, res, next) => {
    res.render("umbrelladenom_add_form", {
        title: "Add Branch"
    })
})
exports.umbrelladenom_add_post = [
    body("name", "Name of the branch is required")
        .trim()
        .isLength({min:1})
        .escape(),
    body("summary", "Summary of the branch is required")
        .trim()
        .isLength({min:1})
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render("umbrelladenom_add_form", {
                title: "Add Branch",
                errors: errors
            })
        } else {
            let newBranch = new UmbrellaDenom({
                name: req.body.name,
                summary: req.body.summary
            })
            await newBranch.save()
            res.redirect(newBranch.url)
        }
    })
]
exports.umbrelladenom_delete_get = asyncHandler(async (req, res, next) => {
    const [Umbrelladenom ,denomination] = await Promise.all([
        UmbrellaDenom.findById(req.params.id).exec(),
        Denomination.findOne({UmbrellaDenom: req.params.id}).exec()
    ])
    let usedIn = []
    if (denomination) {
        usedIn.push(denomination)
    }
    res.render('umbrelladenom_delete_form', {
        title: Umbrelladenom.name,
        summary: Umbrelladenom.summary,
        usedIn: usedIn,
        id: req.params.id
    })
})
exports.umbrelladenom_delete_post = asyncHandler(async (req, res, next) => {
    await UmbrellaDenom.findByIdAndDelete(req.body.branchId)
    res.redirect('/catalog/branch')
})
exports.umbrelladenom_update_get = asyncHandler(async (req, res, next) => {
    const currentBranch = await UmbrellaDenom.findById(req.params.id).exec()
    res.render('umbrelladenom_update_form', {
        title: `Update ${currentBranch.name}`,
        name: currentBranch.name,
        summary: currentBranch.summary
    })
})
exports.umbrelladenom_update_post = [
    body("name", "Name of the branch is required")
        .trim()
        .isLength({min:1})
        .escape(),
    body("summary", "Summary of the branch is required")
        .trim()
        .isLength({min:1})
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const currentBranch = await UmbrellaDenom.findById(req.params.id).exec()
            res.render('umbrelladenom_update_form', {
                title: `Update ${currentBranch.name}`,
                name: currentBranch.name,
                summary: currentBranch.summary,
                errors: errors.array()
            })
        } else {
            const newBranch = new UmbrellaDenom({
                name: req.body.name,
                summary: req.body.summary,
                _id: req.params.id
            })
            await UmbrellaDenom.findByIdAndUpdate(req.params.id, newBranch, {})
            res.redirect(`/catalog/branch/${req.params.id}`)
        }
    })
]