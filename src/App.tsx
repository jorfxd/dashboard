import './App.css';
import Navbar from './components/Navbar';
import Item from './interface/Item';
import LineChartWeather from './components/LineChartWeather';
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import IndicatorWeather from './components/IndicatorWeather';
// Grid version 2
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';
// Hooks
import { useEffect, useState } from 'react';

// Interfaz para indicadores
interface Indicator {
    title?: string;
    subtitle?: string;
    value?: string;
}

function App() {
    // Variables de estado y funciones de actualización
    let [indicators, setIndicators] = useState<Indicator[]>([]);
    let [items, setItems] = useState<Item[]>([]); // Estado para los items (clima)
    let [owm, setOWM] = useState(localStorage.getItem("openWeatherMap"));

    // Hook: useEffect
    useEffect(() => {
        const request = async () => {
            // Referencia a las claves del LocalStorage: openWeatherMap y expiringTime
            let savedTextXML = localStorage.getItem("openWeatherMap") || "";
            let expiringTime = localStorage.getItem("expiringTime");
            let nowTime = new Date().getTime();

            // Verificar si no existe la clave expiringTime o si la estampa de tiempo actual supera el tiempo de expiración
            if (!expiringTime || nowTime > parseInt(expiringTime)) {
                // Request
                const API_KEY = "924af3ed3b74bc061bf036864ed364e6";
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`);
                savedTextXML = await response.text();

                // Calcular el tiempo de expiración (por ejemplo, 1 hora)
                const hours = 0.01;
                const delay = hours * 3600000;
                const newExpiringTime = nowTime + delay;

                // Almacenar los datos en el localStorage
                localStorage.setItem("openWeatherMap", savedTextXML);
                localStorage.setItem("expiringTime", newExpiringTime.toString());
                localStorage.setItem("nowTime", nowTime.toString());
                localStorage.setItem("expiringDateTime", new Date(newExpiringTime).toString());
                localStorage.setItem("nowDateTime", new Date(nowTime).toString());

                // Actualizar estado
                setOWM(savedTextXML);
            }

            if (savedTextXML) {
                // XML Parser
                const parser = new DOMParser();
                const xml = parser.parseFromString(savedTextXML, "application/xml");

                // Actualización de indicadores
                const dataToIndicators: Indicator[] = [];
                const name = xml.getElementsByTagName("name")[0]?.innerHTML || "";
                dataToIndicators.push({ title: "Location", subtitle: "City", value: name });
                const location = xml.getElementsByTagName("location")[1];
                const latitude = location.getAttribute("latitude") || "";
                dataToIndicators.push({ title: "Location", subtitle: "Latitude", value: latitude });
                const longitude = location.getAttribute("longitude") || "";
                dataToIndicators.push({ title: "Location", subtitle: "Longitude", value: longitude });
                const altitude = location.getAttribute("altitude") || "";
                dataToIndicators.push({ title: "Location", subtitle: "Altitude", value: altitude });

                setIndicators(dataToIndicators);

                // Actualización de items (6 primeras entradas)
                const dataToItems: Item[] = [];
                const timeElements = xml.getElementsByTagName("time");

                // Iterar sobre los primeros 6 elementos
                for (let i = 0; i < Math.min(timeElements.length, 8); i++) {
                    const timeElement = timeElements[i];

                    // Obtener los valores 'from' y 'to'
                    const from = timeElement.getAttribute("from") || "";
                    const to = timeElement.getAttribute("to") || "";

                    // Extraer solo la parte del tiempo (hora y minutos) de los valores 'from' y 'to'
                    const timeFrom = from.split("T")[1]?.substring(0, 5) || ""; // Extrae HH:MM
                    const timeTo = to.split("T")[1]?.substring(0, 5) || ""; // Extrae HH:MM

                    // Obtener los valores de precipitación, humedad y nubes
                    const probability = timeElement.querySelector("precipitation")?.getAttribute("probability") || "";
                    const humidity = timeElement.querySelector("humidity")?.getAttribute("value") || "";
                    const clouds = timeElement.querySelector("clouds")?.getAttribute("all") || "";

                    // Almacenar la información en el arreglo temporal
                    dataToItems.push({
                        dateStart: timeFrom,
                        dateEnd: timeTo,
                        precipitation: probability,
                        humidity: `${humidity}%`, // Agregar el símbolo % a la humedad
                        clouds: `${clouds}%`,

                    });
                }

                setItems(dataToItems); // Actualizar estado con los items 
            }
        };

        request();
    }, [owm]); // Depende de owm, se vuelve a ejecutar cuando se actualice

    const renderIndicators = () => {
        return indicators.map((indicator, idx) => (
            <Grid key={idx} size={{ xs: 12, xl: 3 }}>
                <IndicatorWeather
                    title={indicator.title}
                    subtitle={indicator.subtitle}
                    value={indicator.value}
                />
            </Grid>
        ));
    };

    // JSX
    return (
        <>
            <Navbar />
            {/* Dashboard meteorológico */}
            <section id="inicio">
                <h1>Dashboard meteorológico</h1>
                <div id="inicio-content">
                    <div>

                        <p>Bienvenido, Aqui podras encontrar todas las ultimas novedades sobre el clima
                            del país. Tambien podras encontrar una historial del clima con especificaciones
                            de variables y una grafica la cual cambia con variables climaticas.
                        </p>
                    </div>
                    <img src="https://pbs.twimg.com/ext_tw_video_thumb/863499045414641664/pu/img/hBJzXujWUgZhIT49.jpg"
                        alt="foto turistica de gye" />
                </div>

            </section>

            {/* Sección de cartas */}
            <section id="detalles">
                <h1>Detalles sobre Guayaquil</h1>
                <Grid container spacing={5}>{renderIndicators()}</Grid>
            </section>

            {/* Sección de tabla */}
            <section id="historial">
                <h1>Historial del clima</h1>
                <Grid size={{ xs: 12, xl: 8 }}>
                    <TableWeather itemsIn={items} />
                </Grid>
            </section>

            {/* Variables meteorológicas y gráfica */}
            <section id="grafico">
                <h1>Grafico de variables climaticas</h1>
                <Grid container spacing={5}>
                    <Grid size={{ xs: 12, xl: 3 }}>
                        <ControlWeather />
                    </Grid>
                    <Grid size={{ xs: 12, xl: 9 }}>
                        <LineChartWeather />
                    </Grid>
                </Grid>
            </section>
        </>
    );
}

export default App;
