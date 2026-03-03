import SearchBar from "./SearchBar";
import { ShoppingBasket } from "lucide-react";
import logo from "../assets/logo.png";

import { useShop } from "../context/ShopContext";

import { useNavigate } from "react-router-dom";


export default function Header() {

const navigate = useNavigate();


const {view, cartValue} = useShop();

    return (
        <div className="">
            {/* MAINBODY */}
            <div className={`m-auto w-full ${view == "searching" ? "min-h-dvh" : "h-32"} `}>
                <div className={`fixed left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ease-in-out 
                                w-full flex justify-between items-center px-4 bg-[#f8f8f8] h-32             
                                ${view == "searching"
                        ? "top-1/2 -translate-y-1/2 "
                        : "top-0 "
                    }`}
                >
                    <div>
                        <img
                            src={logo}
                            alt="ILAW ATB"
                            className={`h-[30px] transition-all duration-300 ease-in-out ${view == "searching" ? "opacity-0" : "opacity-1"}`}
                            onClick={()=> navigate(`/`)}
                        />
                    </div>
                    <SearchBar />
                    <div className={`relative transition-all duration-300 ease-in-out ${view == "searching" ? "opacity-0" : "opacity-1"}`}
                            onClick={()=> navigate(`/cart`)}
                    >
                        <ShoppingBasket className="w-8 h-8" />
                        <div className="absolute top-[-4px] right-[-8px] bg-red-500/90 h-4 w-4 rounded-full overflow-hidden text-xs text-white flex justify-center items-center">{cartValue.length}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}