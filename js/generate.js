var dict = {};
var selectedLevel = "IV";
var printID = true;
const HEAD_ROW_INDEX = 0;


function myFunctionDict(value, index, array) {
  var key = value[4];
  if (!(typeof key == "undefined")) {
    dict[key] = value;
    //console.log(index + " " + key);
  }
}

function treeDepth(key) {
  let value = dict[key];
  if (!(typeof value == "undefined")) {
    return 1 + treeDepth(value[3]);
  }
  return 0;
}

function myFunctionP(list, value, index, array) {
  return list + "<br>" + "<br>" + value[4];
}

function formatText(value) {
  if (printID) return "<b>" + value[4] + "</b>" + ": " + value[6];
  else return "" + value[6];
}

function isCorrectLevel(selectedLevel, value) {
  if (selectedLevel == "IV" && value[0] == "X") return true;
  if (selectedLevel == "V" && value[1] == "X") return true;
  if (selectedLevel == "VI" && value[2] == "X") return true;
  return false;
}

function myFunctionTableRow(list, value, index, array) {
  if (index === HEAD_ROW_INDEX) {
    console.log("row head:" + value);
    return "";
  }
  if (typeof value == "undefined") return "";
  if (!isCorrectLevel(selectedLevel, value)) return list;
  let depth = treeDepth(value[4]);
  if (depth == 0) return list;
  if (depth == 1) return list + "<tr><td colspan=3>" + formatText(value) + "</td></tr>\n";
  if (depth == 2) return list + "<tr><td>&nbsp;</td><td colspan=2>" + formatText(value) + "</td></tr>\n";
  if (depth > 2) return list + "<tr><td>&nbsp;</td><td>&nbsp;</td><td>" + formatText(value) + "</td></tr>\n";
  return "";
}

function generateHTMLTable(level, useCodes) {
  selectedLevel = level;
  printID = useCodes;
  console.log("Selected level:" + level);
  var csvData = document.getElementById("taCSV").value;
  var csvParse = CSVToArray(csvData, "\t");
  csvParse.forEach(myFunctionDict); //fill dict
  //generate table
  //document.getElementById("resultTables").innerHTML = CSVToArray(csvData, " ");
  var table = '<table style="width:100%">\n';
  table += "<tr><th>Področja del</th><th>Ključna dela</th><th>Znanja in spretnosti</th></tr>\n";
  table += csvParse.reduce(myFunctionTableRow, "");
  table += "</table>";
  console.log(table);
  document.getElementById("resultTable").innerHTML = table;
  selectElementContents(document.getElementById("resultTable"));
}
