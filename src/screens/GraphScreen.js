import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryTheme
} from 'victory';


function GraphScreen({ socket }) {
    const [data, setData] = useState([])
    const [response, setResponse] = useState()

    socket.on('got follow', (response) => {
        setResponse(response)
        try {
            axios.get('/api/vacations').then(({ data }) => {
                setData(data.filter(vacation => {
                    if (vacation.followers.length > 0) {
                        return vacation
                    }
                }).map(vacation => { return { followers: vacation.followers.length, name: vacation.name } }))
            })
                .catch(err => {
                    console.log(err)
                })
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    })

    useEffect(() => {
        return function cleanUp() {
            setData([])
        }
    }, [])

    useEffect(() => {
        try {
            axios.get('/api/vacations').then(({ data }) => {
                setData(data.filter(vacation => {
                    if (vacation.followers.length > 0) {
                        return vacation
                    }
                }).map(vacation => { return { followers: vacation.followers.length, name: vacation.name } }))
            })
                .catch(err => {
                    console.log(err)
                })
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    }, [])


    // console.log(data)
    let num = 0
    const tick_values = data.map(obj => {
        return (++num)
    })
    const tick_format = data.map(obj => obj.name)
    // console.log(tick_values)
    // console.log(tick_format)

    return <div className='mx-auto' style={{ width: "100%", height: "80%" }}>
        <VictoryChart
            // adding the material theme provided with Victory
            theme={VictoryTheme.material}
            domainPadding={23}
            width={800}
            height={550}
        >
            <VictoryAxis
                tickValues={tick_values}
                tickFormat={tick_format}
            />
            <VictoryAxis
                dependentAxis
                tickFormat={(x) => (`${Math.round(x)} F`)}
            />
            <VictoryBar
                data={data}
                x="name"
                y="followers"
                style={{
                    data: { fill: "pink", width: 25 }
                }}
            />
        </VictoryChart>
    </div >;
}

export default GraphScreen;
