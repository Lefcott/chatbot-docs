const getHeader = (data) => {
  const result = [];
  const rows = Object.keys(data);
  for (let k = 0; k < rows.length; k += 1) {
    const keys = Object.keys(data[rows[k]]);
    for (let m = 0; m < keys.length; m += 1)
      if (result.indexOf(keys[m]) === -1) result.push(keys[m]);
  }
  return result;
};

const get = (data = [], size = 150, index = 0) => {
  const keys = Object.keys(data);
  const header = getHeader(data);
  let result = "|";
  let sep = "|";
  for (let k = 0; k < header.length; k += 1) {
    result += `${header[k]}|`;
    sep += "-|";
  }
  result += `\n${sep}\n`;
  const min = Math.min(size * index, keys.length);
  for (let m = min; m < size * (index + 1); m += 1) {
    result += "|";
    for (let k = 0; k < header.length; k += 1)
      result += `${data[keys[m]][header[k]] || " "}|`;
    result += "\n";
  }
  return result;
};

module.exports = { get };
