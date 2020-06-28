import { Transaction, Result, Node } from "neo4j-driver";

export type Run = (transaction: Transaction) => Result;

export type MyNode<
  T extends Record<string, unknown> = Record<string, unknown>
> = Node & {
  properties: T;
};
