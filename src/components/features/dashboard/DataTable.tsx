import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { CircularProgress, Box, Card, CardContent, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { fetchSensorData } from "@/api/influxdb";
import dayjs from 'dayjs';

interface SensorData {
    _time: string;
    temp: number;
    hum: number;
    lux: number;
    noise_db: number;
}

export default function DataTable() {
    const [data, setData] = useState<SensorData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [filtroNumero, setFiltroNumero] = useState<string>('');
    const [filtroTipo, setFiltroTipo] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await fetchSensorData('-24h');
                setData(fetchedData);
            } catch (error) {
                console.error('Falha ao buscar dados para o DataGrid', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const columns: GridColDef[] = [
        {
            field: '_time',
            headerName: 'Hora',
            width: 150,
            valueFormatter: (params) => {
                return dayjs(params.value).format('DD/MM HH:mm:ss');
            },
        },
        { field: 'temp', headerName: 'Temperatura (°C)', width: 150 },
        { field: 'hum', headerName: 'Umidade (%)', width: 150 },
        { field: 'lux', headerName: 'Luminosidade (Lux)', width: 180 },
        { field: 'noise_db', headerName: 'Ruído (dB)', width: 150 },
    ];

    // Lógica de filtro
    const filteredData = React.useMemo(() => {
        if (!data) return [];
        return data.filter(item => {
            const tipo = filtroTipo as keyof SensorData;

            if (filtroNumero && filtroTipo) {
                return item[tipo] != null && item[tipo].toString().startsWith(filtroNumero);
            }

            if (filtroNumero) {
                return Object.values(item).some(value =>
                    value != null && value.toString().startsWith(filtroNumero)
                );
            }

            if (filtroTipo) {
                return item[tipo] !== undefined;
            }

            return true;
        });
    }, [data, filtroNumero, filtroTipo]);



    const rows = filteredData.map((item, index) => ({ ...item, id: item._time || index }));

    if (loading) {
        return (
            <Card variant="outlined" sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Card>
        );
    }


    return (
        <Card variant="outlined" sx={{ width: '100%' }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    Dados Brutos do Sensor
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                        label="Buscar por número"
                        value={filtroNumero}
                        onChange={(e) => setFiltroNumero(e.target.value)}
                    />
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Tipo de sensor</InputLabel>
                        <Select
                            value={filtroTipo}
                            label="Tipo de sensor"
                            onChange={(e) => setFiltroTipo(e.target.value)}
                        >
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value="temp">Temperatura</MenuItem>
                            <MenuItem value="hum">Umidade</MenuItem>
                            <MenuItem value="lux">Luminosidade</MenuItem>
                            <MenuItem value="noise_db">Ruído</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ height: 500, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSizeOptions={[5, 10, 20]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </CardContent>
        </Card>
    );
}