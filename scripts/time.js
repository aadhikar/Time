/**
 * Created by SKYROCK on 11/20/2015.
 */

"use strict";


(function(){



    var am_pm = "";
    var today = new Date();
    var currentHour = today.getHours();
    var currentMinutes = today.getMinutes();
    var currentSeconds = today.getSeconds();
    var requiredResult = today.toDateString();
    var currentDay = requiredResult.substring(0, 3);
    var currentMonth = requiredResult.substring(4, 7);
    var currentDate = requiredResult.substring(8, 10);
    var currentYear = requiredResult.substring(11, 15);
    var alarmInput = "";
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var alarmYear = "";
    var alarmMonth = "";
    var alarmDate = "";
    var alarmHour = "";
    var alarmMinutes = "";


//Display Clock
    function showTime (){
         today = new Date();
         currentHour = today.getHours();
         currentMinutes = today.getMinutes();
         currentSeconds = today.getSeconds();
         requiredResult = today.toDateString();
         currentDay = requiredResult.substring(0, 3);
         currentMonth = requiredResult.substring(4, 7);
         currentDate = requiredResult.substring(8, 10);
         currentYear = requiredResult.substring(11, 15);


        //Display AM/PM
        if (currentHour < 12) {
            am_pm = "<span>AM</span>";
        } else {
            am_pm = "<span>PM</span>";
        }
        if (currentHour == 0) {
            currentHour = 12;
        }
        if (currentHour > 12) {
            currentHour =currentHour - 12;
        }




        //Zero padding function
        function checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }


        //Check for ZERO padding
        currentHour = checkTime(currentHour);
        currentMinutes = checkTime(currentMinutes);
        currentSeconds = checkTime(currentSeconds);

        //Display Time with Day MMM DD YYYY format
        document.getElementById("#myClock").innerHTML = currentHour +":"+ currentMinutes +":"+ currentSeconds + " "+ am_pm;
        document.getElementById("#myYear").innerHTML = currentDay +" "+ currentMonth +" "+ currentDate + " "+ currentYear;

    }

//Every second checks for time
    setInterval(showTime, 1000);


//Display Alarm
    function addAlarm(){

        //Get user values for alarm
        alarmInput = document.getElementById("#mySeconds").value;


        //Seperate year, month, date, hours, minutes from user values
        alarmYear = alarmInput.substring(0,4);
        alarmMonth = alarmInput.substring(5,7);
        alarmDate = alarmInput.substring(8,10);
        alarmHour = alarmInput.substring(11,13);
        alarmMinutes = alarmInput.substring(14,16);

        //Function to convert month in terms of alphabeticals
        function displayMonth(alarmMonths){
            if(alarmMonths<=12){
                alarmMonth = months[(alarmMonths-1)];
            }
            return alarmMonth;

        }

        //Convert month
        alarmMonth = displayMonth(alarmMonth);

        //Display AM/PM
        if (alarmHour < 12) {
            am_pm = "<span>AM</span>";
        } else {
            am_pm = "<span>PM</span>";
        }

        if (alarmHour == 0) {
            alarmHour = 12;
        }
        if (alarmHour > 12) {
            alarmHour = "0" + (alarmHour - 12);
        }


        //Display user alarm
        if(alarmInput === ""){
            alert("Did you set your alarm?!!");
        } else{
            document.getElementById("#alarm").innerHTML = "Alarm : "+ alarmYear+ " " +alarmMonth+ " " +alarmDate+ ", " +alarmHour+ ":" +alarmMinutes+" "+am_pm;
        }

    }

//Every second checks for alarm time
    setInterval(triggerAlarm, 1000);


//Triggers alarm music(preloaded) when alarm time occurs
    function triggerAlarm(){
        if(currentYear <= alarmYear && currentMonth <= alarmMonth && currentDate <= alarmDate && currentHour <= alarmHour && currentMinutes == alarmMinutes && true){
            document.getElementById("#alarmMusic").play();

        }
    }

document.getElementById("#button").addEventListener("click", addAlarm);

})();

