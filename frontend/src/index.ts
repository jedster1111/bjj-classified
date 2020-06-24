import { meaningOfLife } from "bjj-common";

function component() {
  const element = document.createElement('div');

  element.innerHTML = "Hello Webpack, here's the meaning of life: " + meaningOfLife();

  return element;
}

document.body.appendChild(component());