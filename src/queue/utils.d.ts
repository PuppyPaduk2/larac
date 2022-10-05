import { Values } from "./common";
import { QueuePoint } from "./queue-take";

export function wait<
  Protocol extends Record<string, unknown>,
  TakeKeys extends (keyof Protocol)[] = []
>(point: QueuePoint<Protocol, TakeKeys>): Promise<Values<Protocol, TakeKeys>>;

export function ref<
  Protocol extends Record<string, unknown>,
  TakeKeys extends (keyof Protocol)[] = []
>(
  point: QueuePoint<Protocol, TakeKeys>
): {
  get(): Values<Protocol, TakeKeys> | undefined;
  unlisten(): void;
};

export function accum<
  Protocol extends Record<string, unknown>,
  TakeKeys extends (keyof Protocol)[] = []
>(
  point: QueuePoint<Protocol, TakeKeys>
): {
  get(): Values<Protocol, TakeKeys>[];
  clear(): void;
  unlisten(): void;
};
