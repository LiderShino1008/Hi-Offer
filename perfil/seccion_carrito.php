
<!---incluir el modal carrito para que sea accesible a todas las paginas--->
<div class="modal fade" id="modal-carrito" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <!-- Change class .modal-sm to change the size of the modal -->
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title w-100 ml-10" id="myModalLabel" style="font-size: 16px; margin-left: 10px;">Carrito</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">        
        <div class="container my-5 my-0  rounded" >
          <section class="dark-grey-text" style="margin-top: -50px;">
            <div class="table-responsive" >
              <table class="table product-table mb-0" >
                <thead class="mdb-color lighten-5" style="background-color:#C6C6C6!important">
                  <tr>
                    <th></th>
                    <th class="font-weight-bold">
                      <strong>Producto</strong>
                    </th>
                    <th class="font-weight-bold">
                      <strong>ID</strong>
                    </th>
                    <th></th>
                    <th class="font-weight-bold">
                      <strong>Precio</strong>
                    </th>
                    <th class="font-weight-bold">
                      <strong>Cantidad</strong>
                    </th>
                    <th class="font-weight-bold">
                      <strong>Total</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="list-carrito"> 
                </tbody>
                <!-- /.Table body -->
        
              </table>
        
            </div>
            <!-- /.Shopping Cart table -->
        
          </section>
          <!--Section: Content-->
        
        
        </div>

      </div>
    </div>
  </div>
</div>
<!-- Central Modal Small -->
