import { QueueTake } from "./queue-take";
import { QueueSet } from "./queue-set";
import { QueueListen } from "./queue-listen";

export function createQueue<
  Protocol extends Record<string, unknown>
>(): Queue<Protocol>;

export type Queue<Protocol extends Record<string, unknown>> = {
  take: QueueTake<Protocol>;
  set: QueueSet<Protocol>;
  listen: QueueListen<Protocol>;
  clone: () => Queue<Protocol>;
};
