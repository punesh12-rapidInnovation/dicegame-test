
import axios from "axios";
import BarChart from "modules/app/components/barChart/BarChart";
import { useEffect, useState } from "react";
import { dateFromTimestamp } from "utils/helper";
import { BarChartCont, ChartCont, HousePoolChartHead, HousePoolChartLabel, LastRollHeader } from "./style";


const GraphPool = () => {

    const [liquidityChartData, setLiquidityChartData] = useState<any>([]);
    const [hoverLiquidityChartValue, setHoverLiquidityChartValue] = useState<any>("");
    const [hoverLiquidityChartDate, setHoverLiquidityChartDate] = useState<any>("");

    useEffect(() => {
        const axiosInstance = axios.create({
            baseURL: "https://diceroll.rapidinnovation.tech/pool",
        });
        const getData = async () => {
            const res = await axiosInstance.get("/allLiquidity");
            setLiquidityChartData(res.data);
        }; //
        getData();
    }, []);

    return (
        <ChartCont>
            <LastRollHeader>
                <HousePoolChartHead>
                    House Pool Size 24 H
                </HousePoolChartHead>
                {!hoverLiquidityChartValue && !hoverLiquidityChartDate && liquidityChartData.length ? (
                    <HousePoolChartLabel>
                        ${parseFloat(liquidityChartData[liquidityChartData.length - 1].liquidity).toFixed(5)}
                        <span>
                            {dateFromTimestamp(liquidityChartData[liquidityChartData.length - 1].created_at)}
                        </span>
                    </HousePoolChartLabel>
                )
                    :
                    !liquidityChartData.length ? null : hoverLiquidityChartDate ?
                        <HousePoolChartLabel>
                            ${parseFloat(hoverLiquidityChartValue).toFixed(5)}
                            <span>
                                {dateFromTimestamp(hoverLiquidityChartDate)}
                            </span>
                        </HousePoolChartLabel> :
                        null
                }

            </LastRollHeader>
            <BarChartCont>
                <BarChart
                    chartData={liquidityChartData}
                    setHoverValue={setHoverLiquidityChartValue}
                    setHoverDate={setHoverLiquidityChartDate}
                />
            </BarChartCont>
        </ChartCont>
    );
};

export default GraphPool;