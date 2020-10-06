module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send("Ola mundo!");
    })

}