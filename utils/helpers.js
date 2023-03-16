module.exports = {
  // the helper method 'format_time' will take in a timestamp and return a string with only the time
  format_date: (date) => {
    // We use the 'toLocaleTimeString()' method to format the time as H:MM:SS AM/PM
    return date.toLocaleDateString();
  },
  //Found on stackoverflow - user:Mihail
  ifEquals: (arg1, arg2, options) => {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  }
};
