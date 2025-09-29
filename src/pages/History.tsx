import React, { useEffect, useState } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "mantine-react-table";
import { Box, Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import SideMenu from "@/components/layouts/SideMenu";
import { fetchSensorData } from "@/api/influxdb";
import dayjs from "dayjs";

type SensorData = {
  _time: string;
  temp: number;
  hum: number;
  lux: number;
  noise_db: number;
}

const columns: MRT_ColumnDef<SensorData>[] = [
  { accessorKey: "_time", header: "Data/Hora", size: 160 },
  { accessorKey: "temp", header: "Temperatura (°C)", size: 120 },
  { accessorKey: "hum", header: "Umidade (%)", size: 120 },
  { accessorKey: "lux", header: "Luminosidade (lx)", size: 140 },
  { accessorKey: "noise_db", header: "Ruído (dB)", size: 120 },
];

export default function History() {
  const [dados, setDados] = useState<SensorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSensorData("-60s"); // últimos 60 segundos
        if (data.length > 0) {
          const formatted = data.map((d: SensorData) => ({
            ...d,
            _time: dayjs(d._time).format("DD/MM/YYYY HH:mm"),
          }));
          setDados(formatted);
        }
      } catch (error) {
        console.error("Falha ao buscar dados dos sensores", error);
      } finally {
        console.log("finalizou!!");
      }
    };

    fetchData();
  }, []);

  const handleExportRows = (rows: MRT_Row<SensorData>[]) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) =>
      columns.map((col) => row.original[col.accessorKey as keyof SensorData])
    );
    const tableHeaders = columns.map((c) => c.header as string);


    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save("historico-medicoes.pdf");
  };

  const table = useMantineReactTable({
    columns,
    data: dados,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
          leftIcon={<IconDownload />}
          variant="filled"
        >
          Exportar Todas
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          leftIcon={<IconDownload />}
          variant="filled"
        >
          Exportar Página
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          leftIcon={<IconDownload />}
          variant="filled"
        >
          Exportar Selecionadas
        </Button>
      </Box>
    ),
  });

  return (
    <SideMenu>
      <MantineReactTable table={table} />
    </SideMenu>
  );
}
