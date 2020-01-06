import { Session } from "neo4j-driver/types/v1";

type Athlete = { name: string };

export async function getAthletes(session: Session): Promise<Athlete[]> {
  const result = await session.run(`MATCH(athletes:Athlete) RETURN athletes`);
  const athletes = result.records.map(record => record.get(0).properties);
  if (!areValidAthletes(athletes))
    throw new Error("Athletes returned did not have the correct properties!");
  return athletes;
}

function areValidAthletes(athletes: unknown[]): athletes is Athlete[] {
  return athletes.every(isValidAthlete);
}

/**
 * https://github.com/Microsoft/TypeScript/issues/21732#issuecomment-562782577
 */
const hasProp = <O extends object, K extends PropertyKey>(
  obj: O,
  propKey: K
): obj is O & { [key in K]: unknown } => propKey in obj;

function isValidAthlete(athlete: unknown): athlete is Athlete {
  return (
    typeof athlete === "object" &&
    athlete !== null &&
    hasProp(athlete, "name") &&
    athlete.name &&
    typeof athlete.name === "string"
  );
}
