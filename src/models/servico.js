const { Schema } = require("mongoose");

module.exports = app => {
    let ServicosSchema = app.db.mongoose.Schema({
        titulo: String,
        categoria: {
            type: app.db.mongoose.Schema.Types.ObjectId,
            ref: "Categorias"
        },
        descricao: String,
        data: Date,
        status: Boolean
    })

    app.db.mongoose.model("Servicos", ServicosSchema);
}