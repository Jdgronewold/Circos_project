const handleData = require('./load_data');

const objectify = (serializedArray) => {
  let obj = {};
  $.each(serializedArray, (idx, object) => {
    let value;
    if(object.value == parseInt(object.value)) {
      value = parseInt(object.value);
    } else if (object.value === "true") {
      value = true;
    } else if (object.value === "false") {
      value = false;
    } else {
      value = object.value;
    }

    if (obj[object.name] !== undefined) {
      if (!obj[object.name].push) {
        obj[object.name] = [obj[object.name]];
      }
      obj[object.name].push(value);
    } else {
      obj[object.name] = value;
    }
  });
  return obj;
};

const clickEvents = () => {

  $('#load-layout').click( () => {
    handleData.loadLayout();
  });

  $('#parse-data').click(() => {
    handleData.parseData($('#file-content li:last-child'));
  });


  $('#submit-forms').click( (e) => {

    let configSerial = $('#layout-form').serializeArray();
    let configData = objectify(configSerial);

    let labelSerial = $('#labels-form').serializeArray();
    let labelData = objectify(labelSerial);

    let ticksSerial = $('#tickss-form').serializeArray();
    let tickData = objectify(ticksSerial);

    configData['labels'] = labelData;
    configData['ticks'] = tickData;
    debugger;
  });
};

module.exports = clickEvents;
