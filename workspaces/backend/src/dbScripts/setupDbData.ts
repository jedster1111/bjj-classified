import neo4j from "neo4j-driver";

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "password")
);
const session = driver.session();

main();

async function main(): Promise<void> {
  await clearData();
  await initData();

  session.close();
  driver.close();
}

async function clearData(): Promise<void> {
  console.log("Clearing old data");
  await session.run(`MATCH (n) DETACH DELETE n`);
}

async function initData(): Promise<void> {
  try {
    console.log("Creating initial data");

    await session.run(`
      CREATE (jed:Athlete {name: "Jed Thompson"})
      CREATE (joy:Athlete {name: "Joy Li"})
      CREATE (josh:Athlete {name: "Josh Lee"})
      CREATE (harry:Athlete {name: "Harry Lewis"})

      CREATE (carlson:Gym {name: "Carlson Gracie London"})
      CREATE (gracie:Gym {name: "Gracie Barra London"})

      CREATE (jed)-[:TRAINS_AT]->(carlson)
      CREATE (joy)-[:TRAINS_AT]->(carlson)
      CREATE (josh)-[:TRAINS_AT]->(carlson)
      CREATE (harry)-[:TRAINS_AT]->(gracie)
    `);
  } catch (e) {
    console.log(e);
  }
}
