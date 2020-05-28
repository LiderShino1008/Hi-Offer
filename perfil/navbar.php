<nav class="navbar navbar-expand-lg navbar-light " style="background-color:#FFFFFF;">
        <a class="navbar-brand" href="#"><img  class="logo" src="../img/logo2.png" ></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse navUsuario" id="navbarNavDropdown" style="margin-top: 10px; margin-left: 50px;">
          <ul class="navbar-nav">
            <li class="nav-item active col-lg-3 col-10">
                <div class="input-group mb-3"  style=" margin-right:30px;">
                    <div class="input-group-prepend"> 
                      <label class="input-group-text" for="inputGroupSelect0" style="background-color: #546991;"><i style="color: aliceblue;" class="fas fa-bars"></i></label>
                    </div>
                    <a class="custom-select"  id="inputGroupSelect01"  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Categorias</a>
                    <div  id="categoriasMenu" class="dropdown-menu " aria-labelledby="navbarDropdownMenuLink" >
                        
                      </div>
                  </div>
            </li>
            <li class="nav-item active  col-lg-6 col-9">
                <div class="input-group mb-3 seach">
                    <input type="text" class="form-control" placeholder="Buscar " style=""  saria-label="Recipient's username" aria-describedby="basic-addon2">
                    <div class="input-group-append" >
                      <span class="input-group-text" id="basic-addon2" style="background-color: #546991;"><i style="color: aliceblue;" class="fas fa-search"></i></span>
                    </div>
                  </div>
            </li>
            <li class="nav-item">
                <button type="button" onclick="todasLasEmpresas()"  class="boton"><i class="fas fa-building"></i> Empresas</button>
             </li>
            <li class="nav-item">
               <div style="text-align: center;"   data-toggle="modal" data-target="#modal-carrito"><i style="color: #546991; font-size: 20px; padding-top: 8px; margin-left: 50px;" class="fas fa-shopping-cart"></i></div> 
            </li>
            
            <li class="nav-item dropdown">
              <a   class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i style="color:#546991; font-size: 20px; float: right;" class="fas fa-user"></i>
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" onclick="window.location='perfil.html'" href="#">Mi Perfil</a>
                <a class="dropdown-item" href="index.html">Cerrar Sesión</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>