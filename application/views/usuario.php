<?php if($msg = $this->session->flashdata('msg')): ?>
  <div class="alert alert-success text-center" role="alert">
    <?= $msg ?>
  </div>
<?php endif; ?>


<h3 class="text-center">Responsables</h3>
    <div class="row">
        <a href="<?=base_url('usuarios/')?>nuevo" class="btn btn-info btn-sm" role="button" >Nuevo</a>
    </div>
    <div class="row">
      <table class="table w-auto small " >
        <thead class="thead-dark">
          <tr>
            <th scope="col">id</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Tipo Documento</th>
            <th scope="col">Documento</th>
            <th scope="col">Telefono</th>
            <th scope="col">Email</th>
            <th scope="col">Estado</th>
            <th scope="col">Creado</th>
            <th scope="col">Modificado</th>
            <th scope="col" style="padding-right: 100px;">Acciones </th>
          </tr>
        </thead>
        <tbody>
          <?php foreach($data as $item): ?>
          <tr>
            <th scope="row"><?= $item->RA_ID ?></th>
            <td><?= $item->RA_DESCRIPCION ?></td>
            <td><?= ($item->RA_IDDOC == 1) ? 'DNI' : (($item->RA_IDDOC == 6)? 'RUC':'Otros') ?></td>
            <td><?= $item->RA_NUMDOC ?></td>  
            <td><?= $item->RA_TELEFONO ?></td>  
      	    <td><?= $item->RA_EMAIL ?></td>
            <td><?= $item->RA_ESTADO == 1 ? 'activo' : 'inactivo' ?></td>
            <td><?= $item->RA_CREADO ?></td>
            <td><?= $item->RA_MODIFICADO ?></td>
            <td > <a class="btn btn-warning btn-sm py-0" href="<?=base_url('usuarios/editar/'.$item->RA_ID)?>" role="button">Editar</a>  
            <!--<a class="btn btn-danger btn-sm py-0" href="#" data-id="<?=$item->RA_ID?>" id="delete" role="button">Eliminar</a> -->
            </td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div> 

<?= $this->pagination->create_links() ?>
