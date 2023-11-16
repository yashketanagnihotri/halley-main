import { use, useState } from "react";
import Link from "next/link";

export default function Prices() {
  const [numberOfBags, setNumberOfBags] = useState(0);
  const [weight, setWeight] = useState(0);
  const [total, setTotal] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const basic = (bags: number, weight: number, nightCharge: boolean) => {
    let cost = 0;
    if (weight <= 19 || bags == 1) cost = 100;
    else if (weight <= 38 || bags <= 2) cost = 160;
    else if (weight <= 57 || bags <= 3) cost = 200;
    else if (weight <= 76 || bags <= 4) cost = 240;
    if (nightCharge) cost += 100;
    return cost;
  };
  const medium = (bags: number, weight: number, nightCharge: boolean) => {
    let cost = 0;
    const noOfBags = Math.round(weight / 19.0);
    cost += 60 * noOfBags;
    if (nightCharge) cost += 100;
    return cost;
  };
  const bulk = (bags: number, weight: number, nightCharge: boolean) => {
    let cost = 0;
    let noOfBags = Math.round(weight / 19.0);
    noOfBags = Math.max(bags, noOfBags);
    let noOfTrolley = Math.round(noOfBags / 10.0);
    cost += 50 * noOfBags;
    cost += noOfTrolley * 100;
    if (nightCharge) cost += 100 * noOfTrolley;
    return cost;
  };
  const calculatePrice = (numberOfBags: number, weight: number) => {
    let cost = 0;
    let nightCharge = false;
    const date = new Date();
    const hour = date.getHours();
    if ((hour >= 22 && hour <= 23) || (hour >= 0 && hour <= 5))
      nightCharge = true;
    if (numberOfBags <= 4 && weight <= 76) {
      cost = basic(numberOfBags, weight, nightCharge);
    } else if (numberOfBags <= 10 && weight <= 190) {
      cost = medium(numberOfBags, weight, nightCharge);
    } else {
      cost = bulk(numberOfBags, weight, nightCharge);
    }
    return Number(cost);
  };

  function submit(e: any) {
    // This will prevent page refresh
    e.preventDefault();
    setTotal(Number(calculatePrice(numberOfBags, weight)));
  }

  const FormComponent = () => {
    return (
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={submit}
      >
        <div className="mb-4 outline-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Number of bags
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="number"
            placeholder="Enter number of bags"
            value={numberOfBags}
            onChange={(e) => setNumberOfBags(parseInt(e.target.value))}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Total weight
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="number"
            placeholder="Enter weight in KGs"
            value={weight}
            onChange={(e) => setWeight(parseInt(e.target.value))}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Train Name
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="text"
            placeholder="Enter train name"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Coach Number
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="text"
            placeholder="Enter coach number"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            style={{ backgroundColor: "RGB(244, 63, 94)" }}
            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Calculate
          </button>
        </div>
      </form>
    );
  };

  const TotalComponent = ({ bags, total, weight }) => {
    let noOfBags = Math.round(weight / 19.0);
    let noOfTrolley = Math.round(noOfBags / 10.0);
    let nightCharge = false;
    const date = new Date();
    const hour = date.getHours();
    return (
      <section className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-3">
        <h2>Number of Bags - {bags}</h2>
        <h2>Cost Per Bag - {Math.round(total / bags)}</h2>
        <h2>Total Weight - {weight}</h2>
        {nightCharge && (
          <h2>
            Night Charge - {100 * noOfTrolley} ({100} x {noOfTrolley})
          </h2>
        )}
        <h2>
          Trolley Charge - {150 * noOfTrolley} ({150} x {noOfTrolley})
        </h2>

        <h2 className="font-bold mt-3">Total - {total}</h2>
        <div className="flex items-center justify-center">
          <Link href="/SignedInPassenger" className="hidden sm:block flex">
            <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5 items-center justify-center">
              Confirm
            </button>
          </Link>
        </div>
      </section>
    );
  };
  return (
    <div
      style={{ backgroundColor: "RGB(244, 63, 94)" }}
      className="flex justify-center min-h-screen  w-full"
    >
      <div className="w-full max-w-xs flex flex-col justify-center align-middle">
        <div className="font-semibold text-4xl mb-9 text-center text-white">
          {!total ? "Calculate Price" : "Total"}
        </div>
        {total ? (
          <TotalComponent bags={numberOfBags} total={total} weight={weight} />
        ) : (
          <FormComponent />
        )}
      </div>
    </div>
  );
}
