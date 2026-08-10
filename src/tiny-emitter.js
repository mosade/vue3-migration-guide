class TinyEmitter {
  constructor () {
    this.e = Object.create(null);
  }

  on (name, callback, context) {
    const listeners = this.e[name] || (this.e[name] = []);

    listeners.push({
      fn: callback,
      ctx: context
    });

    return this;
  }

  once (name, callback, context) {
    const listener = (...args) => {
      this.off(name, listener);
      callback.apply(context, args);
    };

    listener._ = callback;

    return this.on(name, listener, context);
  }

  emit (name, ...args) {
    const listeners = [...(this.e[name] || [])];

    listeners.forEach(({ fn, ctx }) => fn.apply(ctx, args));

    return this;
  }

  off (name, callback) {
    const listeners = this.e[name];

    if (!listeners || !callback) {
      delete this.e[name];
      return this;
    }

    const activeListeners = listeners.filter(({ fn }) => (
      fn !== callback && fn._ !== callback
    ));

    if (activeListeners.length) {
      this.e[name] = activeListeners;
    } else {
      delete this.e[name];
    }

    return this;
  }
}

module.exports = TinyEmitter;
module.exports.TinyEmitter = TinyEmitter;
