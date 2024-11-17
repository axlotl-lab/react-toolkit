import classNames from 'classnames';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import React from 'react';

export type SortDirection = 'asc' | 'desc' | undefined;

export type SortState<T = any> = {
  field: keyof T | string & {};
  direction: SortDirection;
};

type ColumnAccessor<T> = { accessor: keyof T, render?: never }
type ColumnRender<T> = { render: (item: T) => React.ReactNode, accessor?: never | keyof T }

export type Column<T> = {
  header?: string;
  sortable?: boolean;
  sortType?: 'string' | 'number'
  className?: string
  style?: React.CSSProperties
} & (ColumnRender<T> | ColumnAccessor<T>)

export type TableProps<T> = {
  onRowClick?: (item: T) => void;
  columns: Column<T>[];
  data: T[];
  className?: string
  sortState?: SortState<T>;
  onSort?: (newSortState: SortState<T>) => void;
  serverHandled?: boolean
  disabled?: boolean
}

function Table<T extends object>(
  { columns, data, className, serverHandled, disabled, onRowClick, onSort, ...props }: TableProps<T>) {
  const [displayData, setDisplayData] = React.useState<T[]>([]);
  const [sortState, setSortState] = React.useState(props.sortState);

  const handleSortClick = (field: string) => {
    const direction = sortState?.field === field && sortState.direction === 'asc'
      ? 'desc'
      : 'asc';

    setSortState({ field, direction });

    if (!onSort) return;
    onSort({ field, direction });
  };

  const renderSortIcon = (field: string) => {
    if (sortState?.field !== field) return <ChevronsUpDown className='sort-icon' />;

    return sortState.direction === 'asc'
      ? <ChevronUp className="sort-icon" />
      : <ChevronDown className="sort-icon" />;
  };

  const getSortedData = (): T[] => {
    if (serverHandled || !sortState || !sortState.field) return data;

    const sortType = columns.find(column => column.accessor === sortState.field)?.sortType ?? 'string';

    return data.sort((a: any, b: any) => {
      const aValue = sortType == 'number' ? Number(a[sortState.field]) : String(a[sortState.field]);
      const bValue = sortType == 'number' ? Number(b[sortState.field]) : String(b[sortState.field]);

      if (aValue === bValue) return 0;

      const comparison = aValue > bValue ? 1 : -1;
      return sortState.direction === 'asc' ? comparison : -comparison;
    });
  };

  React.useEffect(() => {
    setDisplayData(getSortedData())
  }, [sortState])

  React.useEffect(() => {
    setDisplayData(data)
  }, [data])

  return (
    <div className={classNames("axlotl-table", disabled && "disabled", className)}>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => {
              const field = 'accessor' in column ? String(column.accessor) : undefined
              const isSortable = column.sortable && field
                && ('accessor' in column || 'value' in column);

              return (<th key={index}
                className={classNames(column.className, isSortable && 'sortable')}
                style={column.style}
                onClick={() => isSortable ? handleSortClick(field) : undefined}
              >
                <span>
                  {column.header}
                  {isSortable && renderSortIcon(field)}
                </span>
              </th>)
            })}
          </tr>
        </thead>
        <tbody>
          {displayData.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? 'odd' : 'even'}
              onClick={() => !disabled && onRowClick?.(item)}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.render
                    ? column.render(item)
                    : item[column.accessor] as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Table };
