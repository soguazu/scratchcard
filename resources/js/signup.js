/*eslint-env jquery*/

$(document).ready(function() {
    // event.preventDefault();
    let name = "";
    let email = "";
    let password = "";
    let confirm = "";
    let name_reg = /^[a-z ]+$/i;
    let email_reg = /^[a-z]+[0-9a-zA-Z_\.]*@[a-z_]+\.[a-z]+$/;
    let password_reg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/;


    //  === Name Validations ===
    $("#name").focusout(function() {
        let name_store = $.trim($("#name").val());
        if(name_store.length == "") {
            $(".name-error").html("Name is required!");
            $("#name").addClass("border-red");
            $("#name").removeClass("border-green");
            name = "";
        } else if (name_reg.test(name_store)) {
            $(".name-error").html("");
            $("#name").addClass("border-green");
            $("#name").removeClass("border-red");
            name = name_store;
        } else {
            $(".name-error").html("Integer not allowed!");
            $("#name").addClass("border-red");
            $("#name").removeClass("border-green");
            name = "";
        }  // End of Name Validations
    });

    // === Email Validations ===

    $("#email").focusout(function() {
        let email_store = $.trim($("#email").val());
        if(email_store.length == "") {
            $(".email-error").html("Email is required!");
            $("#email").addClass("border-red");
            $("#email").removeClass("border-green");
            email = "";
        } else if (email_reg.test(email_store)) {
            alert(email_store);
            $.ajax({
                type: "GET",
                url: "http://localhost:3000/users?email="+email_store,
                dataType: "JSON",
                beforeSend: function() {
                    $(".email-error").html("<i class='fa fa-spinner fa-pulse fa-1x fa-fw text-success'></i>");
                },
                // data: {"check_email": email_store},
                success: function(feedback) {
                    setTimeout(function() {

                        if(JSON.stringify(feedback[0])) {
                            if (JSON.stringify(feedback[0].email) !== email_store) {
                                $(".email-error").html("<div class='text-success'><i class='far fa-thumbs-up'> Available</i></div>");
                                $("#email").addClass("border-green");
                                $("#email").removeClass("border-red");
                                console.log(JSON.stringify(feedback[0].email));

                                email = email_store;
                            } else if (feedback["email"] == "email_fail") {
                                $(".email-error").html("Email already exist!");
                                $("#email").addClass("border-red");
                                $("#email").removeClass("border-green");
                                email = "";
                            } 
                        } else {
                            $(".email-error").html("Email already exist!");
                            $("#email").addClass("border-red");
                            $("#email").removeClass("border-green");
                            email = "";
                        }
                    }, 1000);
                    
                },
            });
        } else {
            $(".email-error").html("Invalid email!");
            $("#email").addClass("border-red");
            $("#email").removeClass("border-green");
            email = "";
        }
    }); //Close Email Validation


    //Password Validation
    $("#password").focusout(function() {
        let password_store = $.trim($("#password").val());
        if(password_store.length == "") {
            $(".password-error").html("Password is required!");
            $("#password").addClass("border-red");
            $("#password").removeClass("border-green");
            password = "";
        } else if (password_reg.test(password_store)) {
            setTimeout(function() {
                
                $(".password-error").html("<div class='text-success'><i class='far fa-thumbs-up'> </i></div>");
                $("#password").addClass("border-green");
                $("#password").removeClass("border-red");
                password = password_store;
            }, 1000);
        } else if (password_store.length < 8) {
            $(".password-error").html("Password must be six character long");
            $("#password").addClass("border-red");
            $("#password").removeClass("border-green");
            password = "";
        } else {
            $(".password-error").html("Password must contain at least one Uppercase letter and number!");
            $("#password").addClass("border-red");
            $("#password").removeClass("border-green");
            password = "";
        }
    }); //Close password validation

    //Validate Confirm Password
    $("#confirm").focusout(function() {
        let confirm_store = $.trim($("#confirm").val());
        if (confirm_store.length == "") {
            $(".confirm-error").html("Password required!");
            $("#confirm").addClass("border-red");
            $("#confirm").removeClass("border-green");
            confirm = "";
        } else if (confirm_store !== password) {
            $(".confirm-error").html("Passwords does not match!");
            $("#confirm").addClass("border-red");
            $("#confirm").removeClass("border-green");
            confirm = "";
        } else {
            $(".confirm-error").html("<div class='text-success'><i class='far fa-thumbs-up'></i></div>");
            $("#confirm").addClass("border-green");
            $("#confirm").removeClass("border-red");
            confirm = confirm_store;
        }
    }); //Close confirm password

    // ==== Submit form ===

    $("#submit").click(function() {
        if (name.length == "" || !name_reg.test(name)) {
            $(".name-error").html("Name is required!");
            $("#name").addClass("border-red");
            $("#name").removeClass("border-green");
            name = "";
        } 
        if (email.length == "" && !email_reg.test(email)) {
            $(".email-error").html("Email is required!");
            $("#email").addClass("border-red");
            $("#email").removeClass("border-green");
            email = "";
        }

        if (password.length == "" || !password_reg.test(password)) {
            $(".password-error").html("Password is required!");
            $("#password").addClass("border-red");
            $("#password").removeClass("border-green");
            password = "";
        }

        if (confirm.length == "" || !password === confirm) {
            $(".confirm-error").html("Password required!");
            $("#confirm").addClass("border-red");
            $("#confirm").removeClass("border-green");
            confirm = "";
        }

        if (name !== "" && email !== "" && password !== "" && confirm !== "") {
            var hashPassword = aaa(password, "password secret 3895949948");
            alert(hashPassword);
            var data = {"name": name, "email":email, "password":password, "author":"grey"};
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/users",
                data: data,
                dataType: "JSON",
                beforeSend: function() {
                    $(".show-progress").addClass("progress");
                },
                success: function(response) {
                    // setTimeout(function() {
                    //     console.log(response);
                    //     alert(JSON.stringify(response));
                    //     if (feedback["error"] == "success") {
                    //         window.location.href = feedback["path"];
                    //     }
                    // }, 1000);
                    console.log("created");
                    console.log(response);
                }
            });
        }
    });

});