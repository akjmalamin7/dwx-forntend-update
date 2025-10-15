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
    hover = false,
    header = true,
    columns,
    dataSource,
    bg = "transparent",
    loading,
    onRow,
    ...rest
  } = props;

  const tableSizes = {
    xs: "!min-w-[500px]",
    sm: "!min-w-[700px]",
    md: "!min-w-[862px]",
    lg: "!min-w-[1024px]",
    xl: "!min-w-[1246px]",
  }[size || "md"];

  const borderClasses = {
    "border-less": "border-0",
    bordered: "border border-gray-900",
  }[border];

  const bgClasses = {
    transparent: "bg-transparent",
    striped: "even:bg-gray-50 odd:bg-white", // alternate row color
  }[bg || "transparent"];

  const tableClasses = classNames("", className, {
    "overflow-x-auto touch-pan-x": scroll,
  });

  const tableHeaderClasses = classNames("align-bottom bg-gray-100");

  const handleRow = (
    event: React.MouseEvent<HTMLTableRowElement>,
    data: DataSource
  ) => {
    if (
      event.target !== event.currentTarget &&
      typeof (event.target as HTMLElement).onclick === "function"
    )
      return;
    if (typeof onRow === "function") onRow(data);
  };

  return (
    <div {...rest} ref={ref} className={tableClasses}>
      <table
        className={classNames(
          "w-full border-collapse",
          tableSizes,
          borderClasses
        )}
      >
        {/* Table header */}
        {header && (
          <thead className={tableHeaderClasses}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width ? `${column.width}px` : "auto" }}
                  className={classNames(
                    "px-3 py-2 bg-grray-100",
                    borderClasses
                  )}
                >
                  <Text
                    size="md"
                    fontWeight="semiBold"
                    color="dark"
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
              <tr
                key={data.key}
                onClick={(event) => handleRow(event, data)}
                className={classNames(bgClasses, {
                  ["hover:bg-gray-100"]: hover,
                })}
              >
                {columns.map((column) => {
                  const cellValue = column.dataIndex
                    ? data[column.dataIndex]
                    : undefined;

                  return (
                    <td
                      key={column.key}
                      style={{
                        width: column.width ? `${column.width}px` : "auto",
                      }}
                      className={classNames("px-3 py-2", borderClasses, {
                        [`text-${column.align}`]: column.align,
                      })}
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
                      {column.render ? (
                        column.render(cellValue, data, rowIndex) // ✅ এখন value, record, index তিনটাই যাবে
                      ) : column.dataIndex ? (
                        <Text
                          size="md"
                          fontWeight="regular"
                          color="dark"
                          textAlign={column.align}
                        >
                          {String(cellValue ?? "")}
                        </Text>
                      ) : null}
                    </td>
                  );
                })}
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
