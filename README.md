# 🧾 Spreadsheet Web App (Google Sheets Clone)

This is a feature-rich spreadsheet web application built with **React** and **Tailwind CSS**, inspired by **Google Sheets**. It supports functionalities such as editable cells, dynamic row/column management, context menus, formula bar, and automatic row rendering based on page height.

---

## 🚀 Tech Stack

- **React** – UI framework
- **TypeScript** – Strongly typed JavaScript for improved developer experience
- **Tailwind CSS** – Utility-first CSS framework for styling
- **React Icons** – Icon library for user-friendly visuals

---

## ✨ Key Features

### 🧠 Spreadsheet Core
- Editable cells with multiline support
- Smart cell behavior (dropdown for status, colored priority text, active URL links)
- Formula bar to view content of the selected cell (like Google Sheets)

### ➕ Dynamic Table
- Add new rows with a button
- Add new columns dynamically (label and key generated)
- Delete specific rows/columns via right-click context menu
- Row numbers like Google Sheets

### 📐 UI & Styling
- Column headers with relevant icons
- Editable column titles (inline)
- Colored cell backgrounds depending on column type:
  - **Status** uses color-coded dropdowns
  - **Priority** text changes color
  - **Due Date, Assigned, Value** have special background styling
- Context menu styled to match modern spreadsheet tools
- Table auto-fills blank rows to match screen height (like infinite canvas)

---

## 🧰 Methods & Logic

### 🔁 State Management
- React `useState` used for rows, columns, and UI states like selected cells or context menu
- `useEffect` used to calculate and render blank rows on screen resize

### 📏 Auto-Render Blank Rows
```ts
const calculateBlankRows = () => {
  const rowHeight = 45;
  const tableTop = ref.current.getBoundingClientRect().top;
  const visibleHeight = window.innerHeight - tableTop - OFFSET;
  const required = Math.floor(visibleHeight / rowHeight);
  const extraRows = required - realData.length;
};
