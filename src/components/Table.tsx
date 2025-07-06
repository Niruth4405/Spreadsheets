import { useEffect, useRef, useState } from "react";
import {
  FaPlus,
  FaUser,
  FaLink,
  FaClipboard,
  FaCalendarAlt,
  FaRupeeSign,
  FaExclamation,
  FaUserEdit,
} from "react-icons/fa";
import { MdOutlineTaskAlt } from "react-icons/md";

type Row = { [key: string]: string };

const statusOptions = ["In-process", "Need to start", "Blocked", "Complete"];
const statusColors: Record<string, string> = {
  "In-process": "bg-yellow-100 text-yellow-800",
  "Need to start": "bg-blue-100 text-blue-800",
  Blocked: "bg-red-100 text-red-800",
  Complete: "bg-green-100 text-green-800",
};

const priorityColors: Record<string, string> = {
  High: "text-red-600",
  Medium: "text-yellow-600",
  Low: "text-blue-600",
};

const initialColumns = [
  "job",
  "submitted",
  "status",
  "submitter",
  "url",
  "assigned",
  "priority",
  "due",
  "value",
];

const columnHeaders: Record<string, string> = {
  job: "Job Request",
  submitted: "Submitted",
  status: "Status",
  submitter: "Submitter",
  url: "URL",
  assigned: "Assigned",
  priority: "Priority",
  due: "Due Date",
  value: "Est. Value",
};

const icons: Record<string, React.ReactNode> = {
  job: <MdOutlineTaskAlt />,
  submitted: <FaCalendarAlt />,
  status: <FaClipboard />,
  submitter: <FaUser />,
  url: <FaLink />,
  assigned: <FaUserEdit />,
  priority: <FaExclamation />,
  due: <FaCalendarAlt />,
  value: <FaRupeeSign />,
};

const initialData: Row[] = [
  {
    job: "Launch social media campaign for pro...",
    submitted: "15-11-2024",
    status: "In-process",
    submitter: "Aisha Patel",
    url: "www.aishapatel.com",
    assigned: "Sophie Choudhury",
    priority: "Medium",
    due: "20-11-2024",
    value: "6,200,000 ₹",
  },
  {
    job: "Update press kit for company redesign",
    submitted: "28-10-2024",
    status: "Need to start",
    submitter: "Irfan Khan",
    url: "www.irfankhanpr.com",
    assigned: "Tejas Pandey",
    priority: "High",
    due: "30-10-2024",
    value: "3,500,000 ₹",
  },
];

