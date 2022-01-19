import React, { useEffect, Dispatch, SetStateAction } from "react";
// import { format } from 'date-fns'
import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { dayFromTimestamp } from "utils/helper";
// import useTheme from 'hooks/useTheme'
// import { formatAmount } from 'views/Info/utils/formatInfoNumbers'
// import { BarChartLoader } from 'views/Info/components/ChartLoaders'

// import { colors } from 'shared/styles/theme';

export type LineChartProps = {
  data: any[];
  height?: string;
  chartHeight?: string;
  setHoverValue: Dispatch<SetStateAction<number | undefined>>; // used for value on hover
  setHoverDate: Dispatch<SetStateAction<string | undefined>>; // used for label of value
} & React.HTMLAttributes<HTMLDivElement>;

const CustomBar = ({
  x,
  y,
  width,
  height,
  fill,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}) => {
  return (
    <g>
      <rect x={x} y={y} fill={fill} width={width} height={height} rx="2" />
    </g>
  );
};

// Calls setHoverValue and setHoverDate when part of chart is hovered
// Note: this NEEDs to be wrapped inside component and useEffect, if you plug it as is it will create big render problems (try and see console)
const HoverUpdater = ({
  payload,
  setHoverValue,
  setHoverDate,
}: {
  payload: any;
  setHoverValue: any;
  setHoverDate: any;
}) => {
  useEffect(() => {
    setHoverValue(payload.liquidity);
    setHoverDate(payload.created_at);
  }, [payload.liquidity, payload.created_at, setHoverValue, setHoverDate]);

  return null;
};

const Chart = ({
  chartData,
  setHoverValue,
  setHoverDate,
}: {
  chartData: any;
  setHoverValue: any;
  setHoverDate: any;
}) => {
  //   const { theme } = useTheme()
  //   if (!data || data.length === 0) {
  //     return <BarChartLoader />
  //   }
  // console.log("chartData",chartData);

  const getYticks = () => {
    if (chartData && Array.isArray(chartData) && chartData.length) {
      const intervalOfSixTicks = Math.max(...chartData.map((item: any) => parseFloat(item.liquidity))) / 5;
      let ticks = [];

      for (let i = 0; i <= 5; i++) {
        ticks.push((intervalOfSixTicks * i).toFixed(2));
      }
      ticks = ticks.map((tick: any) => (tick > 1 ? parseFloat(tick) : !parseFloat(tick) ? 0 : parseFloat(tick)));

      return ticks;
    } else {
      return [];
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData} //chartData
        margin={{
          top: 5,
          right: 15,
          left: 0,
          bottom: 5,
        }}
        onMouseLeave={() => {
          setHoverDate("");
          setHoverValue("");
        }}
      >
        <XAxis
          dataKey="created_at"
          axisLine={false}
          tickLine={false}
          tickFormatter={(timestamp: any) => `${dayFromTimestamp(timestamp)}`}
          minTickGap={10}
          stroke="rgba(255,255,255,0.8)"
        />
        <YAxis
          dataKey="liquidity"
          ticks={getYticks()}
          // tickCount={6}
          scale="linear"
          axisLine={false}
          tickLine={false}
          // color="red"
          // fontSize="12px"
          tickFormatter={(vol) => `$${vol}`}
          orientation="right"
          stroke="rgba(255,255,255,0.8)"
        />
        <Tooltip
          cursor={{ fill: "#ffffff1c" }}
          contentStyle={{ display: "none" }}
          formatter={(tooltipValue: any, name: any, props: any) => (
            <HoverUpdater payload={props.payload} setHoverValue={setHoverValue} setHoverDate={setHoverDate} />
          )}
        />
        <Bar
          dataKey="liquidity"
          fill={"#56CCF2"}
          shape={(props: any) => (
            <CustomBar height={props.height} width={props.width} x={props.x} y={props.y} fill={"#56CCF2"} />
          )}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
