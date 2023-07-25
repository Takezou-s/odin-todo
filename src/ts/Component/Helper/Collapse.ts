import { Collapse } from "bootstrap";
import { Component } from "../Core/Component";

export function collapse(element: Component | HTMLElement) {
  const obj = (element as Component).render ? (element as Component).render() : (element as HTMLElement);
  const collapse = new Collapse(obj);
  collapse.hide();
  collapse.dispose();
}

export function show(element: Component | HTMLElement) {
  const obj = (element as Component).render ? (element as Component).render() : (element as HTMLElement);
  const collapse = new Collapse(obj);
  collapse.show();
  collapse.dispose();
}

export function toggle(element: Component | HTMLElement) {
  const obj = (element as Component).render ? (element as Component).render() : (element as HTMLElement);
  const collapse = new Collapse(obj);
  collapse.toggle();
  collapse.dispose();
}
