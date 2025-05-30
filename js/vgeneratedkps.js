/*
Fill dictionary
*/
function myFunctionDictSubjects(value, index, array) {
  value.forEach(mySubjects);
}

/**
 * Fill missing data
 */
function myFillHeadData(csvParse) {
  for (let i = 0; i < csvParse[0].length; i++) {
    if (csvParse[0][i].length < 2) csvParse[0][i] = csvParse[0][i - 1];
  }
}
function getBackgroundColor(value) {
  let bgColor = `style="background-color:Azure"`; // Default color
  if (value === "V") {
    bgColor = `style="background-color:Green; color:white"`;
  } else if (value === "P") {
    bgColor = `style="background-color:Yellow; color:black"`;
  } else if (value === "N") {
    bgColor = `style="background-color:Red; color:white"`;
  }
  return bgColor;
}

var legend = `
<div class="legend">
  <span style="background-color:Green; color:white">V – vključeno</span>
  <span style="background-color:Yellow">P – pomanjkljivo (potrebno dopolniti)</span>
  <span style="background-color:Red; color:white">N – ni vključeno (potrebno dodati)</span>
</div>
`;

/**
 * Generates tables
 */
function generateTablesByCourse(csvParse) {
  console.log("Generate tables " + csvParse[0].length);
  var table = "";
  let current = "";
  let newTable = false;
  for (let i = 4; i < csvParse[0].length; i++) {
    if (csvParse[0][i] != current) {
      current = csvParse[0][i];
      if (newTable) {
        table += "</table>"; //ENDOld
        table += legend + "\n<br>";
      }
      newTable = true;
      table += "<h2>" + current + "</h2>\n<table>\n";
      table += "<tr><th>DK</th><th>Opis</th><th>Vključenost</th></tr>\n";
      console.log("Head " + current);
    }

    for (let j = 2; j < csvParse.length; j++) {
      // if (csvParse[j][i] > 0) {
      if (
        csvParse[j][i] !== undefined &&
        csvParse[j][i] !== 0 &&
        csvParse[j][i] !== ""
      ) {
        let bgColor = getBackgroundColor(csvParse[j][i]);
        table += `<tr ${bgColor};">`;
        //table += "<td>" + csvParse[1][i] + "</td>";
        table += "<td>" + csvParse[j][0] + "</td>";
        table += "<td>" + csvParse[j][1] + "</td>";
        table += "<td>" + csvParse[j][i] + "</td>";
        console.log(csvParse[j][i]);
        table += "</tr>\n";
      }
    }
  }
  if (newTable) {
    table += "</table>"; //ENDOld
    table += legend + "\n<br>";
  }

  return table;
}

// function generateTablesByYear(csvParse) {
//   console.log("Generate tables " + csvParse[0].length);
//   var table = "";
//   let current = "";
//   var tmp = "";
//   table += "<h2>" + " Gimnazija</h2>\n<table>\n";
//   table += "<table>";
//   table +=
//     "<tr><th>Predmet</th><th>DK</th><th>Opis</th><th>Vključenost</th></tr>\n";
//   for (let i = 3; i < csvParse[0].length; i++) {
//     // if (csvParse[1][i] == year) {
//     current = csvParse[0][i];
//     for (let j = 3; j < csvParse.length; j++) {
//       //if (csvParse[j][i] > 0) {
//       if (
//         csvParse[j][i] !== undefined &&
//         csvParse[j][i] !== 0 &&
//         csvParse[j][i] !== ""
//       ) {
//         let bgColor = getBackgroundColor(csvParse[j][i]);
//         table += `<tr ${bgColor};">`;
//         tmp = csvParse[0][i];
//         table += "<td>" + tmp + "</td>";
//         table += "<td>" + csvParse[j][0] + "</td>";
//         table += "<td>" + csvParse[j][1] + "</td>";
//         table += "<td>" + csvParse[j][i] + "</td>";
//         console.log(csvParse[j][i]);
//         table += "</tr>\n";
//       }
//     }
//     //   }
//   }
//   table += "</table>"; //ENDOld
//   table += legend + "\n<br>";

//   return table;
// }

