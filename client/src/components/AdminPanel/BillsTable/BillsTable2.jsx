import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridColumns,
  GridRowsProp,
  GridRowId,
} from "@mui/x-data-grid-pro";

const columns = [
  { field: "user", headerName: "User", width: 200 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "id", headerName: "ID", width: 230 },
  {
    field: "totalPrice",
    headerName: "Total Price",
    width: 150,
    type: "number",
  },
  {
    field: "date",
    headerName: "Date",
    width: 160,
  },
  {
    field: "status",
    headerName: "Status",
    description: "Your bill status.",
    // sortable: false,
    width: 160,
  },
];

// const rows =  bills?.map((e) => ({
//     key: e._id,
//     id: e._id,
//     user: `${e.user.firstName} ${e.user.lastName}`,
//     email: e.user.email,
//     firstName: e.user.firstName,
//     lastName: e.user.lastName,
//     totalPrice: e.total,
//     date: e.date
//   }));
// [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function BillTable2() {
  const { bills } = useSelector((state) => state.users);

  const rows = bills?.map((e) => ({
    user: `${e.user.firstName} ${e.user.lastName}`,
    id: e._id,
    email: e.user.email,
    totalPrice: e.total,
    date: e.date,
    status: e.status,
  }));

  const [detailPanelExpandedRowIds, setDetailPanelExpandedRowIds] =
    React.useState([]);

  const handleDetailPanelExpandedRowIdsChange = React.useCallback((newIds) => {
    setDetailPanelExpandedRowIds(newIds);
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGridPro
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        style={{ textTransform: "capitalize" }}
        autoHeight={true}
        autoPageSize={true}

        rowThreshold={0}
          getDetailPanelContent={({ row }) => (
            <Box sx={{ p: 2 }}>{`Order #${row.id}`}</Box>
          )}
          getDetailPanelHeight={() => 50}
          detailPanelExpandedRowIds={detailPanelExpandedRowIds}
          onDetailPanelExpandedRowIdsChange={handleDetailPanelExpandedRowIdsChange}
          
        //disableColumnSelector -> saca el esconder columnas
        //experimentalFeatures={{columnGrouping: true}}
      />
    </div>
  );
}
