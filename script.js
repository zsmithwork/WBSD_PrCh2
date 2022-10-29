var pieceArray = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8);
var pureArray = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8);

function render() {
  for (let i = 0; i < 9; i++) {
    var j = pieceArray[i];
    $("#t" + i).attr("id", "TEMP" + j);
  }
  for (let i = 0; i < 9; i++) {
    var j = pieceArray[i];
    $("#TEMP" + j).attr("id", "t" + j);
  }
}

function reset() {
  for (let i = 0; i < 9; i++) {
    $("#t" + pieceArray[i]).attr("id", "TEMP" + i);
  }
  for (let i = 0; i < 9; i++) {
    $("#TEMP" + i).attr("id", "t" + i);
    pieceArray[i] = i;
  }
  console.log("reset array:");
  console.log(pieceArray);
}

function shuffleFunc() {
  reset();

  for (let i = 0; i < 9; i++) {
    var j = Math.floor(Math.random() * (9 - i));
    var temp = pieceArray[i];
    pieceArray[i] = pieceArray[j];
    pieceArray[j] = temp;
  }

  var diffCount = 0;

  for (let i = 0; i < 9; i++) {
    if (pieceArray[i] != pureArray[i]) {
        diffCount++;
    }
  }

  if (diffCount%2 == 1) {
    var temp = pieceArray[0];
    pieceArray[0] = pieceArray[1];
    pieceArray[1] = temp;
  }

  render();
  console.log("shuffled array:");
  console.log(pieceArray);
}

function tileFunc(id) {
  event.stopPropagation();
  var tileNum = parseInt(id);
  console.log("click " + id);

  var blank = touchingBlank();
  if (blank >= 0) {
    var temp = pieceArray[id];
    pieceArray[id] = pieceArray[blank];
    pieceArray[blank] = temp;

    swap(pieceArray[id], pieceArray[blank])
  }

  function touchingBlank() {
    var up = id - 3;
    var down = id + 3;
    var left = id - 1;
    var right = id + 1;
    if (id >= 3 && pieceArray[up]==8) {
      return up;
    }
    if (id < 6 && pieceArray[down]==8) {
      return down;
    }
    if ((id % 3) > 0 && pieceArray[left]==8) {
      return left;
    }
    if ((id % 3) < 2 && pieceArray[right]==8) {
      return right;
    }
    return -1;
  }

  function swap(i, j) {
    $("#t" + i).attr("id", "TEMP");
    $("#t" + j).attr("id", "t" + i);
    $("#TEMP").attr("id", "t" + j);
  }

  console.log(pieceArray);
}
