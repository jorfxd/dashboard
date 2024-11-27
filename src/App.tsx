
import './App.css'

import LineChartWeather from './components/LineChartWeather';
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';

import IndicatorWeather from './components/IndicatorWeather';
// Grid version 2
import Grid from '@mui/material/Grid2'
{/* Hooks */ }
import { useEffect, useState } from 'react';
interface Indicator {
    title?: String;
    subtitle?: String;
    value?: String;
}

function App() {
    let [indicators, setIndicators] = useState<Indicator[]>([])
    {/* Hook: useEffect */ }
    useEffect(() => {

        let request = async () => {
            {/* Request */ }
            let API_KEY = "OPENWEATHERMAP' API KEY"
            let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
            let savedTextXML = await response.text();
            {/* XML Parser */ }
            const parser = new DOMParser();
            const xml = parser.parseFromString(savedTextXML, "application/xml");
            {/* Arreglo para agregar los resultados */ }

            let dataToIndicators: Indicator[] = new Array<Indicator>();

            {/* 
                 Análisis, extracción y almacenamiento del contenido del XML 
                 en el arreglo de resultados
             */}

            let name = xml.getElementsByTagName("name")[0].innerHTML || ""
            dataToIndicators.push({ "title": "Location", "subtitle": "City", "value": name })

            let location = xml.getElementsByTagName("location")[1]

            let latitude = location.getAttribute("latitude") || ""
            dataToIndicators.push({ "title": "Location", "subtitle": "Latitude", "value": latitude })

            let longitude = location.getAttribute("longitude") || ""
            dataToIndicators.push({ "title": "Location", "subtitle": "Longitude", "value": longitude })

            let altitude = location.getAttribute("altitude") || ""
            dataToIndicators.push({ "title": "Location", "subtitle": "Altitude", "value": altitude })

            //console.log( dataToIndicators )
            {/* Modificación de la variable de estado mediante la función de actualización */ }
            setIndicators(dataToIndicators)
        }

        request();

    }, [])
    let renderIndicators = () => {

        return indicators
            .map(
                (indicator, idx) => (
                    <Grid key={idx} size={{ xs: 12, xl: 3 }}>
                        <IndicatorWeather
                            title={indicator["title"]}
                            subtitle={indicator["subtitle"]}
                            value={indicator["value"]} />
                    </Grid>
                )
            )

    }
    {/* JSX */ }
    return (
        <Grid container spacing={5}>

            {/* Indicadores */}
            {/*<Grid size={{ xs: 12, xl: 3 }}><IndicatorWeather />
                <IndicatorWeather title={'Indicator 1'} subtitle={'Unidad 1'} value={"1.23"} />
            </Grid>
            
            <Grid size={{ xs: 12, xl: 3 }}><IndicatorWeather />
                <IndicatorWeather title={'Indicator 2'} subtitle={'Unidad 2'} value={"3.12"} />
            </Grid>
            <Grid size={{ xs: 12, xl: 3 }}><IndicatorWeather />
                <IndicatorWeather title={'Indicator 3'} subtitle={'Unidad 3'} value={"2.31"} />
            </Grid>
            <Grid size={{ xs: 12, xl: 3 }}><IndicatorWeather />
                <IndicatorWeather title={'Indicator 4'} subtitle={'Unidad 4'} value={"3.21"} />
            </Grid>*/}
            {renderIndicators()}

            {/* Tabla */}
            <Grid size={{ xs: 12, xl: 8 }}>
                {/* Grid Anidado */}
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, xl: 3 }}>
                        <ControlWeather />
                    </Grid>
                    <Grid size={{ xs: 12, xl: 9 }}>
                        <TableWeather />
                    </Grid>
                </Grid>

            </Grid>



            {/* Gráfico */}
            <Grid size={{ xs: 12, xl: 4 }}>
                <LineChartWeather />

            </Grid>

        </Grid >
    )
}

export default App
