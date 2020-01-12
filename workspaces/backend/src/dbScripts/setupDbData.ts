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

    await session.run(
      `CREATE CONSTRAINT ON (athlete:Athlete) ASSERT exists(athlete.name)`
    );
    await session.run(
      `CREATE CONSTRAINT ON (video:Video) ASSERT exists(video.url);`
    );
    await session.run(
      `CREATE CONSTRAINT ON (gym:Gym) ASSERT exists(gym.name);`
    );
    await session.run(
      `CREATE CONSTRAINT ON (tournament:Tournament) ASSERT exists(tournament.name);`
    );
    await session.run(
      `CREATE CONSTRAINT ON (technique:Technique) ASSERT exists(technique.name);`
    );

    await session.run(`
      CREATE
        (jed:Athlete {name: "Jed Thompson"}),
        (joy:Athlete {name: "Joy Li"}),
        (josh:Athlete {name: "Josh Lee"}),
        (harry:Athlete {name: "Harry Lewis"}),

        (carlson:Gym {name: "Carlson Gracie London"}),
        (gracie:Gym {name: "Gracie Barra London"}),

        (jed)-[:TRAINS_AT]->(carlson),
        (joy)-[:TRAINS_AT]->(carlson),
        (josh)-[:TRAINS_AT]->(carlson),
        (harry)-[:TRAINS_AT]->(gracie),

        (video:Video {url: "https://youtu.be/8Q1uvJw2hGs"}),
        (tournament:Tournament {name: "London Open 2019"}),
        (match:Match),

        (match)-[:TOOK_PLACE_IN]->(tournament),
        (video)-[:VIDEO_OF]->(match),

        (jed)-[:COMPETED_IN {result: "won"}]->(match),
        (harry)-[:COMPETED_IN {result: "lost"}]->(match),

        (triangle:Technique {name: "Triangle Choke"}),
        (armbar:Technique {name: "Armbar"}),

        (event1:Event {name: "Triangle Choke"}),
        (event2:Event {name: "Armbar"}),

        (event1)-[:TRANSITIONS_TO]->(event2),

        (event1)-[:WATCHABLE_IN {time: 3}]->(video),
        (event2)-[:WATCHABLE_IN {time: 6}]->(video),

        (event1)-[:EXAMPLE_OF]->(triangle),
        (event2)-[:EXAMPLE_OF]->(armbar)
    `);
  } catch (e) {
    console.log(e);
  }
}
