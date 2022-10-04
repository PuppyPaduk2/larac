export type Values<
  Protocol extends Record<string, unknown>,
  TakeKeys extends (keyof Protocol)[] = []
> = {
  [Index in keyof TakeKeys]: Protocol[TakeKeys[Index]];
};
