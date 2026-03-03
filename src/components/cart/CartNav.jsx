import { useShop } from "../../context/ShopContext"
import { useNavigate } from "react-router-dom";

export default function CartNav(){

  const navigate = useNavigate();

  const {setView, submitQuote} = useShop();

  

    return(
              <nav className="bg-[#3b4044] shadow-md text-white">
        <div className="mx-auto max-w-6xl px-4 md:px-10 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* LEFT */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="border border-green-500 rounded-full px-4 py-2 hover:bg-green-500 transition"
              onClick={() => navigate(`/`)}
            >
              Home
            </button>

            <button
              type="button"
              className="border border-green-500 rounded-full px-4 py-2 hover:bg-green-500 transition"
            >
              Discount All
            </button>

            {/* Discount Toggle */}
            <div className="flex items-center border border-green-500 rounded-full px-4 py-2">
              <p className="mr-3 text-white">Discount</p>

              <label className="relative inline-flex items-center cursor-pointer">
                {/* peer must be sibling of the track */}
                <input type="checkbox" className="sr-only peer" />

                {/* Track */}
                <div className="w-10 h-5 rounded-full bg-gray-200 peer-checked:bg-green-500 transition-colors relative">
                  {/* Knob (no peer-checked here; animate using group on track via after) */}
                  <div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-green-700 peer-checked:bg-white peer-checked:translate-x-5 transition-all" />
                </div>
              </label>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-wrap justify-start md:justify-end gap-2">
            <button
              type="button"
              className="border border-green-500 rounded-full px-4 py-2 hover:bg-green-500 transition"
            >
              Service Form
            </button>

            <button
              type="button"
              className="border border-green-500 rounded-full px-4 py-2 hover:bg-green-500 transition"
            >
              Quotation History
            </button>

            <button
              type="button"
              className="border border-green-500 rounded-full px-4 py-2 hover:bg-green-500 transition"
              onClick={submitQuote}
            >
              Save
            </button>
            <button
              type="button"
              className="border border-green-500 rounded-full px-4 py-2 hover:bg-green-500 transition"
            >
              Clear All
            </button>
          </div>
        </div>
      </nav>
    )
}