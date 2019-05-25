import { HeartRateSensor } from "heart-rate";
import { preferences } from "user-settings";
import clock from "clock";
import document from "document";
import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const hour = document.getElementById("hour");
const minutes = document.getElementById("minutes");
const ampm = document.getElementById("ampm");
const hrtBeat = document.getElementById("hrtBeat");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  let mins = util.zeroPad(today.getMinutes());
  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    ampm.text = hours >= 12 ? 'PM' : 'AM';
    hours = util.zeroPad(hours % 12) || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  
  // Update values
  hour.text = hours;
  minutes.text = mins;
}

// Create a new instance of the HeartRateSensor object
let hrm = new HeartRateSensor();

// Declare an event handler that will be called every time a new HR value is received.
hrm.onreading = function() {
  // Peek the current sensor values
  hrtBeat.text = hrm.heartRate;
}

// Begin monitoring the sensor
hrm.start();