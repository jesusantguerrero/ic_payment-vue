<div class="screen clients row">
  <div class="left-navigation col-md-2">
    <div class="left-navigation__header">
       <h3 class="left-navigation__header-text"><?php echo ucfirst($title) ?></h3>  
    </div>
    <ul class="aside-nav">
      <li class="aside-buttons"><a href="" data-toggle="modal" data-target="#search-client-modal"><i class="material-icons">description</i>  Nuevo Contrato</a></li>
      <li class="aside-buttons"><a href="" id="btn-update-contract"><i class="material-icons">edit</i>Editar Contrato</a></li>
      <li class="aside-buttons"><a href="" id="btn-cancel-contract"><i class="material-icons" >delete</i>Cancelar Contrato</a></li>
      <!-- <li class="aside-buttons"><a href="" id="btn-see-in-detail"><i class="material-icons" >find_in_page</i>Ver Detalles</a></li> -->
      <li class="aside-buttons"><a href="" target="_black" id="btn-see-contract"><i class="material-icons" >find_in_page</i>Imprimir Contrato</a></li> 
      <li class="aside-buttons"><a href="" id="btn-pay-view"><i class="material-icons" >monetization_on</i>Registrar Pago</a></li>
      <li class="aside-buttons"><a href="" id="btn-add-extra"><i class="material-icons" >more</i>Extras</a></li>
    </ul>

  </div>
  <div class="main-content col-md-10">
  <h2 class="subsection-title">Contratos</h2> 
    <div class="searcher-container">
      <input type="text" class="searcher" id="contract-searcher"placeholder="Busque contrato por codigo o cliente">
    </div>

      <table class="table table-hovered t-contracts" id="t-contracts">
        <tbody>
        </tbody>
      </table>
  </div>


</div>