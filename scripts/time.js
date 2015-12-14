/**
 * Created by SKYROCK on 11/20/2015.
 */

"use strict";


(function () {

    //Clock variable initialisation
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

    //Alarm variable initialisation
    var alarmInput = "";
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var alarmYear = "";
    var alarmMonth = "";
    var alarmDate = "";
    var alarmHour = "";
    var alarmMinutes = "";




    //Countdown variable initialisation
    var countdownRemainingTime;
    var countdownSecs = 0;
    var countdownMins = 0;
    var countdownHours = 0;
    var countdownDeadline;
    var countdownInput = "";
    var countdownYear = "";
    var countdownMonth = "";
    var countdownDate = "";
    var countdownHour = "";
    var countdownMinutes = "";


    //Stopwatch variable initialisation
    var stopwatchTime = 0;
    var stopwatchStatus = 0;
    var stopwatchHours = 0;
    var stopwatchMins = 0;
    var stopwatchSecs = 0;
    var stopwatchTenths = 0;


    /*Display Clock */
    function showTime() {
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
        if (currentHour === 0) {
            currentHour = 12;
        }
        if (currentHour > 12) {
            currentHour = currentHour - 12;
        }

        //Display Time with Day MMM DD YYYY format
        document.getElementById("#myClock").innerHTML = (currentHour ? (currentHour >= 9 ? currentHour : "0" + currentHour) : "00") + ":" + (currentMinutes ? (currentMinutes > 9 ? currentMinutes : "0" + currentMinutes) : "00") + ":" + (currentSeconds > 9 ? currentSeconds : "0"+ currentSeconds) + " " + am_pm;
        document.getElementById("#myYear").innerHTML = currentDay + " " + currentMonth + " " + currentDate + " " + currentYear;
    }

    //Every second checks for time
    setInterval(showTime, 1000);


    /*Display Alarm*/
    document.getElementById("#alarm").innerHTML = "YYYY" + " " + "MMM" + " " + "DD" + ", " + "HH" + ":" + "MM" +" "+ "AM/PM";
    function startAlarm(event) {

        //Get user values for alarm
        alarmInput = document.getElementById("#myAlarm").value;

        //Seperate year, month, date,countdownHours, minutes from user values
        alarmYear = alarmInput.substring(0, 4);
        alarmMonth = alarmInput.substring(5, 7);
        alarmDate = alarmInput.substring(8, 10);
        alarmHour = alarmInput.substring(11, 13);
        alarmMinutes = alarmInput.substring(14, 16);

        //Function to convert month in terms of alphabeticals
        function displayMonth(alarmMonths) {
            if (alarmMonths <= 12) {
                alarmMonth = months[(alarmMonths - 1)];
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

        if (alarmHour === 0) {
            alarmHour = 12;
        }
        if (alarmHour > 12) {
            alarmHour = alarmHour - 12;
            if (alarmHour < 10) {
                alarmHour = "0" + alarmHour;
            }
        }

        //Display user alarm
        if (alarmInput === "") {
            alert("Did you set proper ALARM?!!");
        } else {
            document.getElementById("#alarm").innerHTML = alarmYear + " " + alarmMonth + " " + alarmDate + ", " + alarmHour + ":" + alarmMinutes +" "+ am_pm;
        }
        event.preventDefault();
    }


    //Every second checks for alarm time
    setInterval(triggerAlarm, 1000);


    //Triggers alarm music(preloaded) when alarm time occurs
    function triggerAlarm() {
        if (currentYear === alarmYear && currentMonth === alarmMonth && currentDate === alarmDate && currentHour === alarmHour && currentMinutes === alarmMinutes && true) {
            document.getElementById("#alarmMusic").play();
            setInterval(function () {
                document.getElementById("#alarm").style.color = "red";
                setTimeout(function () {
                    document.getElementById("#alarm").style.color = "lime";
                },500);
            }, 1000);
        }
    }

    document.getElementById("#alarmStart").addEventListener("click", startAlarm, false);

    /* Display countdown*/
    document.getElementById("#countdownOutput").innerHTML = "00 Days, 00 Hours, 00 Mins, 00 Secs";
    function countdownStart(event) {

        function updateCountdown() {
            countdownRemainingTime = Date.parse(countdownDeadline) - Date.now();
            countdownSecs = Math.floor((countdownRemainingTime / 1000) % 60);
            countdownMins = Math.floor((countdownRemainingTime / 1000 / 60) % 60);
            countdownHours = Math.floor((countdownRemainingTime / (1000 * 60 * 60)) % 24);
            days = Math.floor(countdownRemainingTime / (1000 * 60 * 60 * 24));
            document.getElementById("#countdownOutput").innerHTML = (days ? (days < 10 ? "0"+days : days): "00") + " Days, " + (countdownHours ? (countdownHours < 10 ? "0"+countdownHours : countdownHours) : "00") + " Hours, " + (countdownMins ? (countdownMins < 10 ? "0"+countdownMins : countdownMins) : "00") + " Mins, " + (countdownSecs ? (countdownSecs < 10 ? "0"+countdownSecs : countdownSecs) : "00") + " Secs";
        }

        //Get user values for alarm
        countdownInput = document.getElementById("#myCountdown").value;

        //Seperate year, month, date,countdownHours, minutes from user values
        countdownYear = countdownInput.substring(0, 4);
        countdownMonth = countdownInput.substring(5, 7);
        countdownDate = countdownInput.substring(8, 10);
        countdownHour = countdownInput.substring(11, 13);
        countdownMinutes = countdownInput.substring(14, 16);

        //Function to convert month in terms of alphabeticals
        function displayMonth(countdownMonths) {
            if (countdownMonths <= 12) {
                countdownMonth = months[(countdownMonths - 1)];
            }
            return countdownMonth;
        }
        //Convert month
        countdownMonth = displayMonth(countdownMonth);
        //Display AM/PM
        if (countdownHour < 12) {
            am_pm = "<span>AM</span>";
        } else {
            am_pm = "<span>PM</span>";
        }
        if (countdownHour === 0) {
            countdownHour = 12;
        }
        if (countdownHour > 12) {
            countdownHour = countdownHour - 12;
            if (countdownHour < 10) {
                countdownHour = "0" + countdownHour;
            }
        }

        //Display user alarm
        if (countdownInput === "") {
            alert("Did you set proper DEADLINE?!!");
        } else {
            countdownDeadline = countdownMonth + " " + countdownDate + " " + countdownYear + " " + countdownHour + ":" + countdownMinutes;

            setInterval(updateCountdown, 1000);
        }
        event.preventDefault();
    }

    document.getElementById("#countdownStart").addEventListener("click", countdownStart, false);

    /* Display stopwatch*/
    document.getElementById("#stopwatch").innerHTML = "0" + stopwatchHours + ":" + "0" + stopwatchMins + ":" + "0" + stopwatchSecs + ":" + "0" + stopwatchTenths;

    function stopwatchStart(event) {
        if (stopwatchStatus === 0) {
            stopwatchStatus = 1;
            stopwatchIncrement();
            document.getElementById("#stopwatchStart").innerHTML = "Pause";
        } else {
            stopwatchStatus = 0;
            document.getElementById("#stopwatchStart").innerHTML = "Resmume";
        }
        event.preventDefault();
    }

    function stopwatchIncrement() {
        setInterval(function () {
            if (stopwatchStatus === 1) {
                stopwatchTime++;
                stopwatchHours = Math.floor((((stopwatchTime / 100) / 60) / 60) % 60);
                stopwatchMins = Math.floor(((stopwatchTime / 100) / 60) % 60);
                stopwatchSecs = Math.floor((stopwatchTime / 100) % 60);
                stopwatchTenths = Math.floor(stopwatchTime % 100);

                document.getElementById("#stopwatch").innerHTML = (stopwatchHours ? (stopwatchHours < 10 ? "0"+stopwatchHours : stopwatchHours) : "00") + ":" + (stopwatchMins ? (stopwatchMins < 10 ? "0"+stopwatchMins : stopwatchMins) : "00") + ":"+ (stopwatchSecs ? (stopwatchSecs < 10 ? "0" + stopwatchSecs : stopwatchSecs) : "00") + ":" + (stopwatchTenths ? ((stopwatchTenths < 10) ? "0"+stopwatchTenths : stopwatchTenths) : "00");
            }
        }, 10);
    }

    function stopwatchStop() {
        stopwatchStatus = 0;
        stopwatchTime = 0;
        document.getElementById("#stopwatchStart").innerHTML = "Start";
        document.getElementById("#stopwatch").innerHTML = "00:00:00";
    }

    document.getElementById("#stopwatchStart").addEventListener("click", stopwatchStart, false);
    document.getElementById("#stopwatchStop").addEventListener("click", stopwatchStop, false);


})();