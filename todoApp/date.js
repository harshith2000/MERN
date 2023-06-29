exports.getDate = function() {
  let today = new Date();
  let whichday = today.getDay();
  let options = {
    weekday : "long",
    day : "numeric",
    month : "long"
  }; 
  return today.toLocaleDateString("en-US", options);
}