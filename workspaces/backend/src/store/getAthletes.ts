import { Session } from "neo4j-driver/types/v1";
import { AthleteDTO } from "../types";
import { areValidAthletes } from "./predicates/athletes/areValidAthletes";

export async function getAthletes(session: Session): Promise<AthleteDTO[]> {
  const result = await session.run(`MATCH(athletes:Athlete) RETURN athletes`);
  const athletes = result.records.map(record => record.get(0).properties);
  if (!areValidAthletes(athletes))
    throw new Error("Athletes returned did not have the correct properties!");
  return athletes;
}
