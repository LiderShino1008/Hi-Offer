
  <!-- Central Modal Small -->
  <div class="modal fade" id="ModalPago" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
            <div class="container mt-2">
                <section class="dark-grey-text">
                    <div class="">
                    <div class="">
                      <div class="row">
                        <div class="col-lg-8">
                          <ul class="nav md-pills nav-justified pills-primary font-weight-bold">
                            <li class="nav-item">
                              <a class="nav-link active" style="color:#546991!important" data-toggle="tab" href="#tabCheckoutBilling123" role="tab">1. Información</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" style="color:#546991!important" data-toggle="tab" href="#tabCheckoutPayment123" role="tab">2. Forma de pago</a>
                            </li>
                          </ul>
                          <!-- Pills panels -->
                          <div class="tab-content pt-4">
                            <!--Panel 1-->
                            <div class="tab-pane fade in show active" id="tabCheckoutBilling123" role="tabpanel">
                              <!--Card content-->
                              <form>
                                <label for="address" class="">Dirección</label>
                                <input type="text" id="address" class="form-control" placeholder="Direccion principal">
                                <div class="invalid-feedback " id="add-vacio" style="font-size:12px;">
                                *Obligatorio
                                </div>
                                <div class="mb-4"></div>
                                <!--address-2-->
                                <label for="address-2" class="">Dirección 2 (optional)</label>
                                <input type="text" id="address-2" class="form-control " placeholder="Numero de residencia">
                                <div class="invalid-feedback " id="add-vacio-2" style="font-size:12px;">
                                *Obligatorio
                                </div>
                                <div class="mb-4"></div>
                                <div class="row">
                                  <div class="col-lg-4 col-md-12">
                                    <label for="country">País</label>
                                    <select class="custom-select d-block w-100" id="country">
                                      <option value="-">Seleccione</option>
                                      <option>Belice</option>
                                      <option>Guatemala</option>
                                      <option>Honduras</option>
                                      <option>El Salvador</option>
                                      <option>Nicaragua</option>
                                      <option>CostaRica</option>
                                      <option>Panamá</option>
                                    </select>
                                    <div class="invalid-feedback " id="pais-vacio" style="font-size:12px;">
                                        *Obligatorio
                                        </div>
                                        <div class="mb-4"></div>
                                    </div>
                                  <div class="col-lg-4 col-md-6 mb-4">
              
                                    <label for="state">Departamento</label>
                                    <input type="text" id="depto" class="form-control " placeholder="Numero de residencia">
                                    <div class="invalid-feedback " id="depto-vacio" style="font-size:12px;">
                                    *Obligatorio
                                    </div>
                                    <div class="mb-4"></div>
                                
                                  </div>
                                  <div class="col-lg-4 col-md-6 mb-4">
                                    <label for="zip">Código postal</label>
                                    <input type="text" class="form-control" id="zip" placeholder="" >
                                    <div class="invalid-feedback" id="zip-vacio">
                                      Escriba el código postal.
                                    </div>
                                  </div>
                                  <!--Grid column-->
                                </div>
                                <!--Grid row-->
                                <div class="mb-1 ml-10" style="margin-left: 15px; font-size: 13px;">
                                  <input type="checkbox" class="form-check-input filled-in" id="chekboxRules">
                                  <label class="form-check-label" for="chekboxRules">Acepto los terminos un condiciones</label>
                                </div>
                                <div class="mb-20" style="margin-left: 15px; font-size: 13px; ">
                                  <input type="checkbox" class="form-check-input filled-in" id="safeTheInfo">
                                  <label class="form-check-label" for="safeTheInfo">Guardar esta informacion para otras compras</label>
                                </div>         
                                <a id="paso2" class="btn btn-primary col-6 float-right  btn-block"  onclick="addInformacionPedido()" style="margin-top: 32px; background-color: #546991!important;" >Siguiente</a>
              
                              </form>
              
                            </div>
                            <!--/.Panel 1-->
              
                            <!--Panel 2-->
                            <div class="tab-pane fade" id="tabCheckoutPayment123" role="tabpanel">
              
                            <div class="tab-content container t-4">
                          <!--Panel 2-->
                          <div class="row">
                         
                            
                              <div class="col-lg-12 col-12">
                            <div class="invalid-feedback" id="pay-form">
                              Debe Seleccionar una forma de pago.
                              </div>
                            <div class="d-block my-3 " style="margin-left: 20px;">
                              
                              <div class="mb-2">
                                <input name="group2"onclick="select1()"  type="radio" class="form-check-input with-gap" id="radioWithGap4" 
                                  >
                                <label class="form-check-label" style="font-size: 14px; " for="radioWithGap4">Tarjeta de débito</label>
                              </div>
                              <div class="mb-2">
                                <input iname="group2" type="radio" onclick="select2()" class="form-check-input with-gap" id="radioWithGap5"
                                  >
                                <label class="form-check-label" style="font-size: 14px; " for="radioWithGap5">Tarjeta de crédito</label>
                              </div>
                              <div class="mb-2">
                                <input name="group2" type="radio" onclick="select3()" class="form-check-input with-gap" id="radioWithGap6" >
                                <label class="form-check-label" style="font-size: 14px; " for="radioWithGap6">Paypal</label>
                              </div>
                              
                            </div>
                           
                            <div class="row">
                              <div class="col-md-6 mb-3">
                                <label for="cc-name123" style="font-size: 14px; font-weight: bold;">Nombre titular</label>
                                <input type="text" style="font-size: 14px; " class="form-control" id="cc-name123" placeholder="" required>
    
                                <div id="camp-nombre-tarjet-vacio" class="invalid-feedback">
                                 Ingrese el nombre de la tarjeta.
                                </div>
                              </div>
                              <div class="col-md-6 mb-3" >
                                <label for="cc-number123"style="font-size: 14px; font-weight: bold;" >Número de tarjeta</label>
                                <input type="text" style="font-size: 14px; " class="form-control" id="cc-number123" placeholder="" required>
                                <div class="invalid-feedback" id="numeroTarjeta">
                                  Numero de tarjeta invalido.
                                </div>
                                <div class="invalid-feedback" id="numeroTarjetaVacio">
                                  Ingrese el número de tarjeta.
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-4 mb-3">
                                <label for="cc-expiration123" style="font-size: 14px; font-weight: bold;" >Vence</label>
                                <input type="text" class="form-control" style="font-size: 14px; "  id="cc-expiration123" placeholder="MM/YY " required>
                                <div class="invalid-feedback" id="cc-expired-null">
                                Campo obligatorio.
                                </div>
                                <div class="invalid-feedback" id="cc-expired-invalid">
                                  Fecha de expiracion invalida.
                                 </div>
                              </div>
                              <div class="col-md-4 mb-3">
                                <label for="cc-cvv123" style="font-size: 14px; font-weight: bold;">CVV</label>
                                <input type="text" class="form-control" style="font-size: 14px; " id="cc-cvv123" placeholder="" required>
                                <div class="invalid-feedback" id="cvv-null">
                                 Obligatorio.
                                </div>
                                <div class="invalid-feedback" id="cvv-invalid">
                                  cvv invalido.
                                 </div>
                              </div>
                            </div>
                          </div>
                         
                          </div>
                            <hr class="mb-4">
                            
                            <button  id="btn-one" class="btn btn-primary btn-lg btn-block col-4 mx-auto" onclick="cardFormValidate()" style="background-color: #546991!important; padding: 10px!important; font-size: 14px!important; float: right;" type="">Autorizar pago</button>
                            
                            <div class="alert alert-success d-none" role="alert" style="margin-top: 10px; font-size:13px" id="pay-exit" >
                             Su pago se realizó correctamente, ¡revisa tus pedidos para monitorear el estado de la entrega!
                            </div>
                            <div class="alert alert-danger d-none" role="alert" style="margin-top: 10px; font-size:13px" id="pay-error" >
                              ¡Opps! a ocurrido un error, porfavor vuelve a intentarlo.
                            </div>

                            <button  id="btn-next" class="btn btn-primary btn-lg btn-block col-4 mx-auto d-none" onclick="continuar()" style="background-color: #546991!important; padding: 10px!important; font-size: 14px!important;float: right;" type="">Continuar</button>
                            <div class="mb-5"></div>
                          </div>
                            </div>
                            <!--/.Panel 3-->
                          </div>
                          <!-- Pills panels -->
                        </div>
                        <div class="col-lg-4 mb-4">
                          <div class="card z-depth-0 border border-light rounded-0">
              
                            <!--Card content-->
                            <div class="card-body" >
                              <h4 class="mb-4 mt-1 h5 text-center font-weight-bold">Total</h4>
                              <hr>
                              <div id="productos"></div>
                            
                              <dl class="row" id="total">
                                
                              </dl>
                            </div>
              
                          </div>              
                        </div>

                      </div>
              
                    </div>
                  </div>
                </section>
              </div>
        </div>
      </div>
    </div>
  </div>