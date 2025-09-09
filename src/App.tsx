import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Box, Grid, Card, CardContent } from '@mui/material';
import { fetchSensorData } from './api/influxdb';

interface SensorData {
  _time: string;
  temp: number;
  hum: number;
  lux: number;
  noise_db: number;
}

function App() {
  const [latestData, setLatestData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSensorData('-10s'); 
        if (data.length > 0) {
          setLatestData(data[data.length - 1]);
        }
      } catch (error) {
        console.error("Falha ao buscar dados dos sensores", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading || !latestData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Carregando dados...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Dashboard da Bancada Eletrônica
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Dados em tempo real da Bancada 01
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Temperatura</Typography>
              <Typography variant="h4" color="primary">{latestData.temp?.toFixed(1) ?? 'N/A'} °C</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Umidade</Typography>
              <Typography variant="h4" color="primary">{latestData.hum?.toFixed(0) ?? 'N/A'} %</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Luminosidade</Typography>
              <Typography variant="h4" color="primary">{latestData.lux?.toFixed(0) ?? 'N/A'} Lux</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Ruído</Typography>
              <Typography variant="h4" color="primary">{latestData.noise_db?.toFixed(0) ?? 'N/A'} dB</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;