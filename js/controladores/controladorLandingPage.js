url='../../Hi-Offer/backend/api/plataforma.php';


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


