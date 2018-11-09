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
                type: "GET",
                url: "http://localhost:3000/users?email="+email,
                // data: $("#signin-form").serialize(),
                dataType: "JSON",
                beforeSend: function() {
                    $(".show-progress").addClass("progress");
                },
                success: function(feedback) {
                    if (feedback.length == 0) {
                        swal({
                            title: "Invalid Username or Password",
                            text: "click to try again",
                            type: "error",
                            closeOnConfirm: true,
                            showLoaderOnConfirm: true
                        });   
                    } else {
                        var unhashed = CryptoJS.AES.decrypt(feedback[0].password, "password secret").toString(CryptoJS.enc.Utf8);
                        
                        if (unhashed === password) {
                            var date = new Date();
                            date.setTime(date.getTime() + (60 * 1000));
                            $.cookie("username", feedback[0].name, {expires: date});
                            $.cookie("userid", feedback[0].email, {expires: 10});
                            window.location.href = "http://localhost:5500/scratchcard/dashboard.html";
                        } else {
                            alert("Invalid login");                           
                        }
                    }
                }
            });
        }
    });
});