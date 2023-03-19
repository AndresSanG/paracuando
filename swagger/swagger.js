const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const path = require('path')

const options = {
    definition:{
        openapi: "3.0.0",
        info:{title:"paracuando",version:"1.0.0"},
        severs:[
            {
                url:'http://localhost:8000/'
            }
        ],
    },
        apis:[`${path.join(__dirname,"../routes/*.js")}`],
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app,port) =>{
    app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec,{explorer:true}))
}

module.exports = {swaggerDocs}
