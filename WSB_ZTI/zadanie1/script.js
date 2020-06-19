// dane wypełniające tabelę minimum 4x8 + nagłówek i stopka wygenerowane w JS
var tableData = [{
    "lp": 1,
    "country": "Polska",
    "city": "Gdańsk",
    "population": 3500,
    "place": 1300
}, {
    "lp": 2,
    "country": "Polska",
    "city": "Warszawa",
    "population": 6000,
    "place": 1700
}, {
    "lp": 3,
    "country": "Niemcy",
    "city": "Berlin",
    "population": 11000,
    "place": 5000
}, {
    "lp": 4,
    "country": "Niemcy",
    "city": "Monachium",
    "population": 7600,
    "place": 3900
}, {
    "lp": 5,
    "country": "Anglia",
    "city": "Londyn",
    "population": 13000,
    "place": 4200
}, {
    "lp": 6,
    "country": "Anglia",
    "city": "Liverpool",
    "population": 6000,
    "place": 2100
}, {
    "lp": 7,
    "country": "USA",
    "city": "Boston",
    "population": 20000,
    "place": 4000
}, {
    "lp": 8,
    "country": "USA",
    "city": "Miami",
    "population": 8000,
    "place": 1111
}, {
    "lp": 9,
    "country": "Hiszpania",
    "city": "Madryt",
    "population": 7500,
    "place": 2134
}, {
    "lp": 10,
    "country": "Hiszpania",
    "city": "Barcelona",
    "population": 31000,
    "place": 5153
}, {
    "lp": 11,
    "country": "Austria",
    "city": "Wiedeń",
    "population": 2300,
    "place": 3313
}, {
    "lp": 12,
    "country": "Szwajcaria",
    "city": "Berno",
    "population": 18000,
    "place": 2146
}];

// stwórz nagłówek tabeli
function buildTableHead(ID = "head_table") {
    document.getElementById(ID).innerHTML = "<tr><td>lp.</td><td>Państwo</td><td>Miasto</td><td>Ludność</td><td>Obszar</td></tr>";
}

// stwórz ciało tabeli
function buildTable(tableData, ID = "body_table") {

    // cały content tabeli
    let _html = "";

    // na kazdy json object
    for (jobject = 0; jobject < tableData.length; jobject++) {
        _html += "<tr><td>";
        _html += tableData[jobject].lp;
        _html += "</td><td>";
        _html += tableData[jobject].country;
        _html += "</td><td>";
        _html += tableData[jobject].city;
        _html += "</td><td>";
        _html += tableData[jobject].population;
        _html += "</td><td>";
        _html += tableData[jobject].place;
        _html += "</td></tr>";
    }

    // wrzuć content do tabeli
    document.getElementById(ID).innerHTML = _html;
}

// stwórz stopkę tabeli z danymi zbiorczymi
function buildTableFooter(tableData, ID = "foot_table") {

    // weź tablicę jako obiekt
    let _table = document.getElementById("body_table");

    // z danych tabeli posumuj ludność i obszar
    let _table_peoples_sume = 0,
        _table_land_sume = 0;

    console.log("zmienne:");
    console.log(_table_peoples_sume);
    console.log(_table_land_sume);

    for (i = 0; i < _table.rows.length; i++) {

        console.log(i);
        console.log("Ludność: " + _table.rows[i].cells[3].innerHTML);
        console.log("Ląd: " + _table.rows[i].cells[4].innerHTML);

        if (!isNaN(_table.rows[i].cells[3].innerHTML)) {
            _table_peoples_sume += parseInt(_table.rows[i].cells[3].innerHTML);
        }
        if (!isNaN(_table.rows[i].cells[4].innerHTML)) {
            _table_land_sume += parseInt(_table.rows[i].cells[4].innerHTML);
        }

        console.log("Suma ludności: " + _table_peoples_sume);
        console.log("Suma obszaru: " + _table_land_sume);
        console.log("_____________________________");
    }

    let _table_average_people = (_table_peoples_sume / _table.rows.length);
    let _table_average_land = (_table_land_sume / _table.rows.length);

    console.log(_table_peoples_sume);
    console.log(_table_land_sume);
    console.log(_table_average_people);
    console.log(_table_average_land);

    // zacznij pisać kod html stopki
    let _html = "<tr>";

    // łączna suma ludności
    // łączna suma obszaru zajmowanego
    _html += "<td>";
    _html += "Suma:";
    _html += "</td><td></td><td></td><td>" +
        _table_peoples_sume + "</td>" + "<td>" + _table_land_sume + "</td></tr>";

    _html += "<tr>";

    // średnia ludności
    // średnia obszaru zajmowanego
    _html += "<td>";
    _html += "Średnia";
    _html += "</td><td></td><td></td><td>" +
        _table_average_people + "</td>" + "<td>" + _table_average_land + "</td></tr>";

    document.getElementById(ID).innerHTML = _html;
}

// sortowanie tabeli względem... rosnąco/malejąco
function sortTableData(column, rosn) {
    console.log("sortTableData");
    let columnId = 0;

    // by which column to sort
    if (column === "lp_sort") columnId = 0;
    else if (column === "country_sort") columnId = 1;
    else if (column === "town_sort") columnId = 2;
    else if (column === "ppl_sort") columnId = 3;
    else columnId = 4;

    let order = 0;
    if (rosn === "rosn") order = 1;
    else order = -1;

    if (columnId === 1) {
        tableData.sort(function(left, right) {
            return left.country.toString().localeCompare(
                right.country.toString()
            ) * oder;
        });
    } else if (columnId === 2) {
        tableData.sort(function(left, right) {
            return left.city.toString().localeCompare(
                right.city.toString()
            ) * order;
        });
    } else if (columnId === 0) { // just numbers
        // rosnąco
        if (rosn === "rosn") {
            tableData.sort(function(left, right) {
                return left.lp - right.lp;
            });
        }
        // malejąco
        else {
            tableData.sort(function(left, right) {
                return right.lp - left.lp;
            });
        }
    } else if (columnId === 3) {
        // rosnąco
        if (rosn === "rosn") {
            tableData.sort(function(left, right) {
                return left.population - right.population;
            });
        }
        // malejąco
        else {
            tableData.sort(function(left, right) {
                return right.population - left.population;
            });
        }
    } else {
        // rosnąco
        if (rosn === "rosn") {
            tableData.sort(function(left, right) {
                return left.place - right.place;
            });
        }
        // malejąco
        else {
            tableData.sort(function(left, right) {
                return right.place - left.place;
            });
        }
    }

    // postaw stronę jeszcze raz posortowane
    filterTable(document.getElementById('filtruj').value);
    filterTableData(document.getElementById('filtruj').value);
}

// filtrowanie tabeli
function filterTableData(data_value) {
    console.log("filterTableData");
    if (data_value === "") {
        buildWebsite(tableData);
    } else {
        buildWebsite(tableData.filter(
            function(dataArg) {
                return data_value.includes(dataArg[2]);
            }
        ));
    }
}

function filterTable(column_value) {
    console.log("filterTable");
    if (column_value === "") {
        buildWebsite(tableData);
    } else {
        var newTable = tableData.filter(function(row) {
            return row.country == column_value;
        });

        buildWebsite(newTable);
    }
}

// zbuduj stronę(tabelę)
function buildWebsite(tableData) {
    console.log(tableData);

    console.log("THead");
    buildTableHead();

    console.log("TBody");
    buildTable(tableData);

    console.log("TFoot");
    buildTableFooter(tableData);
}

buildWebsite(tableData);