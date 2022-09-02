import swaggerJsdoc from 'swagger-jsdoc';

/**
 * API Config info
 */
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Documentacion Fabume API',
        version: '1.0.0'
    },
    servers:[
        {
            url:'http://localhost:3000/api'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type:'http',
                scheme:'bearer'
            }
        },
        schemas: {
            auth: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                  },
                },
            },
            user: {
                type:'object',
                required:['name','last_name','email','password'],
                properties: {
                    name: {
                        type:'string'
                    },
                    last_name: {
                        type:'string'
                    },
                    email: {
                        type:'string'
                    },
                    password: {
                        type:'string'
                    },
                    phone: {
                        type:'string'
                    },
                    account: {
                        type:'string'
                    },
                    addresses: {
                        type:'string'
                    },
                    store: {
                        type:'string'
                    },
                }
            },
            store: {
                type:'object',
                required:['name','country','city','lat','lng','user','isOpen'],
                properties:{
                    name: {
                        type:'string'
                    },
                    bussiness_id: {
                        type:'string'
                    },
                    country: {
                        type:'string'
                    },
                    city: {
                        type:'string'
                    },
                    address: {
                        type:'string'
                    },
                    lat: {
                        type:'string'
                    },
                    lng: {
                        type:'string'
                    },
                    is_open: {
                        type:'boolean'
                    },
                    status: {
                        type:'string'
                    },
                    user: {
                        type:'string'
                    },
                    products: {
                        type:'string'
                    },
                }

            },
            product: {
                type:'object',
                required: ['name','cant','price','store'],
                properties: {
                    name:{ type: 'string'},
                    description:{ type: 'string'},
                    components:{ type: 'string'},
                    cant:{ type: 'number'},
                    price:{ type: 'number'},
                    image:{ type: 'string'},
                    store:{ type: 'string'},
                }
            },
            address: {
                type:'object',
                required: ['country','city','address','lat','lng','principal','user'],
                properties: {
                    country:{ type: 'string'},
                    city:{ type: 'string'},
                    address:{ type: 'string'},
                    lat:{ type: 'string'},
                    lng:{ type: 'string'},
                    principal:{ type: 'boolean'},
                    user:{ type: 'string'},
                }
            },
            invoice: {
                type: 'object',
                required: ['store','user','subtotal','address'],
                properties: {
                    store: {type: 'string'},
                    user: {type: 'string'},
                    subtotal: {type: 'number'},
                    deilveryType: {type: 'string'},
                    status: {type: 'string'},
                    address: {type: 'string'},
                    deliveryChange: {type: 'string'},
                    userComment: {type: 'string'},
                    storeComment: {type: 'string'},
                }
            }
        }
    }
};
/**
 * Options
 */
const options = {
    swaggerDefinition,
    apis:[
        './routes/*.js,.ts'
    ]
};

const openApiConfiguration = swaggerJsdoc(options);

export default openApiConfiguration;