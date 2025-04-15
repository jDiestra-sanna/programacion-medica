        </div>
        <!-- /.container-fluid -->

      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
<!--       <footer class="sticky-footer bg-white">
       <!--  <div class="container my-auto">
          <div class="copyright text-center my-auto"> -->
           <!--  <span>Copyright &copy; Sanna 2020</span> -->
        <!--   </div>
        </div> -->
   <!--    </footer>   -->
      <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->

  </div>
  <!-- End of Page Wrapper -->

 
 
  <!-- Logout Modal-->
  <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Salir del sistema?</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">Estas seguro de cerrar sesión</div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
          <a class="btn btn-primary" href="<?php echo base_url()."login/logout"; ?>">Salir</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap core JavaScript-->
  
  <script src="<?php echo base_url()."assets/"; ?>vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

  <!-- Core plugin JavaScript-->
  <script src="<?php echo base_url()."assets/"; ?>vendor/jquery-easing/jquery.easing.min.js"></script>

  <!-- Custom scripts for all pages-->
  <script src="<?php echo base_url()."assets/"; ?>js/sb-admin-2.min.js"></script>

 

<script src="<?=base_url('assets/libs/sweetalert2/dist/sweetalert2.min.js')?>"></script>
<?php if ($permiso) : ?>
  <script src="<?=base_url('assets/js/dashboard/'.$idscript)?>"  ></script>

<?php else : ?>
  <script src="<?=base_url('assets/js/dashboard/'.$idscript)?>"  type ="module"></script>


<?php endif; ?> 
<link rel="stylesheet" href="<?=base_url('assets/libs/sweetalert2/dist/')?>sweetalert2.min.css">
</body>

</html>
