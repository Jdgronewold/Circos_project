

export const objectify = (state) => {
  let obj = {};
  const objKeys = Object.keys(state);
  objKeys.forEach( key => {
    if(typeof state[key] === 'object') {
      obj[key] = objectify(state[key]);
    } else {
      obj[key] = valueFix(state[key]);
    }
  });
  return obj;
};

const valueFix = (value) => {
  let val;
  if(value == parseInt(value)) {
    val = parseInt(value);
  } else if (value === "true") {
    val = true;
  } else if (value === "false") {
    val = false;
  } else {
    val = value;
  }
  return val;
};
