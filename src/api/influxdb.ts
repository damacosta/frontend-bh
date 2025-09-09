import { InfluxDB } from '@influxdata/influxdb-client';

const url = import.meta.env.VITE_INFLUX_URL;
const token = import.meta.env.VITE_INFLUX_TOKEN;
const org = import.meta.env.VITE_INFLUX_ORG;
const bucket = import.meta.env.VITE_INFLUX_BUCKET;

const client = new InfluxDB({ url, token });
const queryApi = client.getQueryApi(org);

export const fetchSensorData = async (range: string = '-10s') => {
  const data: any[] = [];
  const query = `
    from(bucket: "${bucket}")
    |> range(start: ${range})
    |> filter(fn: (r) => r._measurement == "bench_env")
    |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
    |> keep(columns: ["_time", "temp", "hum", "lux", "noise_db"])
  `;

  return new Promise<any[]>((resolve, reject) => {
    queryApi.queryRows(query, {
      next(row: string[], tableMeta: FluxTableMetaData) {
        const o = tableMeta.toObject(row);
        data.push(o);
      },
      error(error: Error) {
        console.error('Erro na consulta do InfluxDB', error);
        reject(error);
      },
      complete() {
        resolve(data);
      },
    });
  });
};
