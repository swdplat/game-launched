// JavaScript Document
$(document).ready(function() {
						   
	$(".sidebar").show()
	$(".hamburger2").hide()
	
	$(".hamburger").click(function(){
	  $(".sidebar").hide('fast')
	  $(".hamburger").hide()
	  $(".hamburger2").show()
	});
	
	$(".hamburger2").click(function(){
	  $(".sidebar").show('middle')
	  $(".hamburger2").hide()
	  $(".hamburger").show()
	});
	
	
});

