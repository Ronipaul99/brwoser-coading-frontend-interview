import { useState } from "react";
import "./App.css";
import json from "./data.json";
import { useEffect } from "react";
//https://jsonplaceholder.typicode.com/posts
function App() {
  const [data, setData] = useState(json);
  const [isOpen, setisOpen] = useState([]);
  const [isSelected, setisSelected] = useState();

  useEffect(()=>{
    setData(sortList(data))
    console.log("after sort",data)
  },[])

  const sortList = (list)=>{
    let folders = []
    let files = []
    list.forEach(item=>{
      if(item.isfolder){
        if(item.children.length>0){
          item.children = sortList(item.children)
        }
        folders.push(item)
      }else{
        files.push(item)
      }
    })
    return [...folders , ...files]
  }
  const checkIsOpen = (id) => {
    return isOpen.includes(id);
  };

  const handleOpenFolder = (id) => {
    setisOpen([...isOpen, id]);
  };

  const handleCloseFolder = (id) => {
    setisOpen(isOpen.filter((listId) => listId !== id));
  };

  const checkIsSelected = (id) => {
    return isSelected === id;
  };
  const handleSelected = (id) => {
    setisSelected(id);
  };
  const renderList = (list) => {
    return list.map((item, index) => {
      return (
        <div key={item.id} className="container">
          <div
            className={checkIsSelected(item.id) ? "item selected" : "item"}
            onClick={() => {
              handleSelected(item.id);
            }}>
            {item.isfolder &&
              (!checkIsOpen(item.id) ? (
                <i
                  class="fa-solid fa-angle-right"
                  onClick={() => {
                    handleOpenFolder(item.id);
                  }}></i>
              ) : (
                <i
                  class="fa-solid fa-angle-down"
                  onClick={() => {
                    handleCloseFolder(item.id);
                  }}></i>
              ))}
            <span>{item.name}</span>
          </div>
          {item.isfolder && checkIsOpen(item.id) && renderList(item.children)}
        </div>
      );
    });
  };
  return (
    <div className="App">
      <div className="title">
        FILE-SYSTEM
        <div className="icon-group">
          <i class="fa-solid fa-file-circle-plus"></i>
          <i class="fa-solid fa-folder-plus"></i>
          <i class="fa-solid fa-compress"></i>
        </div>
      </div>
      {renderList(data)}
    </div>
  );
}

export default App;
