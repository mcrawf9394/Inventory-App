const userArgs = process.argv.slice(2)
const Denomination = require("./models/Denomination")
const MajorFigure = require("./models/MajorFigures")
const UmbrellaDenom = require("./models/UmbrellaDenom")
const Denominations = []
const MajorFigures = []
const UmbrellaDenoms = []
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const mongoDB = "mongodb+srv://Admin:hde5ccrsjEfCagq1@cluster0.2xc9jlt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
console.log(mongoDB)
main().catch((err) => console.log(err))
async function main () {
    await mongoose.connect(mongoDB)
    await createMajorFigures ()
    await createUmbrellaDenom()
    await createDenomination()
    mongoose.connection.close()
}
async function denominationCreate(index, name, majorFigures, summary, umbrellaDenom) {
    const denominationDetail = {
        name: name,
        MajorFigures: majorFigures,
        Summary: summary,
        UmbrellaDenom: umbrellaDenom
    }
    const denomination = new Denomination(denominationDetail)
    await denomination.save()
    Denominations[index] = denomination
}
async function majorFiguresCreate (index, first_name, last_name, date_of_birth, date_of_death) {
    const figureDetail = {
        first_name: first_name,
        last_name: last_name,
        date_of_birth: date_of_birth,
        date_of_death: date_of_death
    }
    const majorFigure = new MajorFigure(figureDetail)
    await majorFigure.save()
    MajorFigures[index] = majorFigure
}
async function umbrellaDenomCreate (index, name, summary) {
    const umbrellaDenomDetail = {
        name: name,
        summary: summary
    }
    const umbrellaDenom = new UmbrellaDenom(umbrellaDenomDetail)
    await umbrellaDenom.save()
    UmbrellaDenoms[index] = umbrellaDenom
}
async function createMajorFigures () {
    await Promise.all([
        majorFiguresCreate(0, "Martin", "Luther", "1483-11-10", "1546-2-18")
    ])
}
async function createUmbrellaDenom () {
    await Promise.all([
        umbrellaDenomCreate(0, "Protestantism", "Protestantism is a very general branch of Christianity. This branch clomps various denominations that can be very different theologically, but are connected in some way to the Protestant Reformation that started in the 1500s")
    ])
}
async function createDenomination () {
    await Promise.all([
        denominationCreate(0, "Lutheranism", MajorFigures[0], "Lutheranism was one of the first protestant denominations. This denomination was formed when Martin Luther came up with the 96 thesis against the Catholic Church. This denomination is also famous for the 5 solas.", UmbrellaDenoms[0])
    ])
}