//Pa izpis po posamezni kompetenci (po nivojih, v katerem razredu, pri katerem predmetu)
function generateTablesByDK(csvParse) {
  var table = "";
  let current = "";
  let newTable = false;
  for (let i = 2; i < csvParse.length; i++) {
    table +=
      "<h2>" + csvParse[i][0] + " - " + csvParse[i][1] + "</h2>\n<table>\n";
    table += "<tr><th>Predmet</th><th>Vključenost</th></tr>\n";
    //  for (let y = 1; y <= 3; y++)
    for (let j = 4; j < csvParse[i].length; j++) {
      //  if (csvParse[1][j] == y) {
      //sort by y
      if (csvParse[i][j] !== 0 && csvParse[i][j] !== "") {
        //if (csvParse[i][j] > 0) {
        let bgColor = getBackgroundColor(csvParse[i][j]);
        table += `<tr ${bgColor};">`;
        //table += "<td>" + csvParse[1][j] + "</td>";
        table += "<td>" + csvParse[0][j] + "</td>";
        table += "<td>" + csvParse[i][j] + "</td>";
        table += "</tr>\n";
      }
    }
    //  }
    table += "</table>\n"; //ENDOld
    table += legend + "\n<br>";
  }
  console.log(table);
  return table;
}

//TODO???remove this func
function generateHTMLTable(type) {
  var csvData = //tmp format data
    "ID	Digitalna kompetenca	SUM	MAX	SLJ - Slovenščina 									MAT - Matematika 									Tuj jezik								LUM - Likovna umetnost									GUM - Glasbena umetnost 									DRU - Družba 		GEO - Geografija				ZGO - Zgodovina 				DKE - Državljanska kultura in etika 		SPO - Spoznavanje okolja 			FIZ - Fizika 		KEM - Kemija 		BIO - Biologija 		NAR - Naravoslovje 		NIT - Naravoslovje in tehnika 		TIT - Tehnika in tehnologija			GOS - Gospodinjstvo 		ŠPO - Šport 								" +
    "\n	Count			0	3	5	1	3	2	2	2	3	0	1	1	1	2	2	2	2	3	0	0	2	1	0	2	2	2	0	0	1	2	2	2	2	2	2	0	0	0	0	0	2	3	0	0	1	1	0	3	3	2	3	2	2	2	2	2	0	1	1	3	3	2	2	2	2	2	2	1	2	3	4	3	2	2	0	0	0	0	0	0	2	2	2" +
    "\n1.1	Brskanje, iskanje in izbira podatkov, informacij in digitalnih vsebin	8	5	 	2	2		3		4	4													2					5															3																																										" +
    "\n1.2	Vrednotenje podatkov, informacij in digitalnih vsebin	6	4																								3	4																										2	3	4	4																													" +
    "\n1.3	Upravljanje s podatki, informacijami in digitalnimi vsebinami	9	4													1	2		2	3	4																																										3	4					2	2																" +
    "\n2.1	Sporazumevanje z uporabo digitalnih tehnologij	2	5			1						5																																																																										";
  var valueAll = document.getElementById("taCSV").value;
  if (valueAll.length > 10) csvData = valueAll;
  console.log(csvData);
  var csvParse = CSVToArray(csvData, "\t");
  myFillHeadData(csvParse);
  console.log(csvParse);
  var table = "";
  if (type == 1) table = generateTablesByCourse(csvParse);
  if (type == 3) table = generateTablesByDK(csvParse);

  if (type == 2)
    for (let y = 1; y <= 9; y++) table += generateTablesByYear(csvParse);
  //csvParse.forEach(myFunctionDict); //fill dict

  document.getElementById("resultTable").innerHTML = table;
  console.log(table);
  selectElementContents(document.getElementById("resultTable")); //selects and copy on clipboard
}

function getDataText(typeP) {
  // read text from URL location
  var request = new XMLHttpRequest();

  request.open("GET", "https://mir1001.github.io/cpi_generate/vdkps.txt", true);
  request.send(null);
  console.log("Izbran tip:" + typeP);
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var type = request.getResponseHeader("Content-Type");
      if (type.indexOf("text") !== 1) {
        console.log(request.responseText);
        var csvParse = CSVToArray(request.responseText, "\t");
        myFillHeadData(csvParse);
        console.log(csvParse);
        var table = "";
        if (typeP == 1) table = generateTablesByCourse(csvParse);
        if (typeP == 3) table = generateTablesByDK(csvParse);

        //if (typeP == 2) table += generateTablesByYear(csvParse);
        //csvParse.forEach(myFunctionDict); //fill dict
        document.getElementById("resultTable").innerHTML = table;

        return request.responseText;
      }
    }
  };
}
