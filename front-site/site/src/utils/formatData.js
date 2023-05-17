export default function(timetamp, showTime = false) {
  const data = new Date(+timetamp);
  const month = (data.getMonth() + 1).toString().padStart(2, "0");
  const day = data
    .getDate()
    .toString()
    .padStart(2, "0");
  let str = `${data.getFullYear()}-${month}-${day}`;
  if (showTime) {
    const hour = data
      .getHours()
      .toString()
      .padStart(2, "0");
    const minute = data
      .getMinutes()
      .toString()
      .padStart(2, "0");
    const second = data
      .getSeconds()
      .toString()
      .padStart(2, "0");
    str += `${hour}:${minute}:${second}`;
  }
  return str;
}
