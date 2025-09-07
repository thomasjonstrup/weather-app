import { createFileRoute } from '@tanstack/react-router';
import logo from '../assets/images/logo.svg';
import { SITE } from '@/lib/constants';
import { DropdownMenu, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {

  useEffect(() => {
    fetch(`${OPEN_METEO_URL}?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`).then(res => res.json()).then(data => {
      console.log(data);
    })
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground text-[calc(10px+2vmin)]">
      <header className="flex flex-row items-center justify-between gap-4 p-4 px-8">
        <img src={logo} className='w-40' alt="Weather App Logo" />

        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Units</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
         <DropdownMenuLabel>  Switch to Imperial/Metric</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {'Celcius (°C)'}
          </DropdownMenuItem>
          <DropdownMenuItem>
            {'Fahrenheit (°F)'}
          </DropdownMenuItem>

        </DropdownMenuGroup>
      </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className='flex-1 p-4 py-8'>
        <h1 className='text-center text-4xl'>How's the sky looking today?</h1>
  {/*         Units

  Switch to Imperial/Metric

  Temperature

  Celsius (°C)
  Fahrenheit (°F)

  Wind Speed

  km/h
  mph

  Precipitation

  Millimeters (mm)
  Inches (in)

  How's the sky looking today?

  Search for a city, e.g., New York
  Search

  Feels like
  <!-- Insert temperature here -->

  Humidity
  <!-- Insert humidity here -->

  Wind
  <!-- Insert wind here -->

  Precipitation
  <!-- Insert precipitation here -->

  Daily forecast
  <!-- Insert daily forecast for the next 7 days here -->

  Hourly forecast
  <!-- Insert hourly forecast for the selected day here --> */}
      </main>
      <footer>
        <div className="text-xs text-center p-4">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
          Coded by <a href={SITE.repository}>{SITE.author}</a>.
        </div>
      </footer>
    </div>
  )
}
