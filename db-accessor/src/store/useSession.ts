import { Driver, SessionMode, Session } from "neo4j-driver";
import { logger } from "../logger";

export async function useSession<T>(
  driver: Driver,
  sessionType: SessionMode | undefined,
  callback: (session: Session) => Promise<T | Error>
): Promise<T | Error> {
  logger.info("Creating a session. sessionType is %s", sessionType);
  const session = driver.session({ defaultAccessMode: sessionType });

  const result = await callback(session);

  logger.info("Closing session.");
  session.close();

  return result;
}
