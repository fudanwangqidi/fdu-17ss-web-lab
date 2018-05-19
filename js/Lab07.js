deleteRowBox = document.getElementById("deleteRowBox");
tableName = document.getElementById("tableName");
colNum = document.getElementById("colNum");
createTableBox = document.getElementById("createTableBox");
tableBox = document.getElementById("tableBox");
select2 = document.getElementById("select2");
addRowBox = document.getElementById("addRowBox");
select1 = document.getElementById("select1");
btCommit = document.getElementById("btCommit");
attributeBox = document.getElementById("attributeBox");
warningBox = document.getElementById("warningBox");
btCommitBox = document.getElementById("btCommitBox");
function hidde(id) {
    document.getElementById(id).style.display = "none";
}

function show(parts) {
    document.getElementById(parts).style.display = "block";
}
select1.onchange = function () {
    check();
};
select2.onchange = function () {
    tableBox.innerHTML = "";
    let index = select2.selectedIndex;
    if(index > 0){
        tableBox.append(tables[index - 1].tableNode);
    }
    check();
};
colNum.oninput = function () {
    let num = colNum.value ;
    if(num > 0){
        attributeBox.innerHTML = "";
        for(let i = 0 ; i < num ; i++){
            let attribute = document.createElement("input");
            attribute.placeholder = "Attr" + (i + 1);
            attributes[i] = attribute;
            attributeBox.append(attributes[i]);
        }
        show("attributeBox");
        show("btCommitBox");

    }else if(num === ""){
       hidde("attributeBox");
        hidde("btCommitBox");
    }
};
function createRow(row,parent) {
    parent.innerText = "";
    let num = 0;
    let name = select2.options[select2.selectedIndex].value;
    for(let i = 0 ; i < numOfTable ; i++){
        if(i+1 === select2.selectedIndex){
            num = tables[i].getColNum();
        }
    }
    for(let i = 0 ; i < num ; i++){
        let input = document.createElement("input");
        input.setAttribute("type", "text",);
        row[i] = input;
        parent.append(input);
    }
}
createRowInput = [];
deleteRowInput = [];
tables = [];
numOfTable = 0 ;
attributes = [];
function check() {
    let index = select1.selectedIndex;
    let selected = select1.options[index].value ;
    switch (selected){
        case "SELECT ONE":
            hidde("btCommitBox");
            hidde("createTableBox");
            hidde("attributeBox");
            hidde("addRowBox");
            hidde("deleteRowBox");
            hidde("warningBox");
            break;
        case "CREATE TABLE":
            attributeBox.innerHTML = "";
            colNum.value = "";
            tableName.value = "";
            btCommit.onclick = function () {
                let table = new Table(colNum.value,document.getElementById("tableName").value);
                tables[numOfTable] = table;
                numOfTable++;
                tableBox.innerHTML = "";
                tableBox.append(table.tableNode);
               show("tableBox");
                let option = document.createElement("option");
                select2.add(option);
                option.innerText = tableName.value;
                option.index = numOfTable;
                option.selected = true;
                colNum.value = "";
                tableName.value = "";
                check();
            };
            if(colNum.value > 0){
                show("btCommitBox");
               show("attributeBox");
            }else {
               hidde("btCommitBox");
                hidde("attributeBox");
            }
            show("createTableBox");
            hidde("addRowBox");
            hidde("deleteRowBox");
            hidde("warningBox");
            break;
        case "ADD ROW":
            createRow(createRowInput,addRowBox);
            show("btCommitBox");
            show("addRowBox");
            hidde("createTableBox");
            hidde("attributeBox");
            hidde("deleteRowBox");
            hidde("warningBox");
            btCommit.onclick = function () {
                let tr = document.createElement("tr");
                tables[select2.selectedIndex - 1].tableNode.append(tr);
                for(let i = 0 ; i < tables[select2.selectedIndex - 1].getColNum() ; i++){
                    let td = document.createElement("td");
                    td.innerText = createRowInput[i].value;
                    tr.append(td);
                }
            };
            break;
        case "DELETE ROW":
            createRow(deleteRowInput,deleteRowBox);
            show("btCommitBox");
           show("deleteRowBox");
            hidde("addRowBox");
            hidde("createTableBox");
            hidde("attributeBox");
            hidde("warningBox");
            btCommit.onclick = function () {
                let arr = [];
                for(let i = 0 ; i < tables[select2.selectedIndex - 1].getColNum() ; i++){
                    arr[i] = deleteRowInput[i].value;
                }
                deleteRow(tables[select2.selectedIndex - 1].tableNode,arr);
            };
            break;
        case "DELETE TABLE":
            show("warningBox");
            show("btCommitBox");
            hidde("createTableBox");
            hidde("attributeBox");
            hidde("addRowBox");
            hidde("deleteRowBox");
            btCommit.onclick = function () {
                let tableIndex = select2.selectedIndex - 1;
                if(tableIndex >= 0){
                    tables.splice(tableIndex,1);
                    select2.removeChild(select2.options[select2.selectedIndex]);
                    select2.options[0].selected = true;
                    numOfTable--;
                    tableBox.innerHTML = "";
                }
            };
            break;
    }
}
function Table(colNum,name) {
    this.name = name;
    this.colNum = colNum;
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    table.append(thead);
    for(let i = 0 ; i < colNum ; i++){
        let td = document.createElement("td");
        if(attributes[i].value === ""){
            td.innerText = "    ";
        }else {
            td.innerText = attributes[i].value;
        }
        thead.append(td);
    }
    this.tableNode = table;
    this.getName = function () {
        return this.name;
    };
    this.getColNum = function () {
        return this.colNum;
    };
}
function deleteRow(table,tdArray) {
    let trs = table.getElementsByTagName("tr");
    checkRow:
        for(let i = trs.length - 1 ; i >= 0  ; i--){
            let tds = trs[i].getElementsByTagName("td");
            if(tds.length !== tdArray.length)return;
            for(let j = 0 ; j < tds.length ; j++){
                if(!(tdArray[j] === "" || tdArray[j] === tds[j].innerText))continue checkRow;
            }
            table.deleteRow(i);
        }
}