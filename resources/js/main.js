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

    $(document).ready(function(){
        $("#filter").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#myTable tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });
    });

    
    $("#generate").click(function() {
        var date = $("#date").val();
        var amount = $("#amount").val();
        var type = $("#type").val();
        var quantity = $("#quantity").val();
        // var pin = [];
        var userId = $.cookie("id");
        // var serialNo = [];
        
        for (var i = 0; i < quantity; i++) {
            var serialNo = (Math.random()+" ").substring(2,6)+(Math.random()+" ").substring(2,6);

            var pin = (Math.random()+" ").substring(2,10)+(Math.random()+" ").substring(2,10);

            var cards = {"pin": pin, "serialNo":serialNo, "date": date, "type": type, "amount": amount, "userId": userId};


            $.ajax({
                type: "POST",
                // contentType: "application/json; charset=utf-8",
                url: "http://localhost:3000/cards",
                data: cards,
                dataType: "JSON",
                success: function() {
                    window.location = "http://localhost:5500/scratchcard/dashboard.html";
                },
                error: function(response) {
                    console.log(response);
                    // alert("something went wrong");
                }
            }); 
            
        }
 

        $("#date").val("");
        $("#amount").val("");
        $("#type").val("");
        $("#quantity").val("");
                     
    });

    
    $(document).on("click","#delete", function(){

        // var closestTr = $(":checkbox:checked").closest("tr").attr("id");
        var closestTr = $(this).closest("tr").attr("id");
        // alert(closestTr);

        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this file!",
            type: "warning",
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }).then(function (isConfirm) {
            if (!isConfirm.value) return;
            $.ajax({
                url: "http://localhost:3000/cards/" + closestTr,
                type: "DELETE",
                dataType: "JSON",
                success: function () {
                    swal("Done!", "It was succesfully deleted!", "success");
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    swal("Error deleting!", "Please try again", "error");
                }
            });
        });
    
    }); 

    $(".close").click(function() {
        window.location = "http://localhost:5500/scratchcard/dashboard.html";
    });


    $(document).on("click","#edit", function(){
        var closestTr = $(this).closest("tr").attr("id");
        
        if (closestTr) {
            // $(this).prop("disabled", true);
            $.ajax({
                type: "GET",
                url: "http://localhost:3000/cards/"+closestTr,
                dataType: "JSON",
                success: function(response) {
                    var markup = "<div class='generate-card-form2 mt-2'><form><div class='form-group'><input type='date' class='form-control' id='date' placeholder='Date Created' value='"+ response.date +"'><input type='text' class='form-control' id='id' value='"+ response.id +"' hidden><input type='text' class='form-control' id='serialNo' value='"+ response.serialNo +"' hidden><input type='text' class='form-control' id='pin' value='"+ response.pin +"' hidden><input type='text' class='form-control' id='userId' value='"+ response.userId +"' hidden></div><div class='form-row'><div class='form-group col-md-6'><input type='text' class='form-control' id='amount' placeholder='Amount' value='"+response.amount+"'></div><div class='form-group col-md-6'><select id='type' class='form-control'><option selected>"+response.type+"</option><option>Mtn</option><option>Glo</option><option>Airtel</option></select></div><button type='button' class='btn btn-primary btn btn-block rounded-5 form-btn' id='update'>Update</button></form></div>";
                    
                    $(".modal-body").append(markup);
                    
                }
            });
        }
    });





    $(document).on("click","#update", function(){
        var id = $("#id").val();
        var date = $("#date").val();
        var amount = $("#amount").val();
        var type = $("#type").val();
        // var quantity = $("#quantity").val();
        var userId = $("#userId").val();
        var serialNo = $("#serialNo").val();
        var pin = $("#pin").val();




        var updateCard = {"pin": pin, "serialNo":serialNo, "date": date, "type": type, "amount": amount, "userId": userId};
        $.ajax({
            type: "PUT",
            url: "http://localhost:3000/cards/"+id,
            data: updateCard,
            dataType: "JSON",
            success: function() {
                swal({
                    title: "It was succesfully updated!",
                    text: "click to continue",
                    type: "success"
                }).then(function() {
                    window.location = "http://localhost:5500/scratchcard/dashboard.html";
                });
                        
            },
            error: function(xhr, ajaxOptions, thrownError) {
                swal("Error deleting!", "Please try again", "error");
            }

        });
    });


    $(document).on("click","#view", function(){
        var closestTr = $(this).closest("tr").attr("id");

        
        
        if (closestTr) {
            $.ajax({
                type: "GET",
                url: "http://localhost:3000/cards/"+closestTr,
                dataType: "JSON",
                success: function(response) {
                    JSON.stringify(response);
                    swal({
                        title: "<strong><u>ROW DETAILS</u></strong>",
                        html:
                          "<div class='alert-format mt-4'>"+
                          "<span class='one'>Serial No:</span> <strong><span class='two'>" + response.serialNo +"</strong></span><br>" +
                          "<span class='one'>Date Generated:</span> <strong><span class='two'>" + response.date +"</strong></span><br>" +
                          "<span class='one'>Recharge Type: </span><strong><span class='two'>" + response.type +"</strong></span><br>" +
                          "<span class='one'>Recharge Amount: </span><strong><span class='two'>&#x20A6;" + response.amount +"</strong></span><br>" +
                          
                          "</div>"

                    });
                }
            });
        }
    });

   

});