import { Session } from "neo4j-driver/types/v1";
import { AthletesResponse } from "../../types";
import { areValidAthletes } from "./areValidAthletes";

export async function getAthletes(session: Session): Promise<AthletesResponse> {
  const result = await session.run(`MATCH(athletes:Athlete) RETURN athletes`);
  const athletes = result.records.map(record => record.get(0).properties);
  if (!areValidAthletes(athletes))
    throw new Error("Athletes returned did not have the correct properties!");
  return athletes;
}
