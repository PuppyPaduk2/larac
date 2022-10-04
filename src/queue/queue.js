export const createQueue = () => {
  const create = () => {
    const queueListeners = new Map();
    const listeners = new Set();

    const set = (key, value) => {
      queueListeners.forEach(({ set }) => set(key, value));
      listeners.forEach((listener) => listener({ [key]: value }));
      return value;
    };

    return {
      take: (...addedKeys) => {
        const keys = [...addedKeys];

        const getKey = () => keys.join(",");
        const getQueueListener = () => {
          const key = getKey();
          let queueListener = queueListeners.get(key);

          queueListener = queueListener ?? createQueueListener(keys);
          queueListeners.set(key, queueListener);

          return queueListener;
        };

        const queueListener = {
          take: (...addedKesy) => {
            keys.push(...addedKesy);
            return queueListener;
          },

          listen: (listener) => {
            return getQueueListener().listen(listener);
          },
        };

        return queueListener;
      },

      set: (key, value) => {
        if (typeof key === "string") {
          return set(key, value);
        }

        Object.entries(key).forEach(([key, value]) => set(key, value));
        return value;
      },

      listen: (listener) => {
        listeners.add(listener);

        return () => {
          listeners.delete(listener);
        };
      },

      clone: () => create(),
    };
  };

  return create();
};

const createQueueListener = (keys) => {
  const listeners = new Set();

  const uniqKeys = Array.from(new Set(keys));

  const map = keys.reduce((memo, key) => {
    if (memo[key]) {
      memo[key].max += 1;
    } else {
      memo[key] = { values: [], max: 1 };
    }

    return memo;
  }, {});

  const set = (key, value) => {
    if (!(key in map)) return;

    map[key].values.push(value);

    for (let index = 0; index < uniqKeys.length; index += 1) {
      const uniqKey = uniqKeys[index];

      if (map[uniqKey].values.length < map[uniqKey].max) return;
    }

    const values = keys.map((key) => map[key].values.shift());

    listeners.forEach((listener) => listener(values));
  };

  const listen = (listener) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  return { set, listen };
};
