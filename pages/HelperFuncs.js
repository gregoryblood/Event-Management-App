export function MilToCil(time) {
    time = time.split(" ")[0];  // Remove GMT+...... from time
    time = time.replace(/:\d\d([ ap]|$)/,'$1'); // remove seconds from time
    let H = +time.substr(0, 2);
    let hour = H % 12 || 12; 
    let ampm = (H < 12 || H === 24) ? "AM" : "PM"; // Return AM or PM depedning of 24 Hour time
    time = hour + time.substr(2, 3) + " " + ampm;


    return time; // RETURNS 12 HOUR TIME
}