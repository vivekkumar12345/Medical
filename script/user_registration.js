$(document).ready(function(){  

	load_data();
    
	function load_data()
	{
		$.ajax({
			url:"includes/user_registration_fetch.php",
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
	
	
	$('#user_form').on('submit', function(event){
			event.preventDefault();
			$('#form_action').attr('disabled', 'disabled');
			var form_data = $(this).serialize();
			$.ajax({
				url:"includes/user_registration_action.php",
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
			url:"includes/user_registration_action.php",
			method:"POST",
			data:{id:id, action:action},
			dataType:"json",
			success:function(data)
			{
				$('#rel').val(data.rel);
				$('#name_of_patient').val(data.name_of_patient);
				$('#age').val(data.age);
				$('#month').val(data.month);
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
			url:"includes/user_registration_action.php",
			method:"POST",
			data:{id:id, action:action},
			dataType:"json",
			success:function(data)
			{
				$('#rel1').val(data.rel).attr('disabled', 'disabled');
				$('#name_of_patient1').val(data.name_of_patient).attr('disabled', 'disabled');
				$('#age1').val(data.age).attr('disabled', 'disabled');
				$('#month1').val(data.month).attr('disabled', 'disabled');
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

	
		


            $("#service").change(function(){
                var name = $('#service').val();
                if(name=='Army'){
                	$("#rank").empty();
                	{
                		$("#rank").append("<option value='Sepoy'>Sepoy</option>");
                		$("#rank").append("<option value='Lance Naik'>Lance Naik</option>");
                		$("#rank").append("<option value='Naik'>Naik</option>");
                		$("#rank").append("<option value='Havaldar'>Havaldar</option>");
                		$("#rank").append("<option value='Nb Subedar'>Nb Subedar</option>");
                		$("#rank").append("<option value='Subedar'>Subedar</option>");
                		$("#rank").append("<option value='Subedar Major'>Subedar Major</option>");
                		$("#rank").append("<option value='Lieutenant'>Lieutenant</option>");
                		$("#rank").append("<option value='Captain'>Captain</option>");
                		$("#rank").append("<option value='Major'>Major</option>");
                		$("#rank").append("<option value='Lt Colonel'>Lt Colonel</option>");
                		$("#rank").append("<option value='Colonel'>Colonel</option>");
                		$("#rank").append("<option value='Brigadier'>Brigadier</option>");
                		$("#rank").append("<option value='Maj General'>Maj General</option>");
                		$("#rank").append("<option value='Lt General'>Lt General</option>");
                		$("#rank").append("<option value='General'>General</option>");
                	}

                }           

                 if(name=='Airforce'){
                	$("#rank").empty();
                	{
                		$("#rank").append("<option value='Aircraftsman'>Aircraftsman</option>");
                		$("#rank").append("<option value='Leading Aircraftsman'>Leading Aircraftsman</option>");
                		$("#rank").append("<option value='Corporal'>Corporal</option>");
                		$("#rank").append("<option value='Sergeant'>Sergeant</option>");
                		$("#rank").append("<option value='Junior Warrant Officer'>Junior Warrant Officer</option>");
                		$("#rank").append("<option value='Warrant Officer'>Warrant Officer</option>");
                		$("#rank").append("<option value='Master Warrant Officer'>Master Warrant Officer</option>");
                		$("#rank").append("<option value='Flying Officer'>Flying Officer</option>");
                		$("#rank").append("<option value='Flight Lieutenant'>Flight Lieutenant</option>");
                		$("#rank").append("<option value='Squadron Leader'>Squadron Leader</option>");
                		$("#rank").append("<option value='Wing Commander'>Wing Commander</option>");
                		$("#rank").append("<option value='Group Captain'>Group Captain</option>");
                		$("#rank").append("<option value='Air Commodore'>Air Commodore</option>");
                		$("#rank").append("<option value='Air Vice Marshal'>Air Vice Marshal</option>");
                		$("#rank").append("<option value='Air Marshal'>Air Marshal</option>");
                		$("#rank").append("<option value='Air Chief Marshal'>Air Chief Marshal</option>");
                	}

                } 
if(name=='Navy'){
                	$("#rank").empty();
                	{
                		$("#rank").append("<option value='Seaman'>Seaman</option>");
                		$("#rank").append("<option value='Leading Seaman'>Leading Seaman</option>");
                		$("#rank").append("<option value='Able Seaman'>Able Seaman</option>");
                		$("#rank").append("<option value='Petty Officer'>Petty Officer</option>");
                		$("#rank").append("<option value='Chief Petty Officer'>Chief Petty Officer</option>");
                		$("#rank").append("<option value='Master Chief Petty Officer (Second Class)'>Master Chief Petty Officer (Second Class)</option>");
                		$("#rank").append("<option value='Master Chief Petty Officer (First Class)'>Master Chief Petty Officer (First Class)</option>");
                		$("#rank").append("<option value='Sub-Lieutenant'>Sub-Lieutenant</option>");
                		$("#rank").append("<option value='Lieutenant'>Lieutenant</option>");
                		$("#rank").append("<option value='Lieutenant Commander'>Lieutenant Commander</option>");
                		$("#rank").append("<option value='Commander'>Commander</option>");
                		$("#rank").append("<option value='Captain'>Captain</option>");
                		$("#rank").append("<option value='Commodore'>Commodore</option>");
                		$("#rank").append("<option value='Rear Admiral'>Rear Admiral</option>");
                		$("#rank").append("<option value='Vice Admiral'>Vice Admiral</option>");
                		$("#rank").append("<option value='Admiral'>Admiral</option>");
                	}

                }




                 });

	
}); 
