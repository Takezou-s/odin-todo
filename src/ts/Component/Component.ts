import { State, StateStore } from "../Utility/EventManagement/State";
import * as types from "../types";
/**
 * Component base class. Subclasses should override "initNode" method and set value of "node" property.
 */
export abstract class Component {
  private update = false;
  /**
   * State binds.
   */
  protected stateBinds: Array<{ state: State; fn: types.StateBindFunction }> = [];
  /**
   * State store.
   */
  protected stateStore = new StateStore(this, 50);
  /**
   * Changed states.
   */
  protected changedStates: Array<State> = [];
  /**
   * External states(set via "props" in constructor) is accessed by this inside component.
   */
  protected ps: any = {};
  /**
   * External states(set via "props" in constructor) is accessed by this other components.
   */
  props: any;
  /**
   * HTMLElement object to append to document.
   */
  node!: HTMLElement;

  constructor(props: any | null = null) {
    this.stateStore.subscribeStoreChanged(this._stateChangedHandler);

    if (props) {
      const createStatesFromProps = () => {
        for (const key in props) {
          const value = props[key];
          this.ps[key] = this.createState(`props.${key}`, value, true);
        }
      };

      const handler = {
        get: (target: any, prop: string, receiver: any) => {
          return this.getPropValue(prop);
        },
        set: (obj: any, prop: string, value: any | types.SetValueFunction) => {
          this.setPropValue(prop, value);
          return true;
        },
      };

      this.props = new Proxy(Object.assign({}, props), handler);
      createStatesFromProps();
    }

    this.initNode();
    this.initStates();
  }
  /**
   * Node creation and element appendings are made in this method.
   */
  protected abstract initNode(): void;
  /**
   * State creations and bindings are made in this method.
   */
  protected initStates(): void {}
  /**
   * Creates state to use inside the component.
   * @param stateName Name of state.
   * @param initValue Initial value of state.
   * @param fireAlways Fires event whether or not value is changed.
   * @param changedPredicate Predicate to decide if value has been changed. Equal sign comparation is used when it is null.
   * @returns
   */
  protected createState = (
    stateName: string,
    initValue: any | types.SetValueFunction,
    fireAlways: boolean = false,
    changedPredicate: types.NotifierPropertyChangedPredicate | null = null
  ) => {
    const state = this.stateStore.createState(stateName, initValue, fireAlways, changedPredicate);
    return state;
  };
  /**
   * State, props -> element bindings are made in this method. Use this method inside "initStates method."
   * @param state State whose changes are listened.
   * @param callbackFn State change listener function.
   */
  protected bindToState = (state: State, callbackFn: types.StateBindFunction) => {
    this.stateBinds.push({ state, fn: callbackFn });
  };
  /**
   * Reflects state changes to elements.
   */
  protected reflectStates = () => {
    if (!this.update || !this.changedStates || this.changedStates.length <= 0) {
      this.stateBinds.forEach((x) => x.fn({ state: x.state, getValue: x.state.getValue }));
    } else {
      this.changedStates.forEach((x) => {
        const stateBind = this.stateBinds.find((y) => y.state === x || y.state.stateName === x.stateName);
        if (stateBind) {
          stateBind.fn({ state: stateBind.state, getValue: stateBind.state.getValue });
        }
      });
      this.changedStates = [];
    }
  };
  /**
   * Reflect changes to elements.
   */
  private reflectToElements = () => {
    this.reflectStates();
  };
  /**
   * Renders component and returns node.
   * @returns Node to append to document.
   */
  render = () => {
    this.reflectToElements();
    this.update = true;
    return this.node;
  };
  /**
   * Returns prop value.
   * @param propName Prop name.
   * @returns
   */
  getPropValue = (propName: string) => {
    return this.stateStore.getStateValue(`props.${propName}`);
  };
  /**
   * Sets prop value.
   * @param propName Prop name.
   * @param value New value.
   */
  setPropValue = (propName: string, value: any | types.SetValueFunction) => {
    this.stateStore.setStateValue(`props.${propName}`, value);
  };

  private _stateChangedHandler = (sender: any, args: any) => {
    this.changedStates = args;
    this.render();
  };
}
