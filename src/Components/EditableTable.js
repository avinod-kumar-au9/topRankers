import React, { useState, useEffect, useRef } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import NonediatableTable from "./NoneditableTable";
import "./Editable.css";
import { render } from 'react-dom';

const App = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [dummy, setdummy] = useState("");

  const [rowData, setRowData] = useState("");
  const [childdata, setchilddata] = useState([]);

  useEffect(() => {
    if (
      localStorage.getItem("data") == null ||
      localStorage.getItem("data") == undefined
    ) {
      localStorage.setItem("data", JSON.stringify([]));
      setRowData(JSON.parse(localStorage.getItem("data")));
    } else {
      setRowData(JSON.parse(localStorage.getItem("data")));
      setchilddata(JSON.parse(localStorage.getItem("data")));
    }
  }, []);

  useEffect(() => {
    if (dummy) {
      localStorage.setItem("data", JSON.stringify(rowData));
      setdummy("");
      setchilddata(JSON.parse(localStorage.getItem("data")));
    }
  }, [dummy]);

  const deleteselectedRows = (e) => {
    const selectedNodes = gridApi.getSelectedNodes();

    let data = [...rowData];
    let filtereddata = [];
    if (selectedNodes) {
      if (selectedNodes.length > 0) {
        let indexes = [];
        for (var i = 0; i < selectedNodes.length; i++) {
          indexes.push(selectedNodes[i].rowIndex);
        }

        for (var j = 0; j < data.length; j++) {
          if (!indexes.includes(j)) {
            filtereddata.push(data[j]);
          }
        }

        setRowData(filtereddata);
        console.log(filtereddata);
      }
    }
  };
  console.log(rowData);

  const deletenonselectedRows = (e) => {
    const selectedNodes = gridApi.getSelectedNodes();

    let data = [...rowData];
    let filtereddata = [];

    if (selectedNodes) {
      console.log("here");
      if (selectedNodes.length > 0) {
        console.log("here");
        let indexes = [];
        for (var i = 0; i < selectedNodes.length; i++) {
          indexes.push(selectedNodes[i].rowIndex);
        }

        for (var j = 0; j < data.length; j++) {
          if (indexes.includes(j)) {
            filtereddata.push(data[j]);
          }
        }

        setRowData(filtereddata);
        console.log(filtereddata);
      } else {
        console.log("here");
        setRowData([]);
      }
    }

    // const selectedData = selectedNodes.map( node => node.data )
    // console.log(selectedData);
    // const selectedDataStringPresentation = selectedData.map( node => `${node.make} ${node.model}`).join(', ')
    // console.log(selectedDataStringPresentation);
    // alert(`Selected nodes: ${selectedDataStringPresentation}`)
  };

 

  const submitHandler = () => {
    gridApi.stopEditing();
    setdummy("some");
  };

  const addrowHandler = () => {
    let data = [
      ...rowData,
      {
        Id: "",
        Name: "",
        Email: "",
        Gender: "",
        DOB: "",
        Country: "",
        City: "",
      },
    ];
    setRowData(data);
  };

  const onGridReady = (params) => {
    console.log(params);
    console.log(params.api);
    console.log(params.columnApi);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onCellValueChanged = (event) => {
    let rowVal = event.data;
    let rowIdx = event.rowIndex;
    let data = [...rowData];
    for (var i = 0; i < data.length; i++) {
      data[rowIdx] = rowVal;
    }

    setRowData(data);
  };

  // const onCellEditingStarted =(event)=> {
  //     console.log(event);

  // }

  function getDatePicker() {
    function Datepicker() {}
    Datepicker.prototype.init = function (params) {
      this.eInput = document.createElement('input');
      this.eInput.value = params.value;
      this.eInput.classList.add('ag-input');
      this.eInput.style.height = '100%';
      window.jQuery(this.eInput).datepicker({ dateFormat: 'dd/mm/yy' });
    };
    Datepicker.prototype.getGui = function () {
      return this.eInput;
    };
    Datepicker.prototype.afterGuiAttached = function () {
      this.eInput.focus();
      this.eInput.select();
    };
    Datepicker.prototype.getValue = function () {
      return this.eInput.value;
    };
    Datepicker.prototype.destroy = function () {};
    Datepicker.prototype.isPopup = function () {
      return false;
    };
    return Datepicker;
  }


  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "100%",
          paddingLeft: "50px",
          paddingRight: "50px",
        }}
      >
        <div
          id="myGrid"
          style={{
            height: "100%",
            width: "100%",
          }}
          className="ag-theme-alpine"
        >
          <div
            className="ag-theme-alpine"
            style={{ height: 300, width: "100%" }}
          >
            <button className="buttonstyle" onClick={addrowHandler}>
              Add Row
            </button>
            <button className="buttonstyle" onClick={deleteselectedRows}>
              Delete Selected Rows
            </button>
            <button className="buttonstyle" onClick={deletenonselectedRows}>
              Delete Non Selected Rows
            </button>
            <button className="buttonstyle" onClick={submitHandler}>
              Submit
            </button>

            <AgGridReact
              defaultColDef={{
                flex: 1,
                minWidth: 100,
                editable: true,
              }}
              rowSelection="multiple"
              singleClickEdit={true}
              onGridReady={onGridReady}
              rowData={rowData}
              onCellValueChanged={onCellValueChanged}
              components={{ datePicker: getDatePicker() }}
            >
              <AgGridColumn
                field="Id"
                
                checkboxSelection={true}
              ></AgGridColumn>
              <AgGridColumn field="Name"></AgGridColumn>
              <AgGridColumn field="Email"></AgGridColumn>
              <AgGridColumn field="Gender"></AgGridColumn>
              <AgGridColumn field="DOB" cellEditor="datePicker"></AgGridColumn>
              <AgGridColumn field="Country"></AgGridColumn>
              <AgGridColumn field="City"></AgGridColumn>
            </AgGridReact>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <NonediatableTable childdata={childdata} />
    </div>
  );
};

export default App;
