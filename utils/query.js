const getQuery = (search) => {
  if (!search) return {};
  const vars = search.substring(1).split('&');
  const result = {};
  for (let k = 0; k < vars.length; k += 1) {
    const [currKey, currValue] = vars[k].split('=');
    result[currKey] = currValue;
  }
  return result;
};

const appendQuery = (search, data) => {
  const query = getQuery(search);
  data = { ...query, ...data };
  const keys = Object.keys(data);
  let newQuery = "?";
  for (let k = 0; k < keys.length; k += 1)
    newQuery += `${k === 0 ? "" : "&"}${keys[k]}=${data[keys[k]]}`;
  return newQuery;
};

module.exports = { appendQuery, getQuery };
