//log  which event types has been previously used
const eventTypesUsed = {};

//array of events we listen to
let events = [];

function genericListener(event) {
  for (let { type, selector, func } of events) {
    if (type === event.type && event.target.closest(selector)) {
      func(event);
    }
  }
}

export function addEvent(type, selector, func) {
  if (!eventTypesUsed[type]) {
    document.body.addEventListener(type, genericListener);
    eventTypesUsed[type] = true;
  }
  events.push({ type, selector, func });
}

export function removeEvent(func) {
  events = events.filter(event => event.func !== func);
}