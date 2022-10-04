export const wait = (taking) => {
  return new Promise((resolve) => {
    const unlisten = taking.listen((values) => {
      unlisten();
      resolve(values);
    });
  });
};

export const ref = (taking) => {
  const state = { current: undefined };

  const unlisten = taking.listen((values) => {
    state.current = values;
  });

  return {
    get: () => state.current,
    unlisten: () => unlisten(),
  };
};

export const accum = (taking) => {
  const state = { current: [] };

  const unlisten = taking.listen((values) => {
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
