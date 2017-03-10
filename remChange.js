// JavaScript Document
(function (global){
	function remChange ()
	{
		document.documentElement.style.fontSize=20*document.documentElement.clientWidth/320+'px';	
	}
	remChange();
	global.addEventListener('risize',remChange,false);
})(window);