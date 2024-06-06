const majorfigures = require('../models/MajorFigures')
const { body, validationResult } = require('express-validator')
const asyncHandler = require("express-async-handler")
const MajorFigures = require('../models/MajorFigures')
const Denomination = require('../models/Denomination')
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
        dod: Majorfigure.DeathDate,
        id: req.params.id
    })
})
exports.majorfigures_add_get = asyncHandler(async (req, res, next) => {
    res.render("majorfigures_add_form", {
        title: "Add Major Figure"
    })
})
exports.majorfigures_add_post = [
    body("first_name", "Must provide a first name")
        .trim()
        .isLength({min: 1})
        .escape(),
    body("last_name", "Must provide a last name")
        .trim()
        .isLength({min:1})
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.render('majorfigures_add_form', {
                title: "Add Major Figure",
                errors: errors.array() 
            })
        } else {
            const newMajorFigure = new MajorFigures({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death
            })
            await newMajorFigure.save()
            res.redirect(newMajorFigure.url)
        }
    })
]
exports.majorfigures_delete_get = asyncHandler(async (req, res, next) => {
    const [majorfigure ,denomination] = await Promise.all([
        MajorFigures.findById(req.params.id).exec(),
        Denomination.findOne({MajorFigures: req.params.id}).exec()
    ])
    let usedIn = []
    if (denomination) {
        usedIn.push(denomination)
    }
    res.render('majorfigures_delete_form', {
        title: majorfigure.name,
        birthdate: majorfigure.BirthDate,
        deathdate: majorfigure.DeathDate,
        usedIn: usedIn,
        id: req.params.id
    })
})
exports.majorfigures_delete_post = asyncHandler(async (req, res, next) => {
    await MajorFigures.findByIdAndDelete(req.body.figureId)
    res.redirect('/catalog/major-figures')
})
function changeFormat (string) {
    let newString = []
    let index = string.lastIndexOf('/')
    let year = string.slice(index + 1, string.length)
    newString.push(year)
    string = string.slice(0, index)
    index = string.lastIndexOf('/')
    let month = string.slice(index + 1, string.length)
    if (month.length === 1) {
        month = `0${month}`
    }
    string = string.slice(0, index)
    let date = string
    if (date.length === 1) {
        date = `0${date}`
    }
    newString.push(date)
    newString.push(month)
    return newString.join('-')
}
exports.majorfigures_update_get = asyncHandler(async (req, res, next) => {
    const figure = await MajorFigures.findById(req.params.id)
    const stringBirthDate = changeFormat(figure.date_of_birth.toLocaleDateString())
    const stringDeathDate = changeFormat(figure.date_of_death.toLocaleDateString())
    res.render('majorfigures_update_form', {
        title: `Update ${figure.name}`,
        first_name: figure.first_name,
        last_name: figure.last_name,
        birthdate: stringBirthDate,
        deathdate: stringDeathDate
    })
})
exports.majorfigures_update_post = [
    body("first_name", "Must provide a first name")
    .trim()
    .isLength({min: 1})
    .escape(),
    body("last_name", "Must provide a last name")
    .trim()
    .isLength({min:1})
    .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const figure = await MajorFigures.findById(req.params.id)
            const stringBirthDate = changeFormat(figure.date_of_birth.toLocaleDateString())
            const stringDeathDate = changeFormat(figure.date_of_death.toLocaleDateString())
            res.render('majorfigures_update_form', {
                title: `Update ${figure.name}`,
                first_name: figure.first_name,
                last_name: figure.last_name,
                birthdate: stringBirthDate,
                deathdate: stringDeathDate,
                errors: errors.array()
            })
        } else {
            let newFigure = new MajorFigures({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                date_of_birth: req.body.birthdate,
                date_of_death: req.body.deathdate,
                _id: req.params.id
            })
            await MajorFigures.findByIdAndUpdate(req.params.id, newFigure, {})
            res.redirect(`/catalog/major-figures/${req.params.id}`)
        }
    })
]