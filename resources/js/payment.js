// MY EXPERIENCE IN DECAGON BOOTCAMP
// It was such an exciting experience. I learned a whole lot of new stuffs and made new friends, and some of those friends made the learning very easy. 
// Mr. Kingsley, Mr. David and Mr. Austin all made the learning worthwhile. 
// I'm grateful for everything so far, my tutors and friends, God bless you guys and i can't wait to learn more stuffs and conquer more challenges.
// Special thanks goes to Franklin, Austin, Grace, Bosa.
/*eslint-env jquery*/

$(document).ready(function() {
    
    $("#payBtn").on("click", function() {
        

        let account = "";
        let month = "";
        let year = "";
        let cvc = "";

        // $("#account").focusout(function() {
        //     let account_store = $.trim($("#account").val());
        //     if(account_store.length == "") {
        //         $("#account").addClass("border-red");
        //         $("#account").removeClass("border-green");
        //         $(".account-error").html("Email is required");
        //         account = "";
        //     }  else {
        //         $("#account").removeClass("border-red");
        //         $(".account-error").html("");
        //         account = account_store;
        //     }
        // });

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/cards?status=UNPAID",
            dataType: "JSON",
            success: function(response) {
                JSON.stringify(response);
                updatePayment(response);
            },
            error: function() {
                alert("Something went wrong!");
            }
        });
    });

    function updatePayment(data) {
        var newData = {};
        var convertedData;
        var newData2;
        for (var i = 0; i < data.length; i++) {
            if (data[i].status == "UNPAID") {
                
                newData["id"] = data[i].id;
                newData["date"] = data[i].date;
                newData["amount"] = data[i].amount;
                newData["type"] = data[i].type;
                newData["status"] = "PAID";
                newData["userId"] = data[i].userId;
                newData["serialNo"] = data[i].serialNo;
                newData["pin"] = data[i].pin;
                newData["name"] = data[i].name;
                
                $.ajax({
                    type: "PUT",
                    url: "http://localhost:3000/cards/"+data[i].id,
                    data: newData,
                    dataType: "JSON",
                    success: function() {
                        swal({
                            title: "Payment made successfully!",
                            text: "click to continue",
                            type: "success"
                        }).then(setTimeout(function() {
                            window.location = "http://localhost:5500/scratchcard/dashboard.html";
                        }, 3000));
                                
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        swal("Error updating!", "Please try again", "error");
                    }
        
                });
        
            }
        }
    }
});