import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Registra gli elementi necessari per Chart.js
Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface TotaliPrecedenti {
  totaleIncasso: number;
  totaleElettronico: number;
  totaleEccedenza: number;
}

interface PieChartsProps {
  totaliPrecedenti?: TotaliPrecedenti; // Può essere opzionale
}

export default function PieCharts({ totaliPrecedenti }: PieChartsProps) {
  // Aggiungiamo dei valori di default per evitare errori di destrutturazione
  const {
    totaleIncasso = 0,
    totaleElettronico = 0,
    totaleEccedenza = 0,
  } = totaliPrecedenti || {};

  const pieChartData1 = {
    labels: ["Incasso", "Elettronico", "Eccedenza"],
    datasets: [
      {
        data: [totaleIncasso, totaleElettronico, totaleEccedenza],
        backgroundColor: ["#36A2EB", "#FF6384", "#999999"],
      },
    ],
  };

  const pieOptions: ChartOptions<"pie"> = {
    plugins: {
      legend: { position: "top", labels: { boxWidth: 20, padding: 15 } },
      tooltip: { enabled: true },
      datalabels: {
        color: "#fff",
        formatter: (
          value: number,
          context: { chart: any; dataIndex: number; datasetIndex: number }
        ) => {
          const total = context.chart.data.datasets[
            context.datasetIndex
          ].data.reduce((a: number, b: number) => a + b, 0);
          return total > 0 ? ((value / total) * 100).toFixed(2) + "%" : "0%";
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ position: "relative", width: "300px", height: "300px" }}>
      <Pie data={pieChartData1} options={pieOptions} />
    </div>
  );
}
