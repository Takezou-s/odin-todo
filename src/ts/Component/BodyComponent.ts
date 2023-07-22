import { Component } from "./Component";

/**
 * Dummy body component to add Components inside of it.
 */
export default (() => {
  const node = document.body;
  const children: Array<Component> = [];
  const render = () => {
    children.forEach((x) => {
      node.appendChild(x.render()!);
    });
  };

  return { node, children, render };
})();
