export const createCycle = (config) => {
  const { modes, plugins, meta: metaConfig } = config;

  return {
    init: async (params) => {
      const { mode, meta: metaParams } = params;
      const meta = { ...metaConfig(), ...metaParams() };
      const setupedServices = await Promise.all(
        plugins.map((setup) => setup(meta))
      );
      const hooks = modes[mode] ?? [];

      for (let index = 0; index < hooks.length; index += 1) {
        const hookName = hooks[index];

        await Promise.all(
          setupedServices
            .map((hookHandlers) => hookHandlers[hookName])
            .filter(Boolean)
            .map((hookHandler) => hookHandler())
        );
      }

      return meta;
    },
  };
};
