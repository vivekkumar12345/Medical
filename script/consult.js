$(document).ready(function(){  

	load_data();
    
	function load_data()
	{
		$.ajax({
			url:"includes/consult_fetch.php",
			method:"POST",
			success:function(data)
			{
				$('#user_data').html(data);
			}
		});
	}
	
							
	
	$("#user_dialog").dialog({
		autoOpen:false,
		width:'700',
		maxWidth:600,
		height:'auto'
	});
		$("#user_dialog1").dialog({
		autoOpen:false,
		width:'700',
		height:'600'
	});
		$("#user_dialog2").dialog({
		autoOpen:false,
		width:'700',
		height:'600'
	});
		$("#user_dialog3").dialog({
		autoOpen:false,
		width:'500',
		height:'600'
	});
	
	
	$(document).on('click', '#add', function(){
		$('#user_dialog').attr('title', 'Add Patient');
		$('#action').val('insert');
		$('#form_action').val('insert');
		$('#user_form')[0].reset();
		$('#form_action').attr('disabled', false);
		$("#user_dialog").dialog('open');
	});

	
	
	$('#user_form').on('submit', function(event){
			event.preventDefault();
			$('#form_action').attr('disabled', 'disabled');
			var form_data = $(this).serialize();
			$.ajax({
				url:"includes/consult_action.php",
				method:"POST",
				data:form_data,
				success:function(data)
				{
					$('#user_dialog').dialog('close');
					$('#action_alert').html(data);
					$('#action_alert').dialog('open');
					load_data();
					$('#form_action').attr('disabled', false);
				}
			});
		
		
	});
	
	$('#action_alert').dialog({
		autoOpen:false
	});
	
	$(document).on('click', '.diag', function(){
		$('#user_dialog').dialog('open');

		var id = $(this).attr('id');
		var action = 'fetch_single';
		$.ajax({
			url:"includes/consult_action.php",
			method:"POST",
			data:{id:id, action:action},
			dataType:"json",
			success:function(data)
			{
				$('#history').val(data.history);
				$('#diag').val(data.diag);
				$('#treatment').val(data.treatment);
				$('#investigation').val(data.investigation);
				$('#status').val(data.status);

				$('#user_dialog').attr('title', 'Edit Data');
				$('#action').val('update');
				$('#hidden_id').val(id);
				$('#form_action').val('Update');
				$('#user_dialog').dialog('open');
			}
		});
	});


	$(document).on('click', '.diag1', function(){


		var id = $(this).attr('id');
		$.ajax({
			url:"includes/biodata_fetch.php",
			method:"POST",
			data:{id:id},
			dataType:"html",
			success:function(data)
			{
				$('#user_dialog1').dialog('open');
				$('#user_dialog1').html(data);
			}
		});
	});
$(document).on('click', '.med', function(){


		var id = $(this).attr('id');
		$.ajax({
			url:"includes/med_alloted_action.php",
			method:"POST",
			data:{id:id},
			dataType:"html",
			success:function(data)
			{
				$('#user_dialog2').dialog('open');
				$('#user_dialog2').html(data);
			}
		});
	});
$(document).on('click', '.test', function(){


		var id = $(this).attr('id');
		$.ajax({
			url:"includes/result_view_enter.php",
			method:"POST",
			data:{id:id},
			dataType:"html",
			success:function(data)
			{
				$('#user_dialog3').dialog('open');
				$('#user_dialog3').html(data);
			}
		});
	});
});

