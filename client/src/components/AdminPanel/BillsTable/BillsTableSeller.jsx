import React, { useState, useEffect } from "react";
//import 'antd/dist/antd.css';
//import 'antd/dist/antd.less';
import "./index.css";
import { DownOutlined } from "@ant-design/icons";
import { Popconfirm, Button, Badge, Dropdown, Menu, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllBills } from "../../../redux/StoreUsers/usersActions";
import { setBillStatus } from "../../../redux/StoreUsers/usersActions";

const BillsTableSeller = (props) => {
  const accessToken =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const { bills } = useSelector((state) => state.users);
  const [render, setRender] = useState(true);

  const data2 = bills?.map((e) => ({
    key: e._id,
    id: e._id,
    user: `${
      e.user.firstName.charAt(0).toUpperCase() + e.user.firstName.slice(1)
    } ${e.user.lastName.charAt(0).toUpperCase() + e.user.lastName.slice(1)}`,
    email: e.user.email,
    firstName: e.user.firstName,
    lastName: e.user.lastName,
    totalPrice: e.total,
    date: e.date,
    status: e.status,
    loyaltyPoint: e.loyaltyPoint,
    discount: `${e.discount} %`,
    shippment: e.shipp,
  }));

  const expandedRowRender = (row) => {
    //console.log('row', row.id);

    const columns = [
      {
        title: "Books",
        dataIndex: "book",
        key: "book",
      },
      {
        title: "Format",
        dataIndex: "format",
        key: "format",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        sorter: (obj1, obj2) => obj1.quantity - obj2.quantity,
      },

      {
        title: "Unit Price",
        dataIndex: "unitPrice",
        key: "unitPrice",
        sorter: (obj1, obj2) => obj1.unitPrice - obj2.unitPrice,
      },
    ];

    const datito = bills.find((e) => e._id === row.id);
    //console.log("datito", datito);

    let data = [];
    for (let i = 0; i < datito.books.length; i++) {
      data.push({
        key: datito._id,
        id: datito._id,
        book: datito.books[i].name,
        unitPrice: datito.price[i],
        quantity: datito.amountBooks[i],
        format: datito.books[i].format,
      });
    }

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{ textTransform: "capitalize" }}
      />
    );
  };

  /////////Eliminar Users Duplicados//////////////
  const duplicateFilter = bills?.map((e) => ({
    text: `${
      e.user.firstName.charAt(0).toUpperCase() + e.user.firstName.slice(1)
    } ${e.user.lastName.charAt(0).toUpperCase() + e.user.lastName.slice(1)}`,
    value: `${e.user.firstName} ${e.user.lastName}`,
  }));

  const uniqueFilter = [
    ...new Map(duplicateFilter.map((item) => [item.text, item])).values(),
  ];

  /////////Eliminar Emails Duplicados//////////////
  const duplicateEmails = bills?.map((e) => ({
    text: e.user.email,
    value: e.user.email,
  }));

  const EniqueEmails = [
    ...new Map(duplicateEmails.map((item) => [item.text, item])).values(),
  ];

  const columnsUser = [
    {
      title: "Bill number",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (obj1, obj2) => obj1.date - obj2.date,
    },
    {
      title: "Loyalty Points Earned",
      dataIndex: "loyaltyPoint",
      key: "loyaltyPoint",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Shippment Cost",
      dataIndex: "shippment",
      key: "shippment",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      sorter: (obj1, obj2) => obj1.totalPrice - obj2.totalPrice,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Approved",
          value: "approved",
        },
        {
          text: "Cancelled",
          value: "cancelled",
        },
      ],
      filterSearch: true,
      onFilter: (state, userObject) => userObject.status.includes(state),
      render: (_, record) => (
        <span>
          {record.status === "approved" ? (
            <>
              <Badge status="success" /> Approved
            </>
          ) : (
            <>
              <Badge status="error" /> Cancelled
            </>
          )}
        </span>
      ),
    },
  ];

  const columnsAdmin = [
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
      onFilter: (email, userObject) => userObject.email.includes(email),
    },
    {
      title: "Bill ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      sorter: (obj1, obj2) => obj1.totalPrice - obj2.totalPrice,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Approved",
          value: "approved",
        },
        {
          text: "Cancelled",
          value: "cancelled",
        },
      ],
      filterSearch: true,
      onFilter: (state, userObject) => userObject.status.includes(state),
      render: (_, record) => (
        <span>
          {record.status === "approved" ? (
            <>
              <Badge status="success" /> Approved
            </>
          ) : (
            <>
              <Badge status="error" /> Cancelled
            </>
          )}
        </span>
      ),
    },
  ];

  const columns = props.userId ? columnsUser : columnsAdmin;

  useEffect(() => {
    if (!props.userId) {
      dispatch(getAllBills(accessToken));
    }
  }, [dispatch]);

  return (
    <>
      <Table
        columns={columns}
        expandedRowRender={expandedRowRender}
        dataSource={data2.reverse()}
        size="small"
        //style={{ textTransform: "capitalize" }}
        pagination={{
          position: ["bottomLeft"],
        }}
      />
    </>
  );
};

export default BillsTableSeller;
