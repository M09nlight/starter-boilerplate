import React, { useEffect, useState } from "react";
import { Card, Table, Select, Input, Button, Menu } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import utils from "utils";
import Loading from "components/shared-components/Loading";
import { useFetching } from "hooks/useFetching";

const List = () => {
  let history = useHistory();
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [clients, setClients] = useState("");
  const [stableClients, setStableClients] = useState("");

  const [fetchClients, isClientsLoading, clientError] = useFetching(
    async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setClients(data);
      setStableClients(data);
    }
  );

  useEffect(() => {
    fetchClients();
  }, []);

  // const dropdownMenu = (row) => (
  //   <Menu>
  //     <Menu.Item onClick={() => editCLient(row)}>
  //       <Flex alignItems="center">
  //         <EyeOutlined />
  //         <span className="ml-2">Edit client</span>
  //       </Flex>
  //     </Menu.Item>
  //     <Menu.Item onClick={() => deleteRow(row)}>
  //       <Flex alignItems="center">
  //         <DeleteOutlined />
  //         <span className="ml-2">
  //           {selectedRows.length > 0
  //             ? `Delete (${selectedRows.length})`
  //             : "Delete"}
  //         </span>
  //       </Flex>
  //     </Menu.Item>
  //   </Menu>
  // );

  const editCLient = (row) => {
    history.push(`/app/basic/clients/edit-client/${row.id}`);
  };

  // const deleteRow = (row) => {
  //   const objKey = "id";
  //   let data = stableClients;
  //   if (selectedRows.length > 1) {
  //     selectedRows.forEach((elm) => {
  //       data = utils.deleteArrayRow(data, objKey, elm.id);
  //       setClients(data);
  //       setSelectedRows([]);
  //     });
  //   } else {
  //     data = utils.deleteArrayRow(data, objKey, row.id);
  //     setClients(data);
  //   }
  // };

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Username",
      dataIndex: "username",
      sorter: (a, b) => utils.antdTableSorter(a, b, "username"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => utils.antdTableSorter(a, b, "email"),
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (address) => (
        <>
          <div>
            <b>Street:</b> {address.street}
          </div>
          <div>
            <b>Suite:</b> {address.suite}
          </div>
          <div>
            <b>City:</b> {address.city}
          </div>
          <div>
            <b>Zipcode: </b> {address.zipcode}
          </div>
        </>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Website",
      dataIndex: "website",
      sorter: (a, b) => utils.antdTableSorter(a, b, "website"),
    },
    {
      title: "Company",
      dataIndex: "company",
      render: (company) => <span>{company.name}</span>,
      sorter: (a, b) => utils.antdTableSorter(a.company, b.company, "name"),
    },
    // {
    //   title: "",
    //   dataIndex: "actions",
    //   render: (_, elm) => (
    //     <div className="text-right">
    //       <EllipsisDropdown menu={dropdownMenu(elm)} />
    //     </div>
    //   ),
    // },
  ];

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows);
      setSelectedRowKeys(key);
    },
  };

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? clients : stableClients;
    const data = utils.wildCardSearch(searchArray, value);
    setClients(data);
    setSelectedRowKeys([]);
  };

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div>
        </Flex>
      </Flex>
      <div className="table-responsive">
        {isClientsLoading ? (
          <Loading cover="content" />
        ) : (
          <Table
            columns={tableColumns}
            dataSource={clients}
            rowKey="id"
            rowSelection={{
              selectedRowKeys: selectedRowKeys,
              type: "checkbox",
              preserveSelectedRowKeys: false,
              ...rowSelection,
            }}
            onRow={(row) => ({
              onClick: () => editCLient(row),
            })}
            row
          />
        )}
      </div>
    </Card>
  );
};

export default List;
