import React from 'react';
import {
    VictoryBar, VictoryChart, VictoryAxis,
    VictoryTheme, VictoryStack
} from 'victory';

function GraphScreen() {

    const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
    ];

    return <div style={{ width: "50%", height: "500px", marginLeft: "25rem" }}>
        <VictoryChart
            // adding the material theme provided with Victory
            theme={VictoryTheme.material}
            domainPadding={30}
        >
            <VictoryAxis
                tickValues={[1, 2, 3, 4]}
                tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
            />
            <VictoryAxis
                dependentAxis
                tickFormat={(x) => (`$${x / 1000}k`)}
            />
            <VictoryStack
                colorScale={["#ffddee"]}
            >
                <VictoryBar
                    data={data}
                    x="quarter"
                    y="earnings"
                />
            </VictoryStack>
        </VictoryChart>
    </div>;
}

export default GraphScreen;
