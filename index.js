const esClient = require("elasticsearch").Client({
  host: `XX`,
  apiVersion: "7.x",
});

const brain = require("brain.js");

(async () => {
  await search();
})();

async function search() {
  var net = new brain.NeuralNetwork();
  net.train([
    { input: { action: 1, comedy: 0, rating: 0.6 }, output: { show: 1 } },
    { input: { action: 0.5, comedy: 1, rating: 0.5 }, output: { show: 0 } },
    { input: { action: 0.5, comedy: 0, rating: 0.5 }, output: { show: 0 } },
    { input: { action: 1, comedy: 0.5, rating: 0.5 }, output: { show: 1 } },
    { input: { action: 0.5, comedy: 0, rating: 0.5 }, output: { show: 0 } },
    { input: { action: 0, comedy: 0.5, rating: 1 }, output: { show: 1 } },
  ]);

  console.log(net.run({ action: 1, comedy: 0, rating: 0.4 }));
  console.log(net.run({ action: 0, comedy: 1, rating: 0.6 }));

  let source = net.toFunction().toString();
  source = source.substring(source.indexOf("{'show'") + 8, source.length - 4); // replace function stuff
  source = source.replace(/\|\|0/g, ""); // remove not valid caracteres
  source = source.replace(/input\[\'action\'\]/g, 'doc["action"].value');
  source = source.replace(/input\[\'comedy\'\]/g, 'doc["comedy"].value');
  source = source.replace(/input\[\'rating\'\]/g, 'doc["rating"].value');

  console.log("source", source);
  const res = await esClient.search({
    index: "event",
    body: {
      query: {
        function_score: {
          script_score: {
            script: {
              lang: "painless",
              source,
            },
          },
        },
      },
    },
  });
  console.log("res", res.hits.hits);
}

1 /
  (1 +
    1 /
      Math.exp(
        -0.9305591583251953 -
          (8.11803150177002 * 1) /
            (1 +
              1 /
                Math.exp(
                  4.626440048217773 -
                    2.634021043777466 * doc["action"].value -
                    0.21703855693340302 * doc["comedy"].value -
                    5.385509014129639 * doc["rating"].value
                )) +
          (1.1812586784362793 * 1) /
            (1 +
              1 /
                Math.exp(
                  -0.590217113494873 +
                    0.6710155606269836 * doc["action"].value -
                    0.0913214385509491 * doc["comedy"].value +
                    1.042190432548523 * doc["rating"].value
                )) +
          (7.318766117095947 * 1) /
            (1 +
              1 /
                Math.exp(
                  -4.262016296386719 +
                    2.480210542678833 * doc["action"].value -
                    0.10173800587654114 * doc["comedy"].value +
                    5.1834917068481445 * doc["rating"].value
                ))
      ));
