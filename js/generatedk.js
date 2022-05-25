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
      if (newTable) table += "</table>"; //ENDOld
      newTable = true;
      table += '<h2>' + current + '</h2>\n<table>\n';
      table += "<tr><th>Razred</th><th>DK</th><th>Opis</th><th>Raven</th></tr>\n";
      console.log("Head " + current);
    }

    for (let j = 3; j < csvParse.length; j++) {

      if (csvParse[j][i] > 0) {
        table += "<tr>";
        table += "<td>" + csvParse[1][i] + "</td>";
        table += "<td>" + csvParse[j][0] + "</td>";
        table += "<td>" + csvParse[j][1] + "</td>";
        table += "<td>" + csvParse[j][i] + "</td>";
        console.log(csvParse[j][i]);
        table += "</tr>\n";
      }
    }
  }
  if (newTable) table += "</table>"; //ENDOld

  return table;
}

function generateHTMLTable() {
  var csvData = //tmp format data
    "ID	Digitalna kompetenca	SUM	MAX	SLJ - Slovenščina 									MAT - Matematika 									Tuj jezik								LUM - Likovna umetnost									GUM - Glasbena umetnost 									DRU - Družba 		GEO - Geografija				ZGO - Zgodovina 				DKE - Državljanska kultura in etika 		SPO - Spoznavanje okolja 			FIZ - Fizika 		KEM - Kemija 		BIO - Biologija 		NAR - Naravoslovje 		NIT - Naravoslovje in tehnika 		TIT - Tehnika in tehnologija			GOS - Gospodinjstvo 		ŠPO - Šport 								" +
    "\n	Razred			1	2	3	4	5	6	7	8	9	1	2	3	4	5	6	7	8	9	2	3	4	5	6	7	8	9	1	2	3	4	5	6	7	8	9	1	2	3	4	5	6	7	8	9	4	5	6	7	8	9	6	7	8	9	7	8	1	2	3	8	9	8	9	8	9	6	7	4	5	6	7	8	5	6	1	2	3	4	5	6	7	8	9" +
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
  var table = generateTablesByCourse(csvParse);
  //csvParse.forEach(myFunctionDict); //fill dict

  document.getElementById("resultTable").innerHTML = table;
  console.log(table);
  selectElementContents(document.getElementById("resultTable")); //selects and copy on clipboard

}