const Table: React.FC = () => {
  const [data, setData] = useState<Row[]>(initialData);
  const [columns, setColumns] = useState(initialColumns);
  const [columnHeadersMap, setColumnHeadersMap] = useState(columnHeaders);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: string } | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; type: "row" | "col"; index: number } | null>(null);
  const [extraRows, setExtraRows] = useState<Row[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);

  const calculateBlankRows = () => {
    const rowHeight = 45;
    const tableTop = tableRef.current?.getBoundingClientRect().top || 0;
    const viewportHeight = window.innerHeight;
    const visibleHeight = viewportHeight - tableTop - 160;
    const requiredRows = Math.floor(visibleHeight / rowHeight);
    const blankRows = Math.max(0, requiredRows - data.length);
    const blanks: Row[] = Array(blankRows)
      .fill({})
      .map(() => {
        const emptyRow: Row = {};
        columns.forEach((col) => (emptyRow[col] = ""));
        return emptyRow;
      });
    setExtraRows(blanks);
  };

  useEffect(() => {
    calculateBlankRows();
    window.addEventListener("resize", calculateBlankRows);
    return () => window.removeEventListener("resize", calculateBlankRows);
  }, [data]);

  useEffect(() => {
    const closeContext = () => setContextMenu(null);
    window.addEventListener("click", closeContext);
    return () => window.removeEventListener("click", closeContext);
  }, []);

  const handleChange = (rowIndex: number, key: string, value: string) => {
    if (rowIndex >= data.length) {
      const newRow = { ...extraRows[rowIndex - data.length], [key]: value };
      const newData = [...data, ...extraRows];
      newData[rowIndex] = newRow;
      setData(newData.slice(0, rowIndex + 1));
      return;
    }
    const updated = [...data];
    updated[rowIndex][key] = value;
    setData(updated);
  };

  const addRow = () => {
    const newRow: Row = {};
    columns.forEach((col) => (newRow[col] = ""));
    setData([...data, newRow]);
  };

  const addColumn = () => {
    const newKey = `column_${columns.length}`;
    const newLabel = `Column ${columns.length - initialColumns.length + 1}`;
    setColumns([...columns, newKey]);
    setColumnHeadersMap({ ...columnHeadersMap, [newKey]: newLabel });
    setData(data.map((row) => ({ ...row, [newKey]: "" })));
  };

  const deleteRow = (index: number) => {
    const updated = [...data];
    updated.splice(index, 1);
    setData(updated);
  };

  const deleteColumn = (index: number) => {
    const colKey = columns[index];
    const updatedCols = [...columns];
    updatedCols.splice(index, 1);
    const updatedData = data.map((row) => {
      const newRow = { ...row };
      delete newRow[colKey];
      return newRow;
    });
    const newHeaders = { ...columnHeadersMap };
    delete newHeaders[colKey];
    setColumns(updatedCols);
    setData(updatedData);
    setColumnHeadersMap(newHeaders);
  };

  const allRows = [...data, ...extraRows];

  return (
    <div className="p-4 w-full overflow-x-auto relative" ref={tableRef}>
      {/* Formula Bar */}
      <div className="flex items-center bg-gray-200 px-4 py-2 w-max min-w-full">
        <div className="text-sm font-medium text-gray-700 mr-4 w-[60px]">
          {selectedCell
            ? `${String.fromCharCode(65 + columns.indexOf(selectedCell.col))}${selectedCell.row + 1}`
            : "—"}
        </div>
        <input
          type="text"
          value={selectedCell ? allRows[selectedCell.row]?.[selectedCell.col] ?? "" : ""}
          readOnly
          className="w-full bg-white px-3 py-1 rounded border text-sm shadow-inner"
        />
      </div>

      <table className="min-w-full border border-gray-300 table-fixed">
        <thead>
          <tr>
            <th className="w-[40px] bg-white" />
            {columns.map((colKey, i) => (
              <th
                key={i}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setContextMenu({ x: e.clientX, y: e.clientY, type: "col", index: i });
                }}
                className="border border-gray-300 px-3 py-2 text-left font-semibold bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  {icons[colKey]}
                  <input
                    className="w-full bg-transparent outline-none font-semibold"
                    value={columnHeadersMap[colKey]}
                    onChange={(e) =>
                      setColumnHeadersMap({ ...columnHeadersMap, [colKey]: e.target.value })
                    }
                  />
                </div>
              </th>
            ))}
            <th className="border border-gray-300 w-10 text-center bg-white">
              <button onClick={addColumn} className="text-blue-600 hover:text-blue-800" title="Add column">
                <FaPlus />
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {allRows.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white hover:bg-gray-50">
              <td className="border border-gray-300 text-center text-sm font-medium bg-gray-50">
                {rowIndex < data.length ? rowIndex + 1 : ""}
              </td>
              {columns.map((colKey, colIndex) => {
                const value = row[colKey] || "";
                const isStatus = colKey === "status";
                const isPriority = colKey === "priority";
                const isURL = colKey === "url";

                return (
                  <td
                    key={colIndex}
                    onClick={() => setSelectedCell({ row: rowIndex, col: colKey })}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      if (rowIndex < data.length) {
                        setContextMenu({ x: e.clientX, y: e.clientY, type: "row", index: rowIndex });
                      }
                    }}
                    className="border border-gray-300 p-2 align-top"
                  >
                    {isStatus ? (
                      <select
                        value={value}
                        onChange={(e) => handleChange(rowIndex, colKey, e.target.value)}
                        className={`w-full rounded px-2 py-1 text-sm ${statusColors[value]}`}
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : isURL ? (
                      <a
                        href={value.startsWith("http") ? value : `https://${value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-sm"
                      >
                        {value}
                      </a>
                    ) : (
                      <textarea
                        value={value}
                        onChange={(e) => handleChange(rowIndex, colKey, e.target.value)}
                        className={`w-full resize-none outline-none bg-transparent text-sm ${
                          isPriority ? priorityColors[value] : ""
                        }`}
                        rows={1}
                      />
                    )}
                  </td>
                );
              })}
              <td className="border border-gray-300 p-2" />
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Row Button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={addRow}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Row
        </button>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="absolute bg-white border border-gray-300 rounded shadow-md z-50"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          {contextMenu.type === "row" && (
            <button
              onClick={() => {
                deleteRow(contextMenu.index);
                setContextMenu(null);
              }}
              className="block px-4 py-2 w-full text-left hover:bg-red-100"
            >
              Delete Row
            </button>
          )}
          {contextMenu.type === "col" && (
            <button
              onClick={() => {
                deleteColumn(contextMenu.index);
                setContextMenu(null);
              }}
              className="block px-4 py-2 w-full text-left hover:bg-red-100"
            >
              Delete Column
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Table;
