import { createConfigurator } from "./configurator";
import { createQueue, Queue } from "../queue";
import { ref } from "../queue/utils";

const configurator = createConfigurator<
  "fetch" | "buildHtml" | "hydrate",
  "common" | "server" | "client",
  {
    queue: Queue<{ html: string; ip: string }>;
    getHtml: () => string;
  }
>();

const core = configurator.createPlugin(({ queue }) => {
  queue
    .take("html")
    .take("html", "ip")
    .listen(([h1, h2, ip]) => {});

  const r = ref(queue.take("html"));

  const value = r.get() ?? [""];

  return {
    fetch: async () => {},
    buildHtml: async () => {},
  };
});

const main = configurator.createCycle({
  modes: {
    common: ["fetch"],
    client: ["fetch", "hydrate"],
    server: ["fetch", "buildHtml"],
  },
  plugins: [core],
  meta: () => {
    const queue = createQueue<{ html: string; ip: string }>();
    const refHtml = ref(queue.take("html"));

    return {
      queue,
      getHtml: () => {
        const [value] = refHtml.get() ?? [""];
        return value;
      },
    };
  },
});

main.init({ mode: "client" }).then((meta) => {
  const html = meta.getHtml();
});
