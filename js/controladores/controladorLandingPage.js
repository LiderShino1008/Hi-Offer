var url='../../Hi-Offer/backend/api/plataforma.php';
var urlComentarios='../../Hi-Offer/backend/api/comentarios.php';

var d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var n = month[d.getMonth()];
console.log("mes", n);

//siempre actualizar el mes de la plataforma para el buen funcionamiento de las graficas

function actualizarPlataforma(){
  axios({
      method:'PUT',
      url:url+`?id=${3}`,
      responseType:'json',
      data: {
        "mes_actual":n
      },
    }).then(res=>{
    }).catch(error=>{console.error(error);
    });   
   
}actualizarPlataforma();

function actualizarVisitas(){
    axios({
        method:'PUT',
        url:'../../Hi-Offer/backend/api/plataforma.php?id=1',
        responseType:'json',
        data: 0,
      }).then(res=>{
         
      }).catch(error=>{console.error(error);
      });   
     
}actualizarVisitas();



axios({
  method:'GET',
  url:urlComentarios,
  responseType:'json',
}).then(res=>{
}).catch(error=>{console.error(error);
}); 
