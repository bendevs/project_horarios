console.log('cargado index.js')

module.exports = app => {
    
    require('./aulaApi')(app);
    require('./materiasApi')(app);
    require('./docenteApi')(app);
    require('./horariosApi')(app);

    /**
     * @api {GET} /status Obtiene el estado del API REST
     * @apiVersion  0.0.1
     * @apiGroup Utilitarios
     * @apiSuccess (200) {String} status Estado del API
     * @apiExample {curl} Example usage:
     *    curl --request GET --url http://localhost:3000/status
     * @apiSuccessExample {json} Success-Response:
     *      HTTP/1.1 200 OK
     *      {
     *          "message": "Your API is running!"
     *      }
     */
    app.get('/status', (req, res) => {
        res.status(200).send({
            message: 'Your API is running!'
        })
    });
}