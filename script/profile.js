$(document).ready(function(){  

	load_data();
    
	function load_data()
	{
		$.ajax({
			url:"includes/profile_fetch.php",
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


		$(document).on('click', '#chg', function(){
		$("#user_dialog1").dialog('open');
	});
	
	$('#user_form').on('submit', function(event){
			event.preventDefault();
			$('#form_action').attr('disabled', 'disabled');
			var form_data = $(this).serialize();
			$.ajax({
				url:"includes/profile_action.php",
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
	
	$(document).on('click', '.edit', function(){
		$('#user_dialog').dialog('open');

		var id = $(this).attr('id');
		var action = 'fetch_single';
		$.ajax({
			url:"includes/profile_action.php",
			method:"POST",
			data:{id:id, action:action},
			dataType:"json",
			success:function(data)
			{
				$('#rel').val(data.rel);
				$('#name_of_patient').val(data.name_of_patient);
				$('#age').val(data.age);
				$('#army_no').val(data.army_no);
				$('#service').val(data.service);
				$('#rank').val(data.rank);
				$('#name').val(data.name);
				$('#unit').val(data.unit);
				
				$('#user_dialog').attr('title', 'Edit Data');
				$('#action').val('update');
				$('#hidden_id').val(id);
				$('#form_action').val('Update');
				$('#user_dialog').dialog('open');
			}
		});
	});

$(document).on('click', '.gen', function(){

		var id = $(this).attr('id');
		var action = 'fetch_single';
		$.ajax({
			url:"includes/profile_action.php",
			method:"POST",
			data:{id:id, action:action},
			dataType:"json",
			success:function(data)
			{
				$('#rel1').val(data.rel).attr('disabled', 'disabled');
				$('#name_of_patient1').val(data.name_of_patient).attr('disabled', 'disabled');
				$('#age1').val(data.age).attr('disabled', 'disabled');
				$('#army_no1').val(data.army_no).attr('disabled', 'disabled');
				$('#service1').val(data.service).attr('disabled', 'disabled');
				$('#rank1').val(data.rank).attr('disabled', 'disabled');
				$('#name1').val(data.name).attr('disabled', 'disabled');
				$('#unit1').val(data.unit).attr('disabled', 'disabled');
				$('#id1').val(data.id1);
				
				$('#user_dialog1').attr('title', 'Edit Data');
				$('#action').val('update_admission');
				$('#hidden_id').val(id);
				$('#form_action1').val('Update');
				$('#user_dialog1').dialog('open');
			}
		});
	});














	
	$('#delete_confirmation').dialog({
		autoOpen:false,
		modal: true,
		buttons:{
			Ok : function(){
				var id = $(this).data('prod_id');
				var action = 'delete';
				$.ajax({
					url:"includes/allot_staff_action.php",
					method:"POST",
					data:{id:id, action:action},
					success:function(data)
					{
						$('#delete_confirmation').dialog('close');
						$('#action_alert').html(data);
						$('#action_alert').dialog('open');
						load_data();
					}
				});
			},
			Cancel : function(){
				$(this).dialog('close');
			}
		}	
	});
	
	$(document).on('click', '.delete', function(){
		var id = $(this).attr("id");
		$('#delete_confirmation').data('prod_id', id).dialog('open');
	});
	
}); 


$(document).ready(function() {
            $('#gst').keyup(function(ev) {
            	var qty = $('#qty').val() * 1;
            	var gst = $('#gst').val() * 1;
            	var rate = $('#rate').val() * 1;
            	

                var x = (rate+(rate*gst/100))*qty;
				var y = (rate*gst/100)*qty;
                var divobj = document.getElementById('total_expr');
				var divobj1 = document.getElementById('total_gst');
                divobj.value = x;
				divobj1.value = y;
				
            });
        });
$(document).ready(function(){
    		$('#user_data').dataTables();

    	});