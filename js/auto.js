function menu(){
		var b=document.getElementById("open");
		var a=document.getElementById("menu");
		var c=document.getElementById("close");
if(a.style.display=='none')
		{
		b.style.display='none';		
		a.style.display='block';
		c.style.display='block';
}

else{
b.style.display='block';		
		a.style.display='none';
		c.style.display='none';

	}
}


function login(){

var a = document.getElementById("user-login");
if(a.style.display=="none")
{
	a.style.display="block"; 
}
else {
	a.style.display="none"; 
}
}
function logout(){

var a = document.getElementById("user-logout");
if(a.style.display=="none")
{
	a.style.display="block"; 
}
else {
	a.style.display="none"; 
}
}

	function closeit()
	{
		var a = document.getElementById("user-login");
		a.style.display="none";

	}
