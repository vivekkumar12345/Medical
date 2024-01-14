$(document).ready(function(){  

	load_data();
    
	function load_data()
	{
		$.ajax({
			url:"includes/test_fetch.php",
			method:"POST",
			success:function(data)
			{
				$('#user_data').html(data);
			}
		});
	}
	
							
	
	$("#user_dialog").dialog({
		autoOpen:false,
		width:'800',
		maxWidth:600,
		height:'600'
	});


$(document).on('click', '.view', function(){
		var id = $(this).attr('id');
		var action = 'fetch_single';
		$.ajax({
			url:"includes/test_action.php",
			method:"POST",
			data:{id:id, action:action},
			dataType:"json",
			success:function(data)
			{
				$('#ids').val(data.ids);
				$('#user_dialog').attr('title', 'Edit Data');
				$('#user_dialog').dialog('open');
			}
		});
	});






});
