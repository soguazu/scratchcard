/*eslint-env jquery*/

$(document).ready(function() {
    $("#logout").click(function() {
        $.cookie("userid", null);
        window.location.href = "http://localhost:5500/scratchcard";
    });
});