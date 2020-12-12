var currScene=0; //0 means mainTopic, 1 means SubTopic1, etc.

$(function(){
    $(".nav1").on("click",ShowHomePage);
    $(".nav2").on("click",ShowLocationPage);
    $(".nav3").on("click",ShowSafetyTipsPage);
    $(".nav4").on("click",ShowEquipmentsPage);
    $(".btn_ham").on("click",ShowHamMenu); 
    $(".cross").on("click",CloseHamMenu);
    $(".back").on("click",ShowLocationPage);
    $(".section6").on("click",ShowNorthPage);
    $(".section7").on("click",ShowWestPage);
    $(".section8").on("click",ShowEastPage);
    $(".section9").on("click",ShowSouthPage);
//    $(".dropdown-arrow").on("click",ShowDropDown);
//    $(".dropdown-arrow").dblclick("click",GoBack);

    ShowHomePage();
    LoadLiveData();
    LoadLiveData2();
    ActivateGestures();
});

function ShowDropDown(){
    $(".dropdown").addClass("showup");
    $(".dropdown-arrow").addClass("rotate");
}

function GoBack(){
    $(".dropdown").removeClass("showup");
    $(".dropdown-arrow").removeClass("rotate");
}

function ActivateGestures(){
    var myElement = document.getElementsByClassName('dropdown');
    var mc = new Hammer(myElement);
    mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    mc.on("swipeup swipedown", function(ev){
        console.log(ev.type +" gesture detected.");
        if(ev.type=="swipeup")
        {
            $(".dropdown").addClass("showup");
            $(".dropdown-arrow").addClass("rotate");
        }
        
        else if(ev.type=="swipedown")
        {
            $(".dropdown").removeClass("showup");
            $(".dropdown-arrow").removeClass("rotate");
        }
    });
}

function ShowHamMenu(){
	$(".hamburger-menu").show();
}

function HideScene(){
	$(".all-scene>div").hide();
}

function CloseHamMenu(){
	$(".hamburger-menu").hide();
}

function ShowHomePage(){
    HideScene();
    currScene=1;
	$(".scene1").show();
}

function ShowLocationPage(){
    HideScene();
    currScene=2;
	$(".scene2").show();
}

function ShowSafetyTipsPage(){
    HideScene();
    currScene=3;
	$(".scene7").show();
}

function ShowEquipmentsPage(){
    HideScene();
    currScene=4;
	$(".scene8").show();
}

function ShowNorthPage(){
    HideScene();
    currScene=5;
	$(".scene3").show();
}

function ShowWestPage(){
    HideScene();
    currScene=6;
	$(".scene4").show();
}

function ShowEastPage(){
    HideScene();
    currScene=7;
	$(".scene5").show();
}

function ShowSouthPage(){
    HideScene();
    currScene=8;
	$(".scene6").show();
}

//AJAX 1
var json4dayfc,fcarray;

function LoadLiveData(){
    $.ajax({
    type: "GET",
    url: "https:api.data.gov.sg/v1/environment/4-day-weather-forecast",
    })
    .done(function(json){
        json4dayfc=json;
        console.log("successfully loaded");
        console.log(json4dayfc);
        fcarray=json4dayfc.items[0].forecasts;
        console.log(fcarray);
        ShowData();
        })
    .fail(function(){
        console.log("error");
    });
}

function FindFCIndex(date2find){
    for(var a=0; a<fcarray.length; a++){
        if(date2find==fcarray[a].date){
            console.log(a);
            return a;
        }
    }
    return -1;
}

function FindFCIndex2(temperature2find){
    for(var a=0; a<fcarray.length; a++){
        if(temperature2find==fcarray[a].temperature){
            console.log(a);
            return a;
        }
    }
    return -1;
}


