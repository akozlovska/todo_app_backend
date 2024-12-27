import { readFileSync } from "fs";
import path from "path";
import { gql } from "graphql-tag";

export const loadSchema = () => { 
  return gql(
    readFileSync(path.resolve(__dirname, "../schema.graphql"), {
      encoding: "utf-8",
    })
  );
};