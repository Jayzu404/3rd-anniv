const weBecamePartner = new Date("Feb 20 2023 09:00:00");

function liveCount() {
  let now = new Date();
  let timeDiff = now - weBecamePartner;

  // let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  // let hours = Math.floor(timeDiff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  // let minutes = Math.floor( (timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  // let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  let remainingHours = Math.floor(timeDiff % (1000 * 60 * 60 * 24));

  let hours = Math.floor(remainingHours / (1000 * 60 * 60));
  let remainingMinutes = Math.floor(remainingHours % (1000 * 60 * 60));

  let minutes = Math.floor(remainingMinutes / (1000 * 60));
  let remainingSeconds = Math.floor(remainingMinutes) % (1000 * 60);

  let seconds = Math.floor(remainingSeconds / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}

setInterval(liveCount, 1000);

let now = new Date();
let timeDiff = now - weBecamePartner;

console.log();
console.log(Math.floor((timeDiff % (1000 * 60)) / 1000));
console.log(Math.floor(timeDiff / (1000 * 60)));