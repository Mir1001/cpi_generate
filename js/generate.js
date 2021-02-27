var dict = {};
var selectedLevel = "IV"; //raven
var printID = true;
const HEAD_ROW_INDEX = 0;

const COL_IS_IV=0;
const COL_IS_V=1;
const COL_IS_VI=2;
const COL_KEY_PARENT=3;
const COL_KEY=4;
const COL_DESCRIPTION=6;

/*
Fill dictionary
*/
function myFunctionDict(value, index, array) {
  var key = value[COL_KEY];
  if (!(typeof key == "undefined")) {
    dict[key] = value;
    //console.log(index + " " + key);
  }
}

/*
  Calculate how many parents it has.
*/
function treeDepth(key) {
  let value = dict[key];
  if (!(typeof value == "undefined")) {
    return 1 + treeDepth(value[COL_KEY_PARENT]);
  }
  return 0;
}
/*
Description
*/
function formatText(value) {
  if (printID) return "<b>" + value[COL_KEY] + "</b>" + ": " + value[COL_DESCRIPTION];
  else return "" + value[COL_DESCRIPTION];
}

function isSelectedLevel(value) {
    if (value.trim() == "X") return true;
    if (value.trim() == "x") return true;
    if (value.trim() == "*") return true;
    if (value.trim() == "d") return true;
    if (value.trim() == "y") return true;
    return false;
}
/*
Use only selected items
*/
function isCorrectLevel(selectedLevel, value) {
  if (selectedLevel == "IV" && isSelectedLevel(value[COL_IS_IV])) return true;
  if (selectedLevel == "V" && isSelectedLevel(value[COL_IS_V])) return true;
  if (selectedLevel == "VI" && isSelectedLevel(value[COL_IS_VI])) return true;
  return false;
}

/*
Generate HTML table row
*/
function myFunctionTableRow(list, value, index, array) {
  if (index === HEAD_ROW_INDEX) {
    return list;
  }
  if (typeof value == "undefined") return list;
  if (!isCorrectLevel(selectedLevel, value)) return list;
  let depth = treeDepth(value[COL_KEY]);
  if (depth == 0) return list;
  if (depth == 1) return list + "<tr><td colspan=3>" + formatText(value) + "</td></tr>\n";
  if (depth == 2) return list + "<tr><td>&nbsp;</td><td colspan=2>" + formatText(value) + "</td></tr>\n";
  if (depth > 2) return list + "<tr><td>&nbsp;</td><td>&nbsp;</td><td>" + formatText(value) + "</td></tr>\n";
  return list;
}

function generateHTMLTable(level, useCodes) {
  selectedLevel = level;
  printID = useCodes;
  console.log("Selected level:" + level);
  var csvData = document.getElementById("taCSV").value;
  var csvParse = CSVToArray(csvData, "\t");
  csvParse.forEach(myFunctionDict); //fill dict
  var table = '<table style="width:100%">\n';
  table += "<tr><th>Področja del</th><th>Ključna dela</th><th>Znanja in spretnosti</th></tr>\n";
  table += csvParse.reduce(myFunctionTableRow, ""); //add rows
  table += "</table>";
  console.log(table);
  document.getElementById("resultTable").innerHTML = table; 
  selectElementContents(document.getElementById("resultTable")); //selects and copy on clipboard
}
