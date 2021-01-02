console.log("START");
var brain = require("brain.js");

var net = new brain.NeuralNetwork();

net.train([
  { input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 } },
  { input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 } },
  { input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 } },
  { input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 } },
]);

const run = net.toFunction();
console.log(run.toString());

// var output = net.run({ r: 1, g: 0.4, b: 0 });
// console.log(output);

const output = exec({ r: 1, g: 0.4, b: 0 })
console.log(output);

async function search() {
  const res = await esClient.search({
    index: "event",
    body: {
      query: {
        function_score: {
          script_score: {
            script: {
              lang: "painless",
              source: `
                if(doc["timespent"].value > 60.0) return 1;
                return 0;
                `,
            },
          },
        },
      },
    },
  });
  console.log("res", res.hits.hits);
}


function exec(input) {
  return {
    black:
      1 /
      (1 +
        1 /
          Math.exp(
            1.9968616962432861 +
              (1.5779471397399902 * 1) /
                (1 +
                  1 /
                    Math.exp(
                      0.31615325808525085 -
                        0.4834895431995392 * (input["r"] || 0) +
                        1.1234664916992188 * (input["g"] || 0) +
                        0.1353733241558075 * (input["b"] || 0)
                    )) -
              (4.56293249130249 * 1) /
                (1 +
                  1 /
                    Math.exp(
                      0.6091488003730774 +
                        3.74808669090271 * (input["r"] || 0) -
                        4.924888610839844 * (input["g"] || 0) +
                        1.5678222179412842 * (input["b"] || 0)
                    )) -
              (3.2074453830718994 * 1) /
                (1 +
                  1 /
                    Math.exp(
                      0.28058019280433655 +
                        2.929636240005493 * (input["r"] || 0) -
                        3.8517744541168213 * (input["g"] || 0) +
                        1.3293538093566895 * (input["b"] || 0)
                    ))
          )),
    white:
      1 /
      (1 +
        1 /
          Math.exp(
            -2.0988357067108154 -
              (1.461101770401001 * 1) /
                (1 +
                  1 /
                    Math.exp(
                      0.31615325808525085 -
                        0.4834895431995392 * (input["r"] || 0) +
                        1.1234664916992188 * (input["g"] || 0) +
                        0.1353733241558075 * (input["b"] || 0)
                    )) +
              (4.445945739746094 * 1) /
                (1 +
                  1 /
                    Math.exp(
                      0.6091488003730774 +
                        3.74808669090271 * (input["r"] || 0) -
                        4.924888610839844 * (input["g"] || 0) +
                        1.5678222179412842 * (input["b"] || 0)
                    )) +
              (3.3799149990081787 * 1) /
                (1 +
                  1 /
                    Math.exp(
                      0.28058019280433655 +
                        2.929636240005493 * (input["r"] || 0) -
                        3.8517744541168213 * (input["g"] || 0) +
                        1.3293538093566895 * (input["b"] || 0)
                    ))
          )),
  };
}
