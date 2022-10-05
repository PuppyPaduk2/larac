import { createCycle } from "../cycle/cycle";

export const createConfigurator = () => {
  return {
    createPlugin: (plugin) => {
      return (...args) => plugin(...args);
    },
    createCycle: (config) => {
      return createCycle(config);
    },
  };
};
