import { Cycle } from "../cycle/cycle";
import { ArrayType } from "./common";

export function createConfigurator<
  Hook extends string,
  Mode extends string,
  Meta extends object = {}
>(): Configurator<Hook, Mode, Meta>;

type Configurator<
  Hook extends string,
  Mode extends string,
  Meta extends object
> = {
  createPlugin(service: Plugin<Hook, Meta>): Plugin<Hook, Meta>;
  createCycle(config: {
    modes: Record<Mode, Hook[]>;
    plugins: Plugin<Hook, Meta>[];
    meta: () => Meta;
  }): Cycle<Mode, Meta>;
};

type Plugin<Hook extends string, Meta extends object> = {
  (meta: Meta): Partial<Record<ArrayType<Hook>, () => Promise<void>>>;
};
