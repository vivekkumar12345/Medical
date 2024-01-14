$(document).ready(function(){  

	load_data();
    
	function load_data()
	{
		$.ajax({
			url:"includes/stock_fetch.php",
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
		$("#user_dialog3").dialog({
		autoOpen:false,
		width:'500',
		height:'500'
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
				url:"includes/stock_action.php",
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

		var id = $(this).attr('id');
		var id2 = $('#edit1').val();
		var action = 'fetch_single';
		$.ajax({
			url:"includes/stock_action1.php",
			method:"POST",
			data:{id:id, id2:id2, action:action},
			dataType:"json",
			success:function(data)
			{
				$('#med_name1').val(data.med_name);
				$('#weight1').val(data.weight);
				$('#qty1').val(data.qty);
				$('#amt1').val(data.amt);
				$('#stock1').val(data.stock);
				$('#date1').val(data.date);
				$('#user_dialog3').attr('title', 'Edit Data');
				$('#action').val('update');
				$('#id').val(data.ids);
				$('#form_action3').val('Update');
				$('#user_dialog3').dialog('open');
			}
		});
	});



$(document).on('click', '.gen', function(){

		var id = $(this).attr('id');
		var action = 'fetch_single';
		$.ajax({
			url:"includes/user_registration_action.php",
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
	



	            $("#med_name").change(function(){
                var name = $('#med_name').val();
                
                $.ajax({
                    url: 'includes/weight.php',
                    type: 'post',
                    data: {name:name},
                    dataType: 'json',
                    success:function(response){
                    	
                        var len = response.length;

                        $("#weight").empty();
                        for( var i = 0; i<len; i++){
                            var weight = response[i]['weight'];

                            $("#weight").append("<option value='"+weight+"'>"+weight+"</option>");

                        }
                    }
                });
            });


	$(document).on('click', '.del', function(){
		var id = $(this).attr('id');
				var action = 'delete';
				$.ajax({
					url:"includes/stock_action2.php",
					method:"POST",
					data:{id:id, action:action},
					success:function(data)
					{
						alert('Successfully Deleted');
						location.reload();
					}
				});  
				});
	
}); 
