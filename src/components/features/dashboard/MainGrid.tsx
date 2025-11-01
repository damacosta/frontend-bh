import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';

import { fetchSensorData } from '@/api/influxdb';

import Footer from '@/components/layouts/Footer';
import StatCard from '@/components/features/dashboard/StatCard';
import type { StatCardProps } from '@/components/features/dashboard/StatCard';
import TelemetriaChart from '@/components/features/dashboard/TelemetriaChart';
import DataTable from '@/components/features/dashboard/DataTable';
import { useTempo } from '@/TempoContext';

interface SensorData {
  _time: string;
  temp: number;
  hum: number;
  lux: number;
  noise_db: number;
  co2: number;
}

export default function MainGrid() {
  const [latestData, setLatestData] = useState<SensorData | null>(null);
  const [dados, setDados] = useState<SensorData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { timeRange, description } = useTempo();

  type NumericFields = Exclude<keyof SensorData, '_time'>;

  const getValues = (field: NumericFields): number[] => {
    return dados ? dados.map((item) => item[field]) : [];
  };

  // Calcula tendência e variação percentual
  const getTrend = (field: NumericFields): { trend: 'up' | 'down' | 'neutral'; percent: string } => {
    if (!dados || dados.length < 2) return { trend: 'neutral', percent: '0%' };

    const last = dados[dados.length - 1][field];
    const prev = dados[dados.length - 2][field];

    if (last > prev) {
      const diff = ((last - prev) / prev) * 100;
      return { trend: 'up', percent: `+${diff.toFixed(1)}%` };
    }
    if (last < prev) {
      const diff = ((prev - last) / prev) * 100;
      return { trend: 'down', percent: `-${diff.toFixed(1)}%` };
    }
    return { trend: 'neutral', percent: '0%' };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSensorData(timeRange);
        if (data.length > 0) {
          setDados(data);
          setLatestData(data[data.length - 1]);
        }
      } catch (error) {
        console.error('Falha ao buscar dados dos sensores', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // const interval = setInterval(fetchData, 5000);
    // return () => clearInterval(interval);
  }, [timeRange]);

  if (loading || !latestData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Carregando dados...
        </Typography>
      </Box>
    );
  }

  // Dados para os cards de estatísticas
  const cardData: StatCardProps[] = [
    {
      title: 'Temperatura',
      value: `${latestData.temp?.toFixed(1) ?? 'N/A'} °C`,
      interval: description,
      ...getTrend('temp'), // adiciona trend e percent
      data: getValues('temp'),
    },
    {
      title: 'Umidade',
      value: `${latestData.hum?.toFixed(0) ?? 'N/A'} %`,
      interval: description,
      ...getTrend('hum'),
      data: getValues('hum'),
    },
    {
      title: 'Luminosidade',
      value: `${latestData.lux?.toFixed(0) ?? 'N/A'} Lux`,
      interval: description,
      ...getTrend('lux'),
      data: getValues('lux'),
    },
    {
      title: 'Ruído',
      value: `${latestData.noise_db?.toFixed(0) ?? 'N/A'} dB`,
      interval: description,
      ...getTrend('noise_db'),
      data: getValues('noise_db'),
    },
    {
      title: 'CO²',
      value: `${latestData.co2?.toFixed(0) ?? 'N/A'} ppm`,
      interval: description,
      ...getTrend('co2'),
      data: getValues('co2'),
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2, mt: 3 }}>
        Visão Geral
      </Typography>

      <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
        {cardData.map((card, index) => (
          <Grid key={index} size={{xs:12, sm:6, lg:3}} >
            {/* Passe percent para exibir no card */}
            <StatCard {...card} />
          </Grid>
        ))}

        {/* TelemetriaChart */}
        <Grid size={{xs: 12}}>
          <TelemetriaChart
            dados={cardData}
            timesSeries={dados?.map((item) => item._time) ?? []}
          />
        </Grid>
      </Grid>

      <Footer sx={{ my: 4 }} />
    </Box>
  );
}
