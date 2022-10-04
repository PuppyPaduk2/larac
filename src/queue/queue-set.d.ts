export type QueueSet<Protocol> = {
  (values: Partial<Protocol>): Partial<Protocol>;
  <Key extends keyof Protocol>(key: Key, value: Protocol[Key]): Protocol[Key];
};
