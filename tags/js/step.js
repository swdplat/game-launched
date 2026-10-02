// JavaScript Document
$(document).ready(function() {
	
	$("#prevBtn1").hide()
	$("#step-content-1").show()
	$("#step-content-2").hide()
	$("#step-content-3").hide()
	$("#step-content-4").hide()
	$("#step-content-5").hide()
	
	$("#nextBtn1").click(function(){
      $("#step-content-1").hide()
      $("#step-content-2").show()
      $("#step-content-3").hide()
	  $("#step-content-4").hide()
	  $("#step-content-5").hide()
	});	
	
	$("#nextBtn2").click(function(){
      $("#step-content-1").hide()
      $("#step-content-2").hide()
      $("#step-content-3").show()
	  $("#step-content-4").hide()
	  $("#step-content-5").hide()
	});
	
	$("#nextBtn3").click(function(){
      $("#step-content-1").hide()
      $("#step-content-2").hide()
      $("#step-content-3").hide()
	  $("#step-content-4").show()
	  $("#step-content-5").hide()
	});
	
	$("#nextBtn4").click(function(){
      $("#step-content-1").hide()
      $("#step-content-2").hide()
      $("#step-content-3").hide()
	  $("#step-content-4").hide()
	  $("#step-content-5").show()
	  $("#nextBtn5").hide()
	});
	
	$("#prevBtn2").click(function(){
      $("#step-content-1").show()
      $("#step-content-2").hide()
      $("#step-content-3").hide()
	  $("#step-content-4").hide()
	  $("#step-content-5").hide()
	});	
	
	$("#prevBtn3").click(function(){
      $("#step-content-1").hide()
      $("#step-content-2").show()
      $("#step-content-3").hide()
	  $("#step-content-4").hide()
	  $("#step-content-5").hide()
	});	
	
	$("#prevBtn4").click(function(){
      $("#step-content-1").hide()
      $("#step-content-2").hide()
      $("#step-content-3").show()
	  $("#step-content-4").hide()
	  $("#step-content-5").hide()
	});	
	
	$("#prevBtn5").click(function(){
      $("#step-content-1").hide()
      $("#step-content-2").hide()
      $("#step-content-3").hide()
	  $("#step-content-4").show()
	  $("#step-content-5").hide()
	});	
	
	$("#btnSubmit2").click(function(){
      $(".modal-overlay2").addClass('open')
	});	
	
	$(".modal-confirm-btn2").click(function(){
      $(".modal-overlay2").removeClass('open')
	});	
	
	$("#btnDraft").click(function(){
      $(".modal-overlay3").addClass('open')
	});	
	
	$(".modal-confirm-btn3").click(function(){
      $(".modal-overlay3").removeClass('open')
	});

});

