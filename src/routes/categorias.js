module.exports = (app) => {
    app.get('/categorias', app.controllers.categoriasController.listarCategorias);
    app.get("/categorias/:id", app.controllers.categoriasController.consultarPorId);
    app.post('/categorias', app.controllers.categoriasController.adicionar);
    app.put('/categorias/:id', app.controllers.categoriasController.atualizar);
    app.delete('/categorias/:id', app.controllers.categoriasController.excluir);
}