export const wait = (point) => {
  return new Promise((resolve) => {
    const unlisten = point.listen((values) => {
      unlisten();
      resolve(values);
    });
  });
};

export const ref = (point) => {
  const state = { current: undefined };

  const unlisten = point.listen((values) => {
    state.current = values;
  });

  return {
    get: () => state.current,
    unlisten: () => unlisten(),
  };
};

export const accum = (point) => {
  const state = { current: [] };

  const unlisten = point.listen((values) => {
    state.current.push(values);
  });

  return {
    get: () => state.current,
    clear: () => {
      state.current = [];
    },
    unlisten: () => unlisten(),
  };
};
