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

    if(object.name.slice(0, object.name.length-1) === "display") {
      obj[object.name.slice(0, object.name.length-1)] = value;
    } else {
      if (obj[object.name] !== undefined) {
        if (!obj[object.name].push) {
          obj[object.name] = [obj[object.name]];
        }
        obj[object.name].push(value);
      } else {
        obj[object.name] = value;
      }
    }
  });
  return obj;
};

const clickEvents = () => {

  $('#layout-file').click(() => {
    $('#load-layout').toggleClass('active');
  });

  $('#load-layout').click( () => {
    handleData.loadLayout();
  });

  $('#load-data').click( () => {
    const trackName = $('#track-name').val();
    debugger
    handleData.loadData(trackName);
  });


  $('#submit-layout').click( (e) => {

    let configSerial = $('#layout-form').serializeArray();
    let configData = objectify(configSerial);

    let labelSerial = $('#labels-form').serializeArray();
    let labelData = objectify(labelSerial);

    let ticksSerial = $('#ticks-form').serializeArray();
    let tickData = objectify(ticksSerial);

    configData['labels'] = labelData;
    configData['ticks'] = tickData;

    //this works for now, find a better fix later
    const $data = $('#layout');
    debugger;
    // call parseData (rename)
    handleData.parseLayout($data, configData);
  });

  $('#submit-track').click( (e) => {
    debugger
    let configSerial = $('#layout-form').serializeArray();
    let configData = objectify(configSerial);

    let labelSerial = $('#labels-form').serializeArray();
    let labelData = objectify(labelSerial);

    let ticksSerial = $('#ticks-form').serializeArray();
    let tickData = objectify(ticksSerial);

    configData['labels'] = labelData;
    configData['ticks'] = tickData;

    //this works for now, find a better fix later
    const $data = $('#layout');
    debugger;
    // call parseData (rename)
    handleData.parseLayout($data, configData);
  });
};

module.exports = clickEvents;
