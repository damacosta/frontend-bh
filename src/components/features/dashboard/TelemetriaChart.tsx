import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import type { StatCardProps } from '@/components/features/dashboard/StatCard';
import dayjs from 'dayjs';

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

export default function TelemetriaChart({
  dados = [],
  timesSeries = [],
}: {
  dados?: StatCardProps[];
  timesSeries?: string[];
}) {
  const theme = useTheme();

  const formattedTimes = timesSeries.map(ts => dayjs(ts).format('HH:mm:ss'));

  const colorPalette = [
    "red",
    "blue",
    "yellow",
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
    theme.palette.secondary.light,
    theme.palette.secondary.main,
    theme.palette.secondary.dark,
  ];

  const sx = dados?.reduce((acc, item) => {
    acc[`& .MuiAreaElement-series-${item.title}`] = {
      fill: `url('#${item.title}')`,
    };
    return acc;
  }, {} as Record<string, any>);

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Telemetria
        </Typography>

        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Telemetria dos últimos 60 segundos
          </Typography>
        </Stack>

        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data: formattedTimes, // usa os dados já formatados
              tickInterval: (index, i) => (i + 1) % 5 === 0, // tick a cada 5 elementos
              height: 24,
            },
          ]}
          yAxis={[{ width: 50 }]}
          series={dados?.map(item => ({
            id: item.title,
            label: item.title,
            showMark: false,
            curve: 'linear',
            stack: 'total',
            area: true,
            stackOrder: 'ascending',
            data: item.data,
          }))}
          height={250}
          margin={{ left: 0, right: 20, top: 20, bottom: 0 }}
          grid={{ horizontal: true }}
          sx={sx}
          hideLegend
        >
          {dados?.map((item, index) => (
            <AreaGradient key={index} color={colorPalette[index]} id={item.title} />
          ))}
        </LineChart>
      </CardContent>
    </Card>
  );
}
