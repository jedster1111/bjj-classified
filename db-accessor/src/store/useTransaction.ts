import { Transaction, Session } from "neo4j-driver";
import { logger } from "../logger";

export async function useTransaction<T>(
  session: Session,
  callback: (tx: Transaction) => Promise<T>
): Promise<T | Error> {
  logger.info("Starting transaction.");
  const tx = session.beginTransaction();

  try {
    const result = await callback(tx);

    logger.info("Completed transaction.");
    await tx.commit();

    return result;
  } catch (e) {
    const exception: Error = e;
    logger.error(exception, "Error during transaction, rolling back.");
    return exception;
  }
}
