/*
 * @verson : 1.0
 * @contact : via mickesweb.se
 * @author :  Mikael Andersson <mikael@mickesweb.se>
 * 
 * Last Updated: 2012-02-04
 * INFO: Function to check the strength of a password.
 * NOTE: Need jquery, test with version 1.7
 * 
 * TODO: Look over the calculations and when it will switch from bad to good.
*/

$(document).ready(function() {
    $("#password").keyup(function() {
        
        var inputPassword = $("#password").val();
        
        if(inputPassword.length <= 0) {
            $("#passwordStrength").attr("class", "no");
            $("#passwordStrength").html("No password?");
            // Hide the button, shows only if password is good.
            $("#button").attr("class", "hidden");
        } else {

            // Calculate the bits using formula from http://en.wikipedia.org/wiki/Password_strength
            var N = 0;
            if((/[a-z]/).test(inputPassword)) N +=  26;
            if((/[A-Z]/).test(inputPassword)) N +=  26;
            if((/[0-9]/).test(inputPassword)) N +=  10;
            if((/[^a-zA-Z0-9]/).test(inputPassword)) N +=  32;
            var bits = inputPassword.length * (Math.log(N) / Math.log(2));
            // Calculates the time in second it takes to find out one password (approximate calculation).
            var timePerPassword = Math.pow(2, bits);
            // Number of password that the computer could calculate each second.
            var rate = 3000000000;
            // Time to find out your password (approximate calculation).
            var timeToFindOut = (timePerPassword / rate);
            
            // Takes more than ten year to find out.
            if(315360000 < timeToFindOut) {
                $("#passwordStrength").attr("class","veryGood");
                $("#passwordStrength").html("Very good password!");
                $("#button").attr("class", "");
            // Takes more than a month to find out.
            } else if(2678400 < timeToFindOut) {
                $("#passwordStrength").attr("class","good");
                $("#passwordStrength").html("good password!");
                $("#button").attr("class", "");
            //Takes longer time than one hours to find out.
            } else if(3600 < timeToFindOut) {
                $("#passwordStrength").attr("class","medium");
                $("#passwordStrength").html("Medium strength");
                $("#button").attr("class", "hidden");
            // Can be found out on less time than a hours.
            } else {
                $("#passwordStrength").attr("class","bad");
                $("#passwordStrength").html("Bad strength!");
                $("#button").attr("class", "hidden");
            }
        }
    });       
});