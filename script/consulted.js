$(document).ready(function(){  

	load_data();
    
	function load_data()
	{
		$.ajax({
			url:"includes/consulted_fetch.php",
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
	
$(document).on('click', '.view', function(){
		var id = $(this).attr('id');
		var action = 'fetch_single';
		$.ajax({
			url:"includes/consulted_action.php",
			method:"POST",
			data:{id:id, action:action},
			dataType:"json",
			success:function(data)
			{
				$('#diag').val(data.diag);
				$('#user_dialog').attr('title', 'Edit Data');
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

