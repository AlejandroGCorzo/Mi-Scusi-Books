import React, { useState, useEffect } from "react";
//import 'antd/dist/antd.css';
//import 'antd/dist/antd.less';
import "../BillsTable/index.css";
import { DownOutlined } from "@ant-design/icons";
import { Popconfirm, Badge, Dropdown, Menu, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import DescriptionDialog from "./DescriptionDialog";
import { Button } from "@mui/material";

const ReportsTable = () => {
  const accessToken =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");
  const { reports } = useSelector((state) => state.users);

  //////////Reform Reports Data///////////////////
  const reports2 = reports?.map((e) => ({
    key: e._id,
    id: e._id,
    user: e.user,
    email: e.email,
    rol: e.rol,
    subject: e.subject,
    description: e.description,
  }));

  /////////Eliminar Users Duplicados//////////////
  const duplicateFilter = reports?.map((e) => ({
    text: e.user,
    value: e.user,
  }));

  const uniqueFilter = [
    ...new Map(duplicateFilter.map((item) => [item.text, item])).values(),
  ];

  /////////Eliminar Emails Duplicados//////////////
  const duplicateEmails = reports?.map((e) => ({
    text: e.email,
    value: e.email,
  }));

  const EniqueEmails = [
    ...new Map(duplicateEmails.map((item) => [item.text, item])).values(),
  ];

  /////////Eliminar Status Duplicados//////////////
  const duplicateStatus = reports?.map((e) => ({
    text: e.rol,
    value: e.rol,
  }));

  const EniqueStatus = [
    ...new Map(duplicateStatus.map((item) => [item.text, item])).values(),
  ];

  //////////////Dialog Manager/////////////////////////////////////

  // const [openDialog, setOpenDialog] = React.useState("");

  // const handleOpenDialog = () => {
  //   setOpenDialog(true);
  // };

  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  // };

  ////////////////////////////////////////////////////////////////////

//   const handleclickDialog = (desc, boolean, user) => {
//     <DescriptionDialog
//       description={desc}
//       openDialog={boolean}
//       //openDialog={openDialog}
//       // handleOpenDialog={handleOpenDialog}
//       // handleCloseDialog={handleCloseDialog}
//       userName={user}
//     />;
//   };

  ////////////////////////////////////////////////////////////////////

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      filters: uniqueFilter,
      filterSearch: true,
      onFilter: (name, userObject) => userObject.user.includes(name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      filters: EniqueEmails,
      filterSearch: true,
      onFilter: (email, userObject) => userObject.user.includes(email),
    },
    {
      title: "Rol",
      dataIndex: "rol",
      key: "rol",
      filters: EniqueStatus,
      filterSearch: true,
      onFilter: (email, userObject) => userObject.user.includes(email),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
  ];
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (_, record) => (
    //     <>
    //       <Button
    //         //onClick={(e) => handleclickDialog(record.description, true, record.user)}
    //         //onClick={(e) => setOpenDialog('click')}
    //         variant="outlined"
    //         style={{ "min-width": "140px" }}
    //       >
    //         Description
    //       </Button>
    //       <DescriptionDialog
    //         description={record.description}
    //         setOpenDialog={setOpenDialog}
    //         openDialog={openDialog}
    //         //openDialog={openDialog}
    //         // handleOpenDialog={handleOpenDialog}
    //         // handleCloseDialog={handleCloseDialog}
    //         userName={record.user}
    //       />
    //     </>
    //   ),
    // },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    // },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   filters: [
    //     {
    //       text: "Approved",
    //       value: "Approved",
    //     },
    //     {
    //       text: "Cancelled",
    //       value: "Cancelled",
    //     },
    //   ],
    //   filterSearch: true,
    //   render: (_, record) => (
    //     <span>
    //       {record.status === "approved" ? (
    //         <>
    //           <Badge status="success" /> Approved
    //         </>
    //       ) : (
    //         <>
    //           <Badge status="error" /> Cancelled
    //         </>
    //       )}
    //     </span>
    //   ),
    // },
    // {
    //   title: "Change Status",
    //   dataIndex: "action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       {record.status === "approved" ? (
    //         <Popconfirm
    //           title="Sure to set status to Cancelled?"
    //           onConfirm={(e) => handleMenuClick(record.key, record.status)}
    //         >
    //           <a>Set status Cancelled</a>
    //         </Popconfirm>
    //       ) : (
    //         <Popconfirm
    //           title="Sure to set status to Approved?"
    //           onConfirm={(e) => handleMenuClick(record.key, record.status)}
    //         >
    //           <a>Set status Approved</a>
    //         </Popconfirm>
    //       )}
    //     </Space>
    //   ),
    // },

  //   useEffect(() => {
  //     dispatch(getAllBills(accessToken));
  //   }, [dispatch]);

  return (
    <>
      <Table
        columns={columns}
        dataSource={reports2.reverse()}
        size="small"
        style={{ textTransform: "capitalize" }}
        pagination={{
          position: ["bottomLeft"],
        }}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {record.description}
            </p>
          ),
        }}
      />
    </>
  );
};

export default ReportsTable;
