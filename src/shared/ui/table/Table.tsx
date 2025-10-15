import classNames from "classnames";
import React, { forwardRef } from "react";
import { Loader } from "../loader";
import { Text } from "../text";
import type { DataSource, TableProps } from "./table.model";

const Table = forwardRef<HTMLDivElement, TableProps>((props, ref) => {
  const {
    scroll = false,
    size,
    className,
    border = "bordered",
    align,
    hover = false,
    width,
    header = true,
    columns,
    dataSource,
    tableStyle,
    bg = "transparent",
    loading,
    onRow,
    ...rest
  } = props;

  const tableSizes = {
    xs: "w-[500px]",
    sm: "w-[700px]",
    md: "w-[960px]",
    lg: "w-[1024px]",
    xl: "w-[1120px]",
  }[size || "md"];

  const borderClasses = {
    "border-less": "border-0",
    bordered: "border border-gray-500",
  }[border];

  const bgClasses = {
    transparent: "bg-transparent",
    striped: "bg-gray-100",
  }[bg];

  const tableClasses = classNames("", className, {
    "overflow-x-auto touch-pan-x": scroll,
  });

  const tableHeaderClasses = classNames(
    "align-bottom border-b border-gray-300 bg-[#f7f7f7]"
  );

  const handleRow = (event: React.MouseEvent<HTMLTableRowElement>, data: DataSource) => {
    if (event.target !== event.currentTarget && typeof (event.target as HTMLElement).onclick === "function") return;
    if (typeof onRow === "function") onRow(data);
  };

  return (
    <div {...rest} ref={ref} className={tableClasses}>
      <table
        className={classNames(
          "w-full border-collapse",
          tableSizes,
          borderClasses,
          bgClasses,
          { "hover:bg-gray-50": hover }
        )}
        style={tableStyle}
      >
        {/* Table header */}
        {header && (
          <thead className={tableHeaderClasses}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width ? `${column.width}px` : "auto" }}
                >
                  <Text
                    size="sm"
                    fontWeight="semiBold"
                    color="tertiary"
                    textAlign={column.align}
                  >
                    {column.title}
                  </Text>
                </th>
              ))}
            </tr>
          </thead>
        )}

        {/* Table body */}
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length}>
                <Loader />
              </td>
            </tr>
          ) : (
            dataSource?.map((data, rowIndex) => (
              <tr key={data.key} onClick={(event) => handleRow(event, data)}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    style={{ width: column.width ? `${column.width}px` : "auto" }}
                    colSpan={
                      typeof column.colSpan === "function"
                        ? column.colSpan(data, rowIndex)
                        : column.colSpan
                    }
                    rowSpan={
                      typeof column.rowSpan === "function"
                        ? column.rowSpan(data, rowIndex)
                        : column.rowSpan
                    }
                  >
                    {column.render
                      ? column.render(data)
                      : column.dataIndex
                        ? (
                          <Text
                            size="sm"
                            fontWeight="regular"
                            color="tertiary"
                            textAlign={column.align}
                          >
                            {String(data[column.dataIndex] ?? "")}
                          </Text>
                        )
                        : null}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});

Table.displayName = "Table";
export default Table;