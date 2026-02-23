export interface Columns<D extends DataSource = DataSource> {
  key: string;
  title: string;
  dataIndex?: keyof D;
  align?: "start" | "center" | "end";
  width?: number; 
  colSpan?: number | ((record: D, rowIndex: number) => number);
  rowSpan?: number | ((record: D, rowIndex: number) => number);
  render?: (
    value: D[keyof D],
    record?: D,
    rowIndex?: number
  ) => React.ReactNode;
}
export interface DataSource extends Record<PropertyKey, unknown> {
  key: string;
}
export interface TableProps extends React.ComponentProps<"div"> {
  scroll?: boolean;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  hover?: boolean;
  header?: boolean;
  columns: Columns[];
  dataSource?: DataSource[];
  bg?: "transparent" | "striped";
  border?: "border-less" | "bordered";
  loading?: boolean;
  onRow?: (value: DataSource) => void;
}
