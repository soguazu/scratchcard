/*eslint-env jquery*/

$(document).ready(function() {
    let email = "";
    let password = "";

    $("#login-email").focusout(function() {
        let email_store = $.trim($("#login-email").val());
        if(email_store.length == "") {
            $("#login-email").addClass("border-red");
            $("#login-email").removeClass("border-green");
            $(".login-email-error").html("Email is required");
            email = "";
        } else {
            $("#login-email").removeClass("border-red");
            $(".login-email-error").html("");
            email = email_store;
        }
    });

    $("#login-password").focusout(function() {
        let password_store = $.trim($("#login-password").val());
        if (password_store.length == "") {
            $("#login-password").addClass("border-red");
            $("#login-password").removeClass("border-green");
            $(".login-password-error").html("Password is required");
            password = "";
        } else {
            $("#login-password").removeClass("border-red");
            $(".login-password-error").html("");
            password = password_store;
        }
    });

    // ===  Submit the login form  ===
    $("#login-submit").click(function() {
        if (email.length == "") {
            $("#login-email").addClass("border-red");
            $("#login-email").removeClass("border-green");
            $(".login-email-error").html("Email is required");
            email = "";
        } 
        if (password.length == "") {
            $("#login-password").addClass("border-red");
            $("#login-password").removeClass("border-green");
            $(".login-password-error").html("Password is required");
            password = "";
        }
        if (email !== "" && password !== "") {
            $.ajax({
                type: "POST",
                url: "/?login=true",
                data: $("#signin-form").serialize(),
                dataType: "JSON",
                beforeSend: function() {
                    $(".show-progress").addClass("progress");
                },
                success: function(feedback) {
                    if (feedback["type"] == "success") {
                        $(".login-error").html("");
                        $(".login-error").addClass("progress");
                        setTimeout(function() {
                            window.location.href = feedback["path"];
                        }, 1000);
                    } else if(feedback["type"] == "error") {
                        $(".login-error").html(feedback["message"]);
                        
                    } 
                }
            });
        }
    });
});