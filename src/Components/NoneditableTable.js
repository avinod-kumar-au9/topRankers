import React, { useState, useEffect, useRef } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const NonEditableTable = (props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        paddingLeft: "50px",
        paddingRight: "50px",
        marginBottom: "10px",
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
        <div className="ag-theme-alpine" style={{ height: 300, width: "100%" }}>
          <h4>Submitted Data</h4>

          <AgGridReact
            rowData={props.childdata}
            defaultColDef={{
              flex: 1,
              minWidth: 100,
            }}
            
          >
            <AgGridColumn field="Id"></AgGridColumn>
            <AgGridColumn field="Name"></AgGridColumn>
            <AgGridColumn field="Email"></AgGridColumn>
            <AgGridColumn field="Gender"></AgGridColumn>
            <AgGridColumn field="DOB" ></AgGridColumn>
            <AgGridColumn field="Country"></AgGridColumn>
            <AgGridColumn field="City"></AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default NonEditableTable;
