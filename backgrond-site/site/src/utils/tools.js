export function formatDate(timestamp) {
  var date = new Date(parseInt(timestamp));
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var weekArr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  var week = weekArr[date.getDay()];

  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (day >= 1 && day <= 9) {
    day = "0" + day;
  }
  if (hour >= 1 && hour <= 9) {
    hour = "0" + hour;
  }
  if (minutes >= 1 && minutes <= 9) {
    minutes = "0" + minutes;
  }
  if (seconds >= 1 && seconds <= 9) {
    seconds = "0" + seconds;
  }
  return (
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hour +
    ":" +
    minutes +
    ":" +
    seconds +
    " " +
    week
  );
}
