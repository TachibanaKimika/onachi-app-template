/* eslint-disable lines-between-class-members */
/* eslint-disable no-dupe-class-members */
export type CallbackFunction<T> = (err: Error | null, resolvedData?: T) => void;
export type ReadyFunctionArg<T> = boolean | Error | CallbackFunction<T> | undefined;

export class Ready<T> {
  private isReadyFlag: boolean;

  private readonly readyCallbacks: CallbackFunction<T>[];

  private readyArg: Error | null = null;

  private resolved?: T = undefined;

  constructor() {
    this.isReadyFlag = false;
    this.readyCallbacks = [];
  }

  isReady() {
    return this.isReadyFlag;
  }

  dispose() {
    this.readyCallbacks.length = 0;
  }

  ready(): Promise<T>;
  ready(flagOrFunction: CallbackFunction<T>): void;
  ready(flagOrFunction: boolean | Error, resolved?: T): void;
  ready(flagOrFunction?: ReadyFunctionArg<T>, resolved?: T): Promise<T> | void {
    // register a callback
    if (flagOrFunction === undefined || typeof flagOrFunction === 'function') {
      return this.register(flagOrFunction as CallbackFunction<T>);
    }
    // emit callbacks
    this.emit(flagOrFunction, resolved);
  }

  toBeReady(resolvedData?: T) {
    this.emit(true, resolvedData);
  }

  /**
   * Register a callback to the callback stack, it will be called when emit.
   * It will return promise when no argument passing.
   */
  register(func?: CallbackFunction<T>): Promise<T> | void {
    // support `this.ready().then(onReady);` and `await this.ready()`;
    if (!func) {
      return new Promise<T>((resolve, reject) => {
        function func(err: Error | null, data?: T) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
        if (this.isReadyFlag) {
          // eslint-disable-next-line no-promise-executor-return
          return func(this.readyArg, this.resolved);
        }
        this.readyCallbacks.push(func);
      });
    }

    // this.ready(fn)
    if (this.isReadyFlag) {
      func(this.readyArg, this.resolved);
    } else {
      this.readyCallbacks.push(func);
    }
  }

  /**
   * Call the callbacks that has been registerd, and clean the callback stack.
   * If the flag is not false, it will be marked as ready. Then the callbacks will be called immediately when register.
   * @param {Boolean|Error} flag - Set a flag whether it had been ready. If the flag is an error, it's also ready, but the callback will be called with argument `error`
   */
  emit(flag: boolean | Error, resolved?: T) {
    this.isReadyFlag = flag !== false;
    this.readyArg = flag instanceof Error ? flag : null;
    // this.ready(true)
    if (this.isReadyFlag) {
      this.resolved = resolved;
      this.readyCallbacks.splice(0, Infinity).forEach((callback) => callback(this.readyArg, resolved));
    }
  }
}
