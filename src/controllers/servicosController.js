module.exports = function(app) {

    let servicosModel = app.db.mongoose.model("Servicos")

    // app/controllers.servicosController.adicionar

    return {
        listarServicos: function(req, res) {
            let search = req.body.search
            servicosModel.find({
                titulo: new RegExp(search)
            })
            .populate("categoria")
            .then((servicos) => {
                res.json(servicos);
            })
            .catch((err) => res.status(500).send(err))
        },

        adicionar: (req, res) => {
            try {
                let servico = new servicosModel(req.body)
                servico.save((err) => {
                    if(err)
                        res.status(500).send(`Erro ao inserir: ${err}`)
                    else
                        res.send(`Serviço adicionado com sucesso - Id: ${servico.id}`);
                });

            } catch (error) {
                res.send("Erro ao adicionar serviço: "+ error);
            }
            
        },

        consultarPorId: async (req, res) => {
            try {

                let id = req.params.id;
                let servico = await servicosModel.findById(id)

                if(servico)
                    res.json(servico)
                else
                    res.status(404).end();
            
            } catch {
                res.status(404).send();
            }

        },

        atualizar: (req, res) => {
            let id = req.param.id;
            let servico = req.body;
            servicosModel.findByIdAndUpdate(id, servico, (err) => {
                if(err)
                    res.status(500).send(`Erro ao atualizar serviço: ${err}`)
                else
                    res.send("Serviço atualizado com sucesso")
            })

        },

        excluir: (req, res) => {
            let id = req.param.id;
            servicosModel.findByIdAndRemove(id, (err) => {
                if(err)
                    res.status(500).send(`Erro ao excluir serviço: ${err}`)
                else
                    res.send("Serviço excluido com sucesso")
            })
        }
        
    }

}