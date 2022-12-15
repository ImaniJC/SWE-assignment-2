/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
 exports.findAllSolutions = function(grid, dictionary) {
	let solutions_Set = new Array(); 
  let solutions = [];

	/* if grid is empty or if dictionary is empty return solutions */
	if (grid == null || dictionary == null) { //checks of grid or dict is empty
	return solutions;
}
let N = grid.length;
  for (let i = 0; i < N; i++) {
    if (grid[i].length != N) {
      return solutions;
    }
  }

  LowerCase(grid, dictionary);

  if (!GridValidator(grid)) {
    return solutions;
  }

  let solutionSet = new Set();

  let hash = createHashMap(dictionary);

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      let word = "";

      let visited = new Array(N)
        .fill(false)
        .map(() => new Array(N).fill(false));

      PrintAllWords(word, y, x, grid, visited, hash, solutionSet);
    }
  }

  solutions = Array.from(solutionSet);

  return solutions;
};

PrintAllWords = function (word, y, x, grid, visited, hash, solutionSet) {
  let adjMatrix = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ];

  if (
    y < 0 ||
    x < 0 ||
    y >= grid.length ||
    x >= grid.length ||
    visited[y][x] == true
  )
    return;

  word += grid[y][x];

  if (WordChecker(word, hash)) {
    visited[y][x] = true;

    if (isWord(word, hash)) {
      if (word.length >= 3) solutionSet.add(word);
    }

    for (let i = 0; i < 8; i++) {
      PrintAllWords(
        word,
        y + adjMatrix[i][0],
        x + adjMatrix[i][1],
        grid,
        visited,
        hash,
        solutionSet
      );
    }
  }

  visited[y][x] = false;
};

WordChecker = function (word, hash) {
  return hash[word] != undefined;
};

isWord = function (word, hash) {
  return hash[word] == 1;
};

createHashMap = function (dictionary) {
  var dict = {};
  for (let i = 0; i < dictionary.length; i++) {
    dict[dictionary[i]] = 1;
    let wordlength = dictionary[i].length;
    var str = dictionary[i];
    for (let j = wordlength; wordlength > 1; wordlength--) {
      str = str.substr(0, wordlength - 1);
      if (str in dict) {
        if (str == 1) {
          dict[str] = 1;
        }
      } else {
        dict[str] = 0;
      }
    }
  }
  return dict;
};

LowerCase = function (grid, dict) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j].toLowerCase();
    }
  }

  for (let i = 0; i < dict.length; i++) {
    dict[i] = dict[i].toLowerCase();
  }
};

GridValidator = function (grid) {
  raexp = /(st|qu)|[a-prt-z]/;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!grid[i][j].match(raexp)) {
        return false;
      }
    }
  }

  return true;
};

	/*convertToLowerCase(grid, dictionary)
		let trie = new Set(dictionary);*/
		
	//for (int i = 0; i < grid.length; i++) { /* set int i , when i is less than the length of the grid increment i */
		//if (grid[i].length != grid.length) { /* if grid at i doesn't equal length of grid return solutions */
	//	return solutions;  
//}
 //} 

	//Lowercase (grid,dictionary){

	//}

/*for (let y = 0; y < grid.length; y++) {
for (let x = 0; x < grid.length; x++) {
let visited = new Array(grid.length).fill(false).map(() => new Array(grid.length).fill(false));
let word = [];//is empty to start
	findWords(word, grid, trie, x, y, visited, solutions_Set);
}
}
	solutions = Array.from(solutions_Set);
		return solutions;
}

function findWords(word, grid, trie, y, x, visited, solutions_Set) { 
	const adjacent_lookup = [[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, 1],
	[1, 1],
	[1, 0],
	[1, -1],
	[0, -1]]; }

	if (y < 0 || y >= grid.length || x < 0 || x >= grid.length || visited[y][x] == true) {
		return; }
	
	word += grid[y][x]; 
	if (isPrefix(trie, word)) {
		visited[y][x] = true;
	}
	if (isWord(trie, word)) {
		solutions_Set.push(word);
}

	for (let i = 0; i < 8; i++) {
		findWords(word, grid, trie, y + adjacent_lookup[i][0], x + adjacent_lookup[i][1], visited, solutions_Set); }

	visited[y][x] = false;

	for (let tword of trie) {

	if (tword.substr(0, word.length) == word) {
		return true;
}
}
		return false;


	function isWord(trie, word) {
		for (let tword of trie) {

			if (tword == word && word.length >= 3) {
				return true;
}
}
				return false;

	function convertToLowerCase(grid, dictionary) {
		for (let x = 0; x < grid.length; x++) {
		for (let i = 0; i < grid[x].length; i++) {
			grid[x][i] = grid[x][i].toLowerCase();
}
}
		for (let x = 0; x < dictionary.length; x++) {
			dictionary[x] = dictionary[x].toLowerCase();
}

}*/




var grid = [['T', 'W', 'Y', 'R'],
              ['E', 'N', 'P', 'H'],
              ['G', 'Z', 'Qu', 'R'],
              ['St', 'N', 'T', 'A']];
var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];

console.log(exports.findAllSolutions(grid, dictionary));
