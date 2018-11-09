/*eslint-env jquery*/
$(document).ready(function() {
    $("#login").click(function() {
        $(".signup-cover").hide("slow");
        $(".login-cover").show("slow");
    });

    $("#signup").click(function() {
        $(".signup-cover").show("slow");
        $(".login-cover").hide("slow");
    });

    
});