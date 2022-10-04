export type QueueListen<Protocol extends Record<string, unknown>> = {
  (listener: (values: Partial<Protocol>) => void): QueueUnlisten;
};

export type QueueUnlisten = () => void;
