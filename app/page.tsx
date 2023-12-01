import { CarCard, CustomFilter, Hero, SearchBar } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { HomeProps } from "@/types";
import { fetchCars } from "@/utils";
import Image from "next/image";

export default async function Home({searchParams}: HomeProps){
  const allCars = await fetchCars({manufacturer: searchParams.manufacturer || '', model: searchParams.model ||'', year: searchParams.year || 2022, fuel: searchParams.fuel ||'', limit: searchParams.limit || 10,});

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars
  return(
  <main className="overflow-hidden">
    <Hero />
    <div className ="mt-12 padding-x padding-y max-width" id = "discover">
      <div className="home__text-container space-between">
        <h1 className="text-4xl font-extrabold'">Car Catalouge</h1>
        <p>Explore the cars you might like</p>
      </div>
      <div className="home__filters ">
        <SearchBar />
        <div className="home__filter-container">
          <CustomFilter title = "Fuel" options = {fuels}/>
          <CustomFilter title = "Year"options = {yearsOfProduction}/>
        </div>
      </div>
        {!isDataEmpty ?(
          <section>
            <div className="home__car-wrapper space-between justify-content padding-y">
                {allCars?.map((car) => <CarCard car={car}/>)}
            </div>
          </section>
        ): (
          <div className="home_error-container">
            <h2 className="text-black text-xl font-bold">
              <p>Oops, No Results</p>
            </h2>
          </div>

        )}


    </div>
  </main> 
    )
  }