import { createFileRoute } from '@tanstack/react-router';
import logo from '../assets/images/logo.svg';
import { OPEN_METEO_URL, SITE } from '@/lib/constants';
import { DropdownMenu, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import type { WeatherData } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

import Sunny from '../assets/images/icon-sunny.webp';
import { groupHourlyByDate } from '@/lib/utils';

export const Route = createFileRoute('/')({
	component: App,
});

const apiUrl = `${OPEN_METEO_URL}?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

function App() {
	const { isPending, error, data, isFetching } = useQuery<WeatherData>({
		queryKey: ['weatherData'],
		queryFn: async () => {
			const response = await fetch(apiUrl)
			return await response.json()
		},
	})

	if (isPending) {
		return <div>Loading...</div>
	}

	const groupedHourly = data ? groupHourlyByDate(data) : {};


	return (
		<div className="min-h-screen bg-background flex flex-col text-foreground text-[calc(10px+2vmin)] max-w-7xl mx-auto">
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

				<div className="flex gap-4 justify-center">
					<Input type="text" placeholder="Search for a city, e.g., New York" className="border border-gray-300 rounded-md p-2" />
					<Button>Search</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-6 grid-rows-5 gap-6 mt-8">
					<Card className='md:col-span-4 md:row-span-3 bg-blue-500 text-white border-none bg-[url(/assets/images/bg-today-large.svg)] '>
						<CardContent className='flex flex-1 justify-between items-center'>
							<div>
								<h2>Berlin, Germany</h2>
								<p>Monday, 1 Jan 2024</p>
							</div>
							<div className='flex items-center gap-2 font-grotesque'>
								<img src={Sunny} height={64} width={64} alt="Current day Weather icon" />
								<p className='text-6xl font-bold'>{'20'}{data?.current_units.temperature_2m}</p>
							</div>
						</CardContent>
					</Card>
					<Card className="md:col-span-2 md:row-span-5 col-start-5 text-white bg-neutral-800 border-none">
						<CardContent>
							<div className="flex justify-between">
								<p>Hourly forecast</p>
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
							</div>

							<div className="flex flex-col">
								{Object.entries(groupedHourly).map(([date, hours]) => {
									return (
										<div key={date} className="mb-4">
											<h3 className="font-bold mb-2">{date}</h3>
											{hours.map(({ time, temperature, temperatureUnit }) => {
												return (
													<Card className="bg-neutral-700 text-white border-none my-2">
														<CardContent className="flex justify-between px-2 text-sm">
															<div>
																<img src={Sunny} height={24} width={24} alt="Current day Weather icon" />
																<p>{time}</p>
															</div>
															<p>{temperature}{temperatureUnit}</p>
														</CardContent>
													</Card>
												)
											})}


										</div>
									)
								})}
							</div>
						</CardContent>
					</Card>
					<Card className="row-start-4 bg-neutral-800 text-white border-none">
						<CardContent>
							<p>{data?.current.temperature_2m} {data?.current_units.temperature_2m}</p>
						</CardContent>
					</Card>
					<Card className="row-start-4 bg-neutral-800 text-white border-none">
						<CardContent>
							<p>{data?.current.temperature_2m} {data?.current_units.temperature_2m}</p>
						</CardContent>
					</Card>
					<Card className="row-start-4 bg-neutral-800 text-white border-none">
						<CardContent>
							<p>{data?.current.temperature_2m} {data?.current_units.temperature_2m}</p>
						</CardContent>
					</Card>
					<Card className="row-start-4 bg-neutral-800 text-white border-none">
						<CardContent>
							<p>{data?.current.temperature_2m} {data?.current_units.temperature_2m}</p>
						</CardContent>
					</Card>
				</div>
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
