 <style>
		.contenido{
		grid-column-start:1;
		grid-column-end:6;
		border: solid 1px;
		}
		.list-group .list-group-item{
			padding-top: 0;
			padding-right: 1.25rem;
			padding-bottom: 0.25rem;
			padding-left: 1.25rem;
		}
</style>

<div class="contenido">
    <div class="row">
        <div class="col-md-12">	
	        <div class="card" id="card" >
		        
				<div class="card-body">	
		
					<div class="col-md-10 offset-md-1 mb-4 text-center" id="generate-msg">
						<?php
						if (!empty($_SESSION["error"])) { 
							echo $_SESSION["error"];
							unset($_SESSION["error"]);
						}
						?>	
					</div>						
					
					<form id="generate-form" action="srv.php" method="POST">
					 
						<div class="row">
							 
							<div class="col-md-4">
								<div class="form-group">
									<label for="table" class="form-label">TABLA: <span class="text-danger">*</span></label>
									<select class="form-control" name="table" id="table" required  >
									<option value="" selected>-- Select --</option>

									<?php
									  $CI =& get_instance();
									  $tables =      $CI->get_tables() ;
									 
									  foreach ($tables as $table) {
										  echo '<option value="' . $table['table_name'] . '">' . $table['table_name'] . '</option>';
									  }
									?>	
									</select>
								</div>
							</div>
							<div class="col-md-4">
								<div class="form-group">
									<label for="primaryKey" class="form-label">CAMPO PRINCIPAL: <span style="font-size:10px" class="text-primary"></span><span class="text-danger">*</span></label>
									<select class="form-control" name="primaryKey" id="primaryKey" readonly required>
									</select>
								</div>
							</div>							
						</div>					
						<div id="fields" class="mt-4">
						</div>	
						<div class="form-group row mt-2">
							<div class="col-sm-6 offset-sm-3">
						 
							</div>
						</div>
					</form>
					<div class="row">
						<div class="col-md-8 offset-md-2">
							<div id="response" class="mt-2">
							</div>
						</div>
					</div>
				</div>								
			</div>
		</div>
	</div>
</div>



 

<script>
$(document)
    .ready(
        function() {
            

        });
		
	$("#database").change(function () {
		var database = $(this).val();
		$("#table").removeClass('is-invalid').removeClass('is-valid');
		$("#table").val('');
		$('#fields').html('');				
		$('#primaryKey').html('');				

		if (database == ''){
			$("#table").prop( "disabled", true );
			$("#table").val('');
			$('#fields').html('');				
			$('#primaryKey').html('');	
		}else{
			if($("#table").is(':disabled')) $("#table").prop( "disabled", false );
			$.ajax({
				url: "srv.php",
				data: {'act': 'getTablesByDatabase', 'database': database},
				type: "POST",
				beforeSend: function() {
				   	if(!$("#table").is(':disabled')) $("#table").prop( "disabled", true );
				},				
				success: function (response) {
				    if($("#table").is(':disabled')) $("#table").prop( "disabled", false );
				    $("#table").html(response);
				}
			});			
		}
	});

	$("#table").change(function () {
		 	
		var table = $(this).val();
		$("#primaryKey").removeClass('is-invalid').removeClass('is-valid');
		$('#primaryKey').html('');	
		if (table == ''){
			$('#primaryKey').html('');	
		}else{
			$.ajax({
				url: "/delivery/getPrimaryColumnsByTable",
				data: {'table': table},
				type: "POST",
				beforeSend: function() {
				},				
				success: function (response) {
				    $("#primaryKey").html(response);
				}
			});			
		}
	});

	function sortableArrayAlert() {
		sortableArray = $('li').toArray();
	}
	
	$("#table").change(function () {
		
		var table = $(this).val();
		console.log(table);
			$("#fields").html('');		
		if (table == ''){
			$("#fields").html('');
		}else{
			$.ajax({
				url: "/delivery/getColumnsByTable",
				data: { 'table': table},
				type: "POST",
				beforeSend: function() {
					$('#fields').html('');				
				},				
				success: function (response) {
					$('#fields').html(response);
					sortableArrayAlert();
					//$('ul').sortable();
					$('a').click(function(e){
						e.preventDefault();
						$(this).parent().parent().parent().parent().remove().then(sortableArrayAlert());
					});					
				}
			});			
		}
	});	
	
</script>	
 