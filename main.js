const names =["EMMA GREEN","STEFFAN WILSON","HAZEL GRACE","ETHAN ANDERSON"];
const rno =["512","513","514","515"];
const branch = ["CSE","ECE","CSE","ECE"];
const yr = ["2015","2015","2015","2015"];
const head=["S.No.","NAME","ROLL NUMBER","BRANCH","YEAR","SELECT","EDIT","DELETE"];


const add=()=>{
    let a, b, c, d;
    let index;
    a = document.getElementById(`name`).value;
    b = document.getElementById(`rno`).value;
    c = document.getElementById(`branch`).value;
    d = document.getElementById(`year`).value;
    index = rno.indexOf(b);
    
    if (index == -1) 
    {
        names.push(a);
        rno.push(b);
        branch.push(c);
        yr.push(d);
        display();
    } 
    else
    {
        alert(`ROLL NUMBER ALREADY EXISTS`);
    }
    
}

const display=()=>{

    let newTable = document.getElementById(`table`);
    let l = names.length;
    newTable.innerHTML = "";
    let row=newTable.insertRow(0);
    let cell=[];
    for(i=0;i<8;i++)
    {
        cell[i]=row.insertCell(i);
        cell[i].innerHTML=head[i];
    }
                
    for (i = 0; i < l; i++) {

        row = newTable.insertRow(i + 1);
        for(j=0;j<8;j++)
        {
            cell[j]=row.insertCell(j);
        }

        cell[0].innerHTML = i + 1;
        cell[1].innerHTML = names[i];
        cell[2].innerHTML = rno[i];
        cell[3].innerHTML = branch[i];
        cell[4].innerHTML = yr[i];

        let chkbox = document.createElement('input');
        chkbox.type = "checkbox";
        chkbox.className = "chk";
        chkbox.name = "chk";
        cell[5].appendChild(chkbox);

        let img = document.createElement("img");
        img.setAttribute("src", "edit.jpg");
        img.setAttribute("width", "16");
        img.setAttribute("height", "16");

        let button = document.createElement("button");
        button.setAttribute("onclick","edit(this)");
        button.id = "edit";
        button.type="submit";
        button.appendChild(img);
        cell[6].appendChild(button);

        img = document.createElement("img");
        img.setAttribute("src", "delete.png");
        img.setAttribute("width", "16");
        img.setAttribute("height", "16");

        button = document.createElement("button");
        button.setAttribute("onclick", "delete1(this)");
        button.appendChild(img);
        cell[7].appendChild(button);
        }
    
}

const edit=(element)=>{
    let i= element.parentNode.parentNode.rowIndex;
    let table=document.getElementById("table");
    let cell=table.rows[i].cells;
    let name1=cell[1].innerHTML;
    let rno1=cell[2].innerHTML;
    let b1=cell[3].innerHTML;
    let yr1=cell[4].innerHTML;
    let input=[];
    let a=1;

    for(a=1;a<5;a++)
    {
       input[a]= document.createElement('input');
       if(a%2==0)
       {
           input[a].type=`number`;
       }
       else
       {
           input[a].type=`text`;
           input[a].setAttribute("pattern","[a-zA-Z][a-zA-Z ]+[a-zA-Z]$");
           input[a].title="Please enter alphabets only";
       }
       input[a].setAttribute("required",true);
   }
   input[1].id="1";
   input[2].id="2";
   input[3].id="3";
   input[4].id="4";

   input[1].value=name1;
   input[2].value=rno1;
   input[3].value=b1;
   input[4].value=yr1;
    
   for(a=1;a<5;a++)
   {
       if(cell[a].childNodes[0])
       cell[a].replaceChild(input[a],cell[a].childNodes[0]);
   } 
      
   let img = document.createElement("img");
   img.setAttribute("src","save.png");
   img.setAttribute("width","16");
   img.setAttribute("height","16");
   
   let button=document.createElement("button");
   button.setAttribute("onclick","save(this,check)");
   button.id="save";
   button.type="submit";

   button.appendChild(img); 
   cell[6].replaceChild(button,cell[6].childNodes[0]);
                                   
                     
}

function check(){
    
    if(document.getElementById("1").value&&document.getElementById("2").value&&document.getElementById("3").value&&document.getElementById("4").value)
    {
    return true;
    }
    else
    return false;
}

const save=(element,callback)=>{
    if(callback())
    {
    let i= element.parentNode.parentNode.rowIndex;
    let table=document.getElementById("table");
    let cell=table.rows[i].cells;
    let a,name1=" ",b1=" ",yr1=" ",rno1=" ";
    if(document.getElementById("1").value)
    name1=document.getElementById("1").value;
    if(document.getElementById("2").value)
    rno1=document.getElementById("2").value;
    if(document.getElementById("3").value)
    b1=document.getElementById("3").value;
    if(document.getElementById("4").value)
    yr1=document.getElementById("4").value;
    
    for(a=1;a<5;a++)
   {
       cell[a].removeChild(cell[a].childNodes[0]);
   }

    names[i-1]=name1;
    rno[i-1]=rno1;
    branch[i-1]=b1;
    yr[i-1]=yr1;

    cell[1].innerHTML=name1;
    cell[2].innerHTML=rno1;
    cell[3].innerHTML=b1;
    cell[4].innerHTML=yr1;


    let img = document.createElement("img");
    img.setAttribute("src","edit.jpg");
    img.setAttribute("width","16");
    img.setAttribute("height","16");

    let button=document.createElement("button");
    button.setAttribute("onclick","edit(this)");
    button.id="edit";
    button.appendChild(img); 
    cell[6].replaceChild(button,cell[6].childNodes[0]);
    }

    else
    {
        alert(`TEXT FIELDS CANNOT BE EMPTY`);
    }
}

const delete1=(...element)=> {

    let result = confirm(`ARE YOU SURE YOU WANT TO DELETE THE SELECTED ROW ?`);
    if (result) 
    {
    let i = element[0].parentNode.parentNode.rowIndex;
    let cell = document.getElementById("table").rows[i].cells;
    cell = cell[2].innerHTML;
    let index = rno.indexOf(cell);
    document.getElementById("table").deleteRow(i);
    names.splice(index,1);
    rno.splice(index,1);
    branch.splice(index, 1);
    yr.splice(index, 1);

    }
}

const multidelete=()=>{
    
    let chk= document.getElementsByClassName("chk");
    let rows = table.rows.length;
    let count=0;
    for(let i of chk){
       if(i.checked){
       count++;
      }
    }
    if (count==0)
        alert(`PLEASE SELECT ROWS YOU WANT TO DELETE`);
    else
     {
        let result = confirm(` ${count}`+` ROWS WILL BE DELETED !`);
        if (result) 
        {
            for (let i = 0; i < rows; i++)
            {
                    let row = table.rows[i];
                    let cbox = row.cells[5].childNodes[0];
                    if (null != cbox && true == cbox.checked) {
                        if (rows <= 1) {
                            alert("ROWS CANNOT BE DELETED");
                            break;
                        }
                        let cell = document.getElementById("table").rows[i].cells;
                        cell = cell[2].innerHTML;
                        let index = rno.indexOf(cell);
                        names.splice(index, 1);
                        rno.splice(index, 1);
                        branch.splice(index, 1);
                        yr.splice(index, 1);
                        table.deleteRow(i);
                        rows--;
                        i--;
                    }

            }

        }

     }

}