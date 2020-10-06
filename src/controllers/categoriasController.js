module.exports = function(app) {

    let categoriasModel = app.db.mongoose.model("Categorias")

    // app/controllers.categoriasController.adicionar

    return {
        listarCategorias: function(req, res) {
            let search = req.body.search
            categoriasModel.find({
                nome: new RegExp(search)
            })
            .then((categorias) => {
                res.json(categorias);
            })
            .catch((err) => res.status(500).send(err))
        },

        adicionar: (req, res) => {
            try {
                let categoria = new categoriasModel(req.body)
                categoria.save((err) => {
                    if(err)
                        res.status(500).send(`Erro ao inserir: ${err}`)
                    else
                        res.send(`Categoria adicionada com sucesso - Id: ${categoria.id}`);
                });

            } catch (error) {
                res.send("Erro ao adicionar categoria: "+ error);
            }
            
        },

        consultarPorId: async (req, res) => {
            try {

                let id = req.params.id;
                let categoria = await categoriasModel.findById(id)

                if(categoria)
                    res.json(categoria)
                else
                    res.status(404).end();
            
            } catch {
                res.status(404).send();
            }

        },

        atualizar: (req, res) => {
            let id = req.param.id;
            let categoria = req.body;
            categoriasModel.findByIdAndUpdate(id, categoria, (err) => {
                if(err)
                    res.status(500).send(`Erro ao atualizar categoria: ${err}`)
                else
                    res.send("Categoria atualizada com sucesso")
            })

        },

        excluir: (req, res) => {
            let id = req.param.id;
            categoriasModel.findByIdAndRemove(id, (err) => {
                if(err)
                    res.status(500).send(`Erro ao excluir categoria: ${err}`)
                else
                    res.send("Categoria excluida com sucesso")
            })
        }
        
    }

}