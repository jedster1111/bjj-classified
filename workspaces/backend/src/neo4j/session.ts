import neo4j from "neo4j-driver";
import { Session } from "neo4j-driver/types/v1";

function createSession(): Session {
  const driver = neo4j.driver(
    "bolt://localhost:7687",
    neo4j.auth.basic("neo4j", "password")
  );
  const session = driver.session();
  return session;
}

export const session = createSession();
