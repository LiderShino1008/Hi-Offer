var categorias=JSON.parse(localStorage.getItem("categorias"));
if(localStorage.getItem("categorias")==null){
//Registro de Categorias
let categorias=[
    {
        nombreCategoria: "Salud",
        color:"",
        icono:"",
        productosEnPromocion: [
                {
                    imagenes:["img/img.jpg"],
                    id:"456789",
                    nombreProducto:"Vitamina C",
                    descripcion: "Fortalece las defensas de tu organismo para prevenir el Covid-19",
                    stock:10,
                    precionormal:49.99,
                    preciopromocion:38.99,
                    porcentajeDescuento: 100-((38.99/49.99)*100),
                    comentarios:[{
                        nombreUsuario: "Maria", 
                        imagen:"img.jpg",
                        comentarios:"Este medicamento es muy efectivo",
                        calificacion:"5 estrellas"
                    },
                    {
                        nombreUsuario: "Elena", 
                        imagen:"img/img.jpg",
                        comentarios:"Me provoco efectos secundarios severos.",
                        calificacion:"2 estrellas",
                    }],
                    empresa:"Infarma",
                },
                {
                    imagenes:["img/img.jpg"],
                    id:"456789",
                    nombreProducto:"Gel Antibacterial",
                    descripcion: "75% alcochol y otras cosas mas",
                    stock:50,
                    precionormal:60.99,
                    preciopromocion:50.5,
                    porcentajeDescuento: (50.5/60.99)*100,
                    comentarios:[{
                        nombreUsuario: "Pedro", 
                        imagen:"usuario3.jpg",
                        comentarios:"Excelente producto",
                        calificacion:"5 estrellas",
                        
                    },
                    {
                        nombreUsuario: "Gabriela", 
                        imagen:"usuario4.jpg",
                        comentarios:"Es el mejor gel que he usado, y el envio fue muy efectivo",
                        calificacion:"5 estrellas",
                    }],
                    empresa:"Salud Company",
                    
                },

                {
                    imagenes:["img/img.jpg"],
                    id:"456789",
                    nombreProducto:"Vitamina C",
                    descripcion: "Fortalece las defensas de tu organismo para prevenir el Covid-19",
                    stock:10,
                    precionormal:49.99,
                    preciopromocion:38.99,
                    porcentajeDescuento: (38.99/49.99)*100,
                    comentarios:[{
                        nombreUsuario: "Maria", 
                        imagen:"img/blusa1.jpg",
                        comentarios:"Este medicamento es muy efectivo",
                        calificacion:"5 estrellas"
                    },
                    {
                        nombreUsuario: "Elena", 
                        imagen:"usuario2.jpg",
                        comentarios:"Me provoco efectos secundarios severos.",
                        calificacion:"2 estrellas",
                    }],
                    empresa:"Infarma",
                },
                {
                    imagenes:["img/img.jpg"],
                    id:"456789",
                    nombreProducto:"Vitamina C",
                    descripcion: "Fortalece las defensas de tu organismo para prevenir el Covid-19",
                    stock:10,
                    precionormal:49.99,
                    preciopromocion:38.99,
                    porcentajeDescuento: (38.99/49.99)*100,
                    comentarios:[{
                        nombreUsuario: "Maria", 
                        imagen:"usuario1.jpg",
                        comentarios:"Este medicamento es muy efectivo",
                        calificacion:"5 estrellas"
                    },
                    {
                        nombreUsuario: "Elena", 
                        imagen:"usuario2.jpg",
                        comentarios:"Me provoco efectos secundarios severos.",
                        calificacion:"2 estrellas",
                    }],
                    empresa:"Infarma",
                },
                {
                    imagenes:["img/img.jpg"],
                    id:"456789",
                    nombreProducto:"Vitamina C",
                    descripcion: "Fortalece las defensas de tu organismo para prevenir el Covid-19",
                    stock:10,
                    precionormal:49.99,
                    preciopromocion:38.99,
                    porcentajeDescuento: (38.99/49.99)*100,
                    comentarios:[{
                        nombreUsuario: "Maria", 
                        imagen:"usuario1.jpg",
                        comentarios:"Este medicamento es muy efectivo",
                        calificacion:"5 estrellas"
                    },
                    {
                        nombreUsuario: "Elena", 
                        imagen:"usuario2.jpg",
                        comentarios:"Me provoco efectos secundarios severos.",
                        calificacion:"2 estrellas",
                    }],
                    empresa:"Infarma",
                },
                {
                    imagenes:["img/img.jpg"],
                    id:"456789",
                    nombreProducto:"Vitamina C",
                    descripcion: "Fortalece las defensas de tu organismo para prevenir el Covid-19",
                    stock:10,
                    precionormal:49.99,
                    preciopromocion:38.99,
                    porcentajeDescuento: (38.99/49.99)*100,
                    comentarios:[{
                        nombreUsuario: "Maria", 
                        imagen:"usuario1.jpg",
                        comentarios:"Este medicamento es muy efectivo",
                        calificacion:"5 estrellas"
                    },
                    {
                        nombreUsuario: "Elena", 
                        imagen:"usuario2.jpg",
                        comentarios:"Me provoco efectos secundarios severos.",
                        calificacion:"2 estrellas",
                    }],
                    empresa:"Infarma",
                },
        ],
    },

     //CATEGORIA 2
    {
        nombreCategoria: "fashion",
        productosEnPromocion: [
                {
                    imagenes:["img/img.jpg"],
                    id:"76789",
                    nombreProducto:"Blusa Terciopelo",
                    descripcion: "Blusa color roja ",
                    stock:15,
                    precionormal:500.99,
                    preciopromocion:400.99,
                    porcentajeDescuento: (400.99/500.99)*100,
                    comentarios:[{
                        nombreUsuario: "Berta", 
                        imagen:"usuario5.jpg",
                        comentarios:"Me encanto!",
                        calificacion:"5 estrellas"
                    },
                    {
                        nombreUsuario: "Elena", 
                        imagen:"usuario2.jpg",
                        comentarios:"Me enviaron la talla equivocada",
                        calificacion:"2 estrellas",
                    }],
                    empresa:"Infarma",
                },
                {
                    imagenes:["img/img.jpg"],
                    id:"456789",
                    nombreProducto:"Pantalon Negro",
                    descripcion: "Color Negro, Stresh",
                    stock:50,
                    precionormal:60.99,
                    preciopromocion:50.5,
                    porcentajeDescuento: 50.5/60.99,
                    comentarios:[{
                        nombreUsuario: "Pedro", 
                        imagen:"usuario3.jpg",
                        comentarios:"Excelente producto",
                        calificacion:"5 estrellas",
                        
                    },
                    {
                        nombreUsuario: "Gabriela", 
                        imagen:"usuario4.jpg",
                        comentarios:"Es el mejor gel que he usado, y el envio fue muy efectivo",
                        calificacion:"5 estrellas",
                    }],
                    empresa:"Salud Company",
                },
                {
                    imagenes:["img/img.jpg"],
                    id:"456789",
                    nombreProducto:"Pantalon Negro",
                    descripcion: "Color Negro, Stresh",
                    stock:50,
                    precionormal:60.99,
                    preciopromocion:50.5,
                    porcentajeDescuento: 50.5/60.99,
                    comentarios:[{
                        nombreUsuario: "Pedro", 
                        imagen:"usuario3.jpg",
                        comentarios:"Excelente producto",
                        calificacion:"5 estrellas",
                        
                    },
                    {
                        nombreUsuario: "Gabriela", 
                        imagen:"",
                        comentarios:"Es el mejor gel que he usado, y el envio fue muy efectivo",
                        calificacion:"5 estrellas",
                    }],
                    empresa:"Salud Company",
                },
                {
                    imagenes:["img/img.jpg"],
                    id:"456789",
                    nombreProducto:"Pantalon Negro",
                    descripcion: "Color Negro, Stresh",
                    stock:50,
                    precionormal:60.99,
                    preciopromocion:50.5,
                    porcentajeDescuento: 50.5/60.99,
                    comentarios:[{
                        nombreUsuario: "Pedro", 
                        imagen:"usuario3.jpg",
                        comentarios:"Excelente producto",
                        calificacion:"5 estrellas",
                        
                    },
                    {
                        nombreUsuario: "Gabriela", 
                        imagen:"usuario4.jpg",
                        comentarios:"Es el mejor gel que he usado, y el envio fue muy efectivo",
                        calificacion:"5 estrellas",
                    }],
                    empresa:"Salud Company",
                },
        ],
    }

];
localStorage.setItem("categorias",JSON.stringify(categorias));
}else{
    categorias = JSON.parse(localStorage.getItem("categorias"));
}
//Funcion para llenar selector de categorias
