var startTime;
var interval;
var inFlashSale = false;

$( document ).ready(function() {
    console.log( "Timer started" );
    $(".after-sale").hide();
    startTimer();
    $("#flashSaleOverlay").hide();
    $("#buyForm").hide();
    $("#timer").hide();
});

function startTimer() {
    startTime = new Date().getTime();
    setTimeout(show, 3000);
}

function show() {
    $("#flashSaleOverlay").show();
}

function flashOffer() {
    console.log("in flash offer");
    inFlashSale = true;
    $("#flashSaleOverlay").hide();
    $(".after-sale").show();
    $(".before-sale").hide();
    $("#timer").show();
    interval = setInterval(changeTime, 1000);
}

function changeTime() {
    var minutes = parseInt($("#minutes").text());
    var seconds = parseInt($("#seconds").text());

    console.log("minutes = "+ minutes + "seconds = "+seconds);
    if(minutes === 0 && seconds === 0) {
        clearInterval(interval);
        $("#productGrid").attr("src", "./html/productGrid.html");
        $("#timer").hide();
        $(".after-sale").hide();
        $(".before-sale").show();
        inFlashSale = false;
    } else {
        if(seconds === 0) {
            $("#seconds").html(59);
            var nextMinutesVal = (minutes - 1);
            var minuteStr = nextMinutesVal.toString();
            if(nextMinutesVal >= 0 && nextMinutesVal <=9){
                $("#minutes").html("0".concat(minuteStr));
            } else {
                $("#minutes").html(minuteStr);
            }
        } else {
            var nextSecondsVal = (seconds - 1);
            var secondsStr = nextSecondsVal.toString();
            if(nextSecondsVal >= 0 && nextSecondsVal <= 9){
                $("#seconds").html("0".concat(secondsStr));
            }else {
                $("#seconds").html(secondsStr);
            }
        }
    }

}

function buyProduct(bookName) {
    $("#buyForm").show();
    console.log(" book name = "+ bookName);
    $("#productToBuy").text(bookName);
}

function boughtProduct() {
    $("#buyForm").hide();
    console.log(" name = "+ $("#name").val());
    console.log(" quantity = "+ $("#quantity").val());
    console.log(" product to buy = "+ $("#productToBuy").text());
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-68219561-1', 'auto');
    ga('send', {
        hitType: inFlashSale? "Flash Sale" : "Normal",
        eventCategory:  $("#productToBuy").text(),
        eventAction: $("#quantity").val(),
        eventLabel: $("#name").val()
    });
}

function removeForm(e) {
        var t = (e.target);
        console.log(" t = "+t);
        if(t!= $("#name").get(0) && t!=$("#quantity").get(0) && t!=$("#buyButton").get(0)  && t!= $("#address").get(0)) {
            $("#buyForm").hide();
        }
}