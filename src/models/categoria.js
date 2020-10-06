const { Schema } = require("mongoose");

module.exports = app => {
    let CategoriasSchema = app.db.mongoose.Schema({
        nome: String,
        descricao: String,
        servicos: [{
            type: app.db.mongoose.Schema.Types.ObjectId,
            ref: "Servicos"
        }],
        status: Boolean
    })

    app.db.mongoose.model("Categorias", CategoriasSchema);
}