export const simpleDateTimeFormat = (date: Date, pattern: string): string => {
  const dateString = pattern.replace(/(yyyy|MM|dd|HH|mm|ss|SSS)/g, function (match) {
    let matchString = "";
    switch (match) {
      case "yyyy":
        matchString = date.getFullYear().toString();
        break;
      case "MM":
        matchString = (date.getMonth() + 1).toString();
        break;
      case "dd":
        matchString = date.getDate().toString();
        break;
      case "HH":
        matchString = date.getHours().toString();
        break;
      case "mm":
        matchString = date.getMinutes().toString();
        break;
      case "ss":
        matchString = date.getSeconds().toString();
        break;
      case "SSS":
        matchString = date.getMilliseconds().toString();
        break;
      default:
        matchString = match;
        break;
    }
    if (match === "SSS") {
      if (parseInt(matchString) < 10) {
        matchString = "00" + matchString;
      } else if (parseInt(matchString) < 100) {
        matchString = "0" + matchString;
      }
    } else {
      if (parseInt(matchString) < 10) {
        matchString = "0" + matchString;
      }
    }
    return matchString;
  });

  return dateString;
};
