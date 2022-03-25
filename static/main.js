let intervalID

set_list.onclick = async () => {
  const name = document.getElementById("name").value
  const response = await fetch("/api/setList?x=" + name,{
    method: "GET"
  })
  addlistData()
}

async function myCheck(){
  (async function() {
    $("thead tr").click(async function(){
      let i = $("thead tr").index(this)
      if(i>0){
        const response = await fetch("/api/getToDoList",{
          method: "GET"
        })
        const json = await response.json()
        const list = json.list
        const name = list[i-1].inside
        let result = window.confirm( name + "が完了でよろしいですか")
        if(result){
          const response = await fetch("/api/setCheck?x=" + i,{
          method: "GET"
          })
        }
      }
    })
  })()
}


async function addTable(name,done){
  let table = document.getElementById("stay_home_list")
  let newRow = table.insertRow()
  let newCell = newRow.insertCell()
  let ch
  if(done == true )ch = Object.assign(document.createElement('input'),{type:"checkbox",class:"ch",name:"ch",id:"ch",checked:"true",disabled:"disabled"})
  else ch = Object.assign(document.createElement('input'),{type:"checkbox",class:"ch",name:"ch",id:"ch",disabled:"disabled"})
  newCell.appendChild(ch)

  newCell = newRow.insertCell()
  let newText = document.createTextNode(name)
  newCell.appendChild(newText)

}

async function addlistData(){//リストにデータを表示
  const response = await fetch("/api/getToDoList",{
    method: "GET"
  })
  const json = await response.json()
  const list = json.list
  let table = document.getElementById("stay_home_list")
  table.deleteTHead()
  let thead = table.createTHead();
  let newRow = thead.insertRow();

  let newCell = newRow.insertCell()
  let newText = document.createTextNode("やったかチェック")
  newCell.appendChild(newText)

  newCell = newRow.insertCell()
  newText = document.createTextNode("やることの内容")
  newCell.appendChild(newText)

  for(let i = 0;i < list.length;i++){
    addTable(list[i].inside,list[i].done)
  }
  myCheck()
}

window.onload = await function() {
  intervalID = setInterval(addlistData,1000)
}