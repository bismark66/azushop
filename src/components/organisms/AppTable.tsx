import React from "react";
import { Table } from "@mantine/core";

export interface AppTableColumn {
  key: string;
  label: string;
  render?: (row: Record<string, unknown>) => React.ReactNode;
  width?: number | string;
  align?: "left" | "center" | "right";
}

export interface AppTableProps {
  columns: AppTableColumn[];
  data: Record<string, unknown>[];
  minWidth?: number | string;
  headerBg?: string;
  rowBg?: string;
  style?: React.CSSProperties;
}

export default function AppTable({
  columns,
  data,
  headerBg = "#F9FBFC",
  rowBg = "#fff",
}: AppTableProps) {
  return (
    <Table highlightOnHover>
      <Table.Thead style={{ background: headerBg }}>
        <Table.Tr>
          {columns.map((col) => (
            <Table.Th
              key={col.key}
              style={{ textAlign: col.align || "left", fontWeight: 600 }}
            >
              {col.label}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.map((row, idx) => (
          <Table.Tr key={idx} style={{ background: rowBg }}>
            {columns.map((col) => (
              <Table.Td
                key={col.key}
                style={{ textAlign: col.align || "left" }}
              >
                {col.render
                  ? col.render(row)
                  : (row[col.key] as React.ReactNode)}
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
