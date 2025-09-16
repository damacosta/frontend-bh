import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StatCard, { type StatCardProps } from '@/components/features/dashboard/StatCard';
import { fetchSensorData } from '@/api/influxdb';
import { CircularProgress, Typography } from '@mui/material';
import TelemetriaChart from "@/components/features/dashboard/TelemetriaChart";

interface SensorData {
  _time: string;
  temp: number;
  hum: number;
  lux: number;
  noise_db: number;
}

export default function BasicGrid() {

  const [latestData, setLatestData] = useState<SensorData | null>(null);
  const [dados, setDados] = useState<SensorData[] | null>(null);
  const [loading, setLoading] = useState(true);


  type NumericFields = Exclude<keyof SensorData, "_time">;

  const getValues = (field: NumericFields): number[] => {
    return dados ? dados.map(item => item[field]) : [];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSensorData('-60s');
        console.log(data)
        if (data.length > 0) {
          setDados(data);
          setLatestData(data[data.length - 1]);
        }
      } catch (error) {
        console.error("Falha ao buscar dados dos sensores", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    //const interval = setInterval(fetchData, 5000);

    //return () => clearInterval(interval);
  }, []);

  if (loading || !latestData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Carregando dados...</Typography>
      </Box>
    );
  }


  const data: StatCardProps[] = [
    {
      title: 'Temperatura',
      value: (latestData.temp?.toFixed(1) ?? 'N/A') + "°C",
      interval: 'Last 1 minute',
      trend: 'up',
      data: getValues("temp"),
    },
    {
      title: 'Umidade',
      value: (latestData.hum?.toFixed(0) ?? 'N/A') + "%",
      interval: 'Last 1 minute',
      trend: 'down',
      data: getValues("hum"),
    },
    {
      title: 'Luminosidade',
      value: (latestData.lux?.toFixed(0) ?? 'N/A') + "Lux",
      interval: 'Last 1 minute',
      trend: 'neutral',
      data: getValues("lux"),
    },
    {
      title: 'Ruído',
      value: (latestData.noise_db?.toFixed(0) ?? 'N/A') + "dB",
      interval: 'Last 1 minute',
      trend: 'neutral',
      data: getValues("noise_db"),
    },
  ];

  return (
    <>

      {/* Primeiro Gráfico */}
      <Box display={'flex'}>
        {data.map((card: any, index: any) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Box>

      {/* Segundo Gráfico */}
      <TelemetriaChart dados={data} timesSeries={dados?.map(item => item._time) ?? []} />

      {/* os gráficos abaixos precisa alterar */}
      {/* 
      <PageViewsBarChart />
      <ChartUserByCountry /> 
      */}


    </>

  );
}