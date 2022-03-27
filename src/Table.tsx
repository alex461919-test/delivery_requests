import { Select, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useMemo } from "react";
import { IPoint, IRequest, setGroupVisible, updatePoints, useAppDispatch, usePointsList, useRequestList } from "./store";

const RequestsTable: React.FC = () => {
  const requestsList = useRequestList();
  const pointsList = usePointsList();
  const dispath = useAppDispatch();
  console.log("render Table");
  const columns: ColumnsType<IRequest> = useMemo(
    () => [
      {
        title: "Заказ",
        dataIndex: "name",
        key: "name",
        render: (text, record) => <div style={{ minWidth: 150 }}>{text}</div>,
      },
      {
        title: "Откуда",
        dataIndex: "start",
        key: "start",
        render: (start: IPoint, record) => {
          return (
            <Select
              style={{ minWidth: 200 }}
              defaultValue={start.key}
              bordered={false}
              className="ant-point-select"
              size="small"
              onChange={(value) => dispath(updatePoints({ requestKey: record.key, startKey: value, endKey: record.end.key }))}
            >
              {pointsList
                .filter((item) => record.end.key !== item.key)
                .map((item) => (
                  <Select.Option value={item.key} key={item.key}>
                    {item.name}
                  </Select.Option>
                ))}
            </Select>
          );
        },
      },
      {
        title: "Куда",
        dataIndex: "end",
        key: "end",
        render: (end: IPoint, record) => {
          return (
            <Select
              style={{ minWidth: 200 }}
              defaultValue={end.key}
              bordered={false}
              className="ant-point-select"
              size="small"
              onChange={(value) => dispath(updatePoints({ requestKey: record.key, startKey: record.start.key, endKey: value }))}
            >
              {pointsList
                .filter((item) => record.start.key !== item.key)
                .map((item) => (
                  <Select.Option value={item.key} key={item.key}>
                    {item.name}
                  </Select.Option>
                ))}
            </Select>
          );
        },
      },
    ],
    [dispath, pointsList]
  );

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IRequest[]) => {
      dispath(setGroupVisible({ keys: selectedRowKeys }));
    },
  };

  return (
    <Table
      columns={columns}
      dataSource={requestsList}
      size="small"
      pagination={false}
      rowSelection={{
        type: "checkbox",
        ...rowSelection,
      }}
    />
  );
};

export default RequestsTable;
