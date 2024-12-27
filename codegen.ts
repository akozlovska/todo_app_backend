import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema.graphql",
  generates: {
    "./src/types/generated.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        makeResolverTypeCallable: true
      },
    },
  },
};

export default config;