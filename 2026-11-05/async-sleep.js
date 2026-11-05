const sleep = ms => new Promise(res => setTimeout(res, ms));

typewriterArray('Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate nam incidunt, nobis hic quam quasi maxime a repellat saepe. Pariatur est, fugiat cum vero tempora minus et molestias hic inventore?');

async function typewriter(message) {
  let html = '';

  for (let letter of message) {
    html += letter;
    document.querySelector('.text').innerHTML = html;
    await sleep(50);
  }
}

async function typewriterArray(message) {
  let html = '';

  while (message.length > 0) {
    html += message[0];
    message = message.slice(1);
    document.querySelector('.text').innerHTML = html;
    await sleep(50);
  }
}