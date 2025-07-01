import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";

type Row = {
  [key: string]: string;
};

const statusOptions = ["In-process", "Need to start", "Blocked", "Complete"];

const statusColors: Record<string, string> = {
  "In-process": "bg-yellow-100 text-yellow-800",
  "Need to start": "bg-orange-100 text-orange-800",
  "Blocked": "bg-red-100 text-red-800",
  "Complete": "bg-green-100 text-green-800",
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

const initialData: Row[] = [
  {
    job: "Launch social media campaign for pro...",
    submitted: "15-11-2024",
    status: "In-process",
    submitter: "Aisha Patel",
    url: "www.aishapatel...",
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
    url: "www.irfankhanp...",
    assigned: "Tejas Pandey",
    priority: "High",
    due: "30-10-2024",
    value: "3,500,000 ₹",
  },
];

const Table: React.FC = () => {
  const [data, setData] = useState<Row[]>(initialData);
  const [columns, setColumns] = useState<string[]>(initialColumns);
  const [columnHeadersMap, setColumnHeadersMap] = useState(columnHeaders);
  const tableRef = useRef<HTMLDivElement>(null);
  const [extraRows, setExtraRows] = useState<number>(0);

  // Calculate how many blank rows are needed to fill viewport height
  useEffect(() => {
    const calculateBlankRows = () => {
      const rowHeight = 45; // approx height of one row in px
      const viewportHeight = window.innerHeight;
      const tableTop = tableRef.current?.getBoundingClientRect().top || 0;
      const visibleHeight = viewportHeight - tableTop - 40; // minus bottom margin
      const currentRows = data.length;
      const needed = Math.max(0, Math.floor(visibleHeight / rowHeight) - currentRows);
      setExtraRows(needed);
    };

    calculateBlankRows();
    window.addEventListener("resize", calculateBlankRows);
    return () => window.removeEventListener("resize", calculateBlankRows);
  }, [data]);

  const handleChange = (rowIndex: number, key: string, value: string) => {
    const updated = [...data];
    updated[rowIndex][key] = value;
    setData(updated);
  };

  const addColumn = () => {
    const newKey = `column_${columns.length}`;
    const newLabel = `Column ${columns.length - initialColumns.length + 1}`;
    setColumns([...columns, newKey]);
    setColumnHeadersMap({ ...columnHeadersMap, [newKey]: newLabel });
    setData((prev) => prev.map((row) => ({ ...row, [newKey]: "" })));
  };

  const allRows = [...data, ...Array(extraRows).fill({}).map(() => {
    const blank: Row = {};
    columns.forEach((col) => blank[col] = "");
    return blank;
  })];

  return (
    <div ref={tableRef} className="p-4 w-full overflow-x-auto">
      <table className="min-w-full border border-gray-300 table-fixed">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((colKey, i) => (
              <th key={i} className="border border-gray-300 px-3 py-2 text-left font-semibold">
                <input
                  className="w-full bg-transparent outline-none font-semibold"
                  value={columnHeadersMap[colKey]}
                  onChange={(e) =>
                    setColumnHeadersMap({ ...columnHeadersMap, [colKey]: e.target.value })
                  }
                />
              </th>
            ))}
            <th className="border border-gray-300 w-10 text-center">
              <button onClick={addColumn} className="text-blue-600 hover:text-blue-800" title="Add column">
                <FaPlus />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {allRows.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white hover:bg-gray-50">
              {columns.map((colKey, colIndex) => {
                const value = row[colKey] || "";
                const isStatus = colKey === "status";
                const isPriority = colKey === "priority";

                return (
                  <td key={colIndex} className="border border-gray-300 p-2 align-top">
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
                    ) : (
                      <textarea
                        value={value}
                        onChange={(e) => handleChange(rowIndex, colKey, e.target.value)}
                        className={`w-full resize-none outline-none bg-transparent text-sm ${
                          isPriority ? priorityColors[value] : ""
                        }`}
                        rows={1}
                        style={{ minHeight: "40px" }}
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
    </div>
  );
};

export default Table;
