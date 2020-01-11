import { StatementResult } from "neo4j-driver/types/v1";

export function resultToData(result: StatementResult): unknown[] {
  return result.records.map(record => record.get(0).properties);
}
