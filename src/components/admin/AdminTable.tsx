import type { ReactNode } from "react";
import { getErrorMessage } from "../../utils/errors";

export interface Column<T> {
  header: string;
  render: (row: T) => ReactNode;
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  rows: T[] | undefined;
  isLoading: boolean;
  error: unknown;
  getKey: (row: T) => string | number;
  emptyMessage: string;
}

const AdminTable = <T,>({
  columns,
  rows,
  isLoading,
  error,
  getKey,
  emptyMessage,
}: AdminTableProps<T>) => {
  if (isLoading) {
    return <p className="py-10 text-center text-sm text-slate-500">Loading...</p>;
  }

  if (error) {
    return (
      <p className="m-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
        {getErrorMessage(error)}
      </p>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-slate-500">{emptyMessage}</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wide text-slate-500 uppercase">
          <tr>
            {columns.map((column) => (
              <th key={column.header} className="px-4 py-3">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={getKey(row)} className="text-slate-700">
              {columns.map((column) => (
                <td key={column.header} className="px-4 py-3">
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