function ShowData(){
    //to find 1st day temperature
    var day2chk=json4dayfc.items[0].forecasts[0].date;
    var fcindex=FindFCIndex(day2chk);
    if(fcindex>-1){
        fc=fcarray[fcindex].temperature.high;
    }
    else{
        fc="(Not Available)";
    }
    console.log(fc);
    
    var html=`<p>${fcarray[fcindex].temperature.high}°C</p>`;
    $(".temperature").html(html);
    $(".temperature").attr("data-id",fcindex);
    $(".temperature2").html(html);
    $(".temperature2").attr("data-id",fcindex);
    
    
    //to find 2nd day forecast
    var day2chk=json4dayfc.items[0].forecasts[1].date;
    var fcindex=FindFCIndex(day2chk);
    if(fcindex>-1){
        fc=DataConvert(fcarray[fcindex].forecast);
        imgClass=fc;
        for(var a=0; a<fc.length; a++){
            
            if(fc=="Sunny"||fc=="Fair-&-warm.")
            {
                    imgClass="sunny";
            }
            if(fc=="Cloudy"||fc=="Cloudy."||fc=="Partly-Cloudy-_Night_"||fc=="Partly-Cloudy-_Day_")
            {
                    imgClass="cloudy";
            }
            
            if(fc=="Windy"||fc=="Windy.")
            {
                    imgClass="windy";
            }
            
            if(fc=="Rainy"||fc=="Showers."||fc=="Showers")
            {
                    imgClass="rainy";
            }

            if(fc=="Rainy Thunderstorm"||fc=="Afternoon-thundery-showers."||fc=="Thundery-Showers"||fc=="Heavy-Thundery-Showers-with-Gusty-Winds")
            {
                   imgClass="rainyThunderstorm";
            }
            
            if(fc=="Fair Night"||fc=="Fair-night.")
            {
                   imgClass="fairNight";
            }
            
            if(fc=="Fair"||fc=="Fair.")
            {
                    imgClass="fair";
            }
            
        }
    }
    else{
        fc="(Not Available)";
    }
    console.log(fc);
    
    $(".weather-icon3").addClass(imgClass);
    
    var html=`${fcarray[fcindex].forecast}`;
    $(".weather-text2").html(html);
    
    //to find 2nd day temperature
    if(fcindex>-1){
        fc=fcarray[fcindex].temperature.high;
    }
    else{
        fc="(Not Available)";
    }
    console.log(fc);
    
    var html=`<p>${fcarray[fcindex].temperature.high}°C</p>`;
    $(".temperature3").html(html);
    $(".temperature3").attr("data-id",fcindex);

    
    //to find 3rd day forecast
    var day2chk=json4dayfc.items[0].forecasts[2].date;
    var fcindex=FindFCIndex(day2chk);
    if(fcindex>-1){
        fc=DataConvert(fcarray[fcindex].forecast);
        imgClass=fc;
        for(var a=0; a<fc.length; a++){
            
            if(fc=="Sunny"||fc=="Fair-&-warm.")
            {
                    imgClass="sunny";
            }
            if(fc=="Cloudy"||fc=="Cloudy."||fc=="Partly-Cloudy-_Night_"||fc=="Partly-Cloudy-_Day_")
            {
                    imgClass="cloudy";
            }
            
            if(fc=="Windy"||fc=="Windy.")
            {
                    imgClass="windy";
            }
            
            if(fc=="Rainy"||fc=="Showers."||fc=="Showers")
            {
                    imgClass="rainy";
            }

            if(fc=="Rainy Thunderstorm"||fc=="Afternoon-thundery-showers."||fc=="Thundery-Showers"||fc=="Heavy-Thundery-Showers-with-Gusty-Winds")
            {
                   imgClass="rainyThunderstorm";
            }
            
            if(fc=="Fair Night"||fc=="Fair-night.")
            {
                   imgClass="fairNight";
            }
            
            if(fc=="Fair"||fc=="Fair.")
            {
                    imgClass="fair";
            }
            
        }
    }
    else{
        fc="(Not Available)";
    }
    console.log(fc);
    
    $(".weather-icon4").addClass(imgClass);
    
    var html=`${fcarray[fcindex].forecast}`;
    $(".weather-text3").html(html);
    
    //to find 3rd day temperature
    if(fcindex>-1){
        fc=fcarray[fcindex].temperature.high;
    }
    else{
        fc="(Not Available)";
    }
    console.log(fc);
    
    var html=`<p>${fcarray[fcindex].temperature.high}°C</p>`;
    $(".temperature4").html(html);
    $(".temperature4").attr("data-id",fcindex);

    
    updateTS=json4dayfc.items[0].update_timestamp;
}

//AJAX 2
var json2hrfc,fcarray2;

function LoadLiveData2(){
    $.ajax({
    type: "GET",
    url: "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast",
    })
    .done(function(json){
        json2hrfc=json;
        console.log("successfully loaded");
        console.log(json2hrfc);
        fcarray2=json2hrfc.items[0].forecasts;
        console.log(fcarray2);
        ShowData2();
        })
    .fail(function(){
        console.log("error");
    });
}

function FindFCIndexP2(fc2find){
    for(var a=0; a<fcarray2.length; a++){
        if(fc2find==fcarray2[a].forecast){
            console.log(a);
            return a;
        }
    }
    return -1;
}

function ShowData2(){
    //to find 1st day forecast
    var fc2chk=json2hrfc.items[0].forecasts[0].forecast;
    var fcindex=FindFCIndexP2(fc2chk);
    if(fcindex>-1){
        fc=DataConvert(fcarray2[fcindex].forecast);
        imgClass=fc;
        for(var a=0; a<fc.length; a++){
            
            if(fc=="Sunny"||fc=="Fair-&-warm.")
            {
                    imgClass="sunny";
            }
            if(fc=="Cloudy"||fc=="Cloudy."||fc=="Partly-Cloudy-_Night_"||fc=="Partly-Cloudy-_Day_")
            {
                    imgClass="cloudy";
            }
            
            if(fc=="Windy"||fc=="Windy.")
            {
                    imgClass="windy";
            }
            
            if(fc=="Rainy"||fc=="Showers."||fc=="Showers")
            {
                    imgClass="rainy";
            }

            if(fc=="Rainy Thunderstorm"||fc=="Afternoon-thundery-showers."||fc=="Thundery-Showers"||fc=="Heavy-Thundery-Showers-with-Gusty-Winds")
            {
                   imgClass="rainyThunderstorm";
            }
            
            if(fc=="Fair Night"||fc=="Fair-night.")
            {
                   imgClass="fairNight";
            }
            
            if(fc=="Fair"||fc=="Fair.")
            {
                    imgClass="fair";
            }
            
        }
    }
    else{
        fc="(Not Available)";
    }
    console.log(fc);
    
    $(".weather-icon").addClass(imgClass);
    $(".weather-icon2").addClass(imgClass);
    
    var html=`<p>${fcarray2[fcindex].forecast}.</p>`;
    $(".weather-text").html(html);
    
     updateTS=json2hrfc.items[0].update_timestamp;
}


function DataConvert(str)
{
        newstr=str.replace(/\s+/g,"-");
        newstr=newstr.replace("(","_");
        newstr=newstr.replace(")","_");
        newstr=newstr.replace("&","N");
        return newstr;
}