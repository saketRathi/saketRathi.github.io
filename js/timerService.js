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
}

function boughtProduct() {
    $("#buyForm").hide();
}