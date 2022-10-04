import { Values } from "./common";
import { Listener } from "./queue-listener";

export function wait<
  Protocol extends Record<string, unknown>,
  TakeKeys extends (keyof Protocol)[] = []
>(taking: Listener<Protocol, TakeKeys>): Promise<Values<Protocol, TakeKeys>>;

export function ref<
  Protocol extends Record<string, unknown>,
  TakeKeys extends (keyof Protocol)[] = []
>(
  taking: Listener<Protocol, TakeKeys>
): {
  get(): Values<Protocol, TakeKeys> | undefined;
  unlisten(): void;
};

export function accum<
  Protocol extends Record<string, unknown>,
  TakeKeys extends (keyof Protocol)[] = []
>(
  taking: Listener<Protocol, TakeKeys>
): {
  get(): Values<Protocol, TakeKeys>[];
  clear(): void;
  unlisten(): void;
};
