import { Values } from "./common";

export type QueueTake<
  Protocol extends Record<string, unknown>,
  TakeKeys extends (keyof Protocol)[] = []
> = {
  <Keys extends (keyof Protocol)[]>(...keys: Keys): QueuePoint<
    Protocol,
    [...TakeKeys, ...Keys]
  >;
};

export type QueuePoint<
  Protocol extends Record<string, unknown>,
  TakeKeys extends (keyof Protocol)[] = []
> = {
  take: QueueTake<Protocol, TakeKeys>;
  listen: QueueListen<Protocol, TakeKeys>;
};

export type QueueListen<
  Protocol extends Record<string, unknown>,
  TakeKeys extends (keyof Protocol)[] = []
> = {
  (listener: (values: Values<Protocol, TakeKeys>) => void): () => void;
};
