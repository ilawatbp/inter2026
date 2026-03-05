import { useEffect, useState } from "react";
import { Search, SquarePen, Printer } from "lucide-react";


export default function CartHistory() {

    const [quotations, setQuotations] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("http://192.168.1.100:3001/api/qinfo");
                if (!response.ok) {
                    throw new Error("error in api")
                }
                const data = await response.json();
                setQuotations(data);
            } catch (err) {
                setError(err.message)
                alert(err.message)

            }
        })();
    }, []);


    return (
        <div className="">
            <div className="h-24 flex justify-between items-center px-32">
                <h1 className="text-3xl font-bold">Item Quotation History</h1>
                <div className="flex shadow rounded-2xl">
                    <input type="text" className="w-72 h-10 rounded-l-2xl px-4" />
                    <button className="w-12 h-10 bg-[#3cb54c] rounded-r-2xl flex items-center justify-center">
                        <Search className="text-white"/>
                    </button>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <table className="w-3/4">
                    <thead>
                        <tr className=" h-14 border-b-2 border-b-gray-400">
                            <th>Quotation No</th>
                            <th>Customer</th>
                            <th>Prepared By</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotations.map((q) => {
                            return (
                                <tr className=" h-16 border-b border-b-gray-400">
                                    <td>{q.QNO}</td>
                                    <td>{q.Attn}</td>
                                    <td>{q.prepby}</td>
                                    <td>{q.Qdate}</td>
                                    <td>
                                        <div className="flex flex-row justify-end gap-1">
                                            <SquarePen strokeWidth={1} className="hover:text-[#3cb54c] cursor-pointer hover:scale-125 h-4 w-4" />
                                            <Printer  strokeWidth={1} className="hover:text-[#3cb54c] cursor-pointer hover:scale-125 h-4 w-4"/>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>

    );
}


// "QNO": 1417,
// "Attn": "",
// "Desig": "",
// "Comp": "",
// "Loc": "",
// "frName": "",
// "frDesig": null,
// "prepby": "",
// "appvdby": null,
// "comforme": null,
// "Qdate": "",
// "remark": null,
// "ins_charge": "10",
// "del_charge": "10",
// "warranty": "",
// "proj": "",
// "validUntil": "",
// "leadTime": "",
// "designationOfUser": ""


// http://192.168.1.100:3001/api/qinfo