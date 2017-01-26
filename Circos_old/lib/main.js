const handleData = require('./load_data');
const clickEvents = require('./click_events');


document.addEventListener("DOMContentLoaded", () => {
    // load up svg object that circos is going to take
    clickEvents();
    
});
