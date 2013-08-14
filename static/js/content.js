function loadcont(file, id)
{
  document.getElementById(id).innerHTML="<Loading>";
  var xmlhttp;
  if (window.XMLHttpRequest) xmlhttp=new XMLHttpRequest();
  else  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");

  xmlhttp.onreadystatechange=function()
    {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) document.getElementById(id).innerHTML=xmlhttp.responseText;
    }
  xmlhttp.open("GET", file, true);
  xmlhttp.send();
}