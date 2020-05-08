url='../../Hi-Offer/backend/api/plataforma.php';

function actualizarPlataforma(){
    axios({
        method:'PUT',
        url:url,
        responseType:'json',
        data: 0,
      }).then(res=>{
      }).catch(error=>{console.error(error);
      });   
     
}//

