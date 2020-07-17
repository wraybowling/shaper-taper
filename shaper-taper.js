const validBitCombos = [
  [
    //0 one/five bit
    [0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
  ],

  [
    //1 two/four bit
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 1, 1, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],

    [0, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0],
    [1, 0, 1, 0, 0, 0],

    [0, 0, 1, 0, 0, 1],
    [0, 1, 0, 0, 1, 0],
    [1, 0, 0, 1, 0, 0],

    [0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0],

    [1, 0, 0, 0, 0, 1],
  ],

  [
    //2 three bit
    [0, 0, 0, 1, 1, 1],
    [0, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 0],
    [1, 1, 1, 0, 0, 0],

    [0, 0, 1, 0, 1, 1],
    [0, 1, 0, 1, 1, 0],
    [1, 0, 1, 1, 0, 0],

    [0, 0, 1, 1, 0, 1],
    [0, 1, 1, 0, 1, 0],
    [1, 1, 0, 1, 0, 0],

    [0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0],
  ],
];

let validCombinations = [
  [
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
  ],
];

function invert(arr) {
  newarr = [];
  for (let i = 0; i < arr.length; i++) {
    newarr.push(arr[i] === 1 ? 0 : 1);
  }
  return newarr;
}

// match each subset of valid bit combos with every inverted combination
// 1 with inverted 5
// 2 with inverted 4
// 3 with itself without repeating

for (let subset = 0; subset < validBitCombos.length; subset++) {
  for (let topRow = 0; topRow < validBitCombos[subset].length; topRow++) {
    for (let botRow = 0; botRow < validBitCombos[subset].length; botRow++) {
      if (topRow !== botRow) {
        validCombinations.push([
          validBitCombos[subset][topRow],
          invert(validBitCombos[subset][botRow]),
        ]);
      }
    }
  }
}

// console.log(validCombinations)

const app = new Vue({
  el: "#app",
  components: { "domino-template": { template: "#domino-template" } },
  data() {
    return {
      randomSeed: "My Rad Project",
      dominoCount: 28,
      rowSpacing: 20,
      columnSpacing: 1,
      validCombos: validCombinations,
    };
  },
  computed: {
    permutation() {
      let shuffledDominoes = [].concat(this.validCombos);
      Math.seedrandom(this.randomSeed);
      for (let i = this.validCombos.length - 1; i >= 0; i--) {
        let select = Math.floor(Math.random() * i);
        let swap = shuffledDominoes[i];
        shuffledDominoes[i] = shuffledDominoes[select];
        shuffledDominoes[select] = swap;
        console.log;
      }
      console.log(shuffledDominoes[0][0]);
      // shuffledDominoes.length = this.dominoCount;
      return shuffledDominoes.slice(0, this.dominoCount);
    },
  },
});
