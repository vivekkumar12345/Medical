$(document).ready(function(){  

	load_data();
    
	function load_data()
	{
		$.ajax({
			url:"includes/list_fetch.php",
			method:"POST",
			success:function(data)
			{
				$('#user_data').html(data);
			}
		});
	}
	
});

