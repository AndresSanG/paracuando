const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
    definition:{
        openapi: "3.0.0",
        info:{title:"paracuando",version:"1.0.0"}
    },
    severs:[{url:'http://8000/'}],
    apis:["../routes/auth*.js"],
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app,port) =>{
    app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec,{explorer:true}))
}

module.exports = {swaggerDocs}
