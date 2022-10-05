export type createCycle<
  Hook extends string,
  Mode extends string,
  Meta extends object
> = {
  (config: {
    modes: Record<Mode, Hook[]>;
    plugins: Plugin<Hook, Meta>[];
    meta: () => Meta;
  }): Cycle<Mode, Meta>;
};

export type Cycle<Mode extends string, Meta extends object> = {
  init(params: { mode: Mode; meta?: () => Partial<Meta> }): Promise<Meta>;
};
