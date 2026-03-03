import { Trash2, Pencil } from "lucide-react";
import notavail from "../../assets/notavail.webp";
import { useShop } from "../../context/ShopContext";
                    // {id_no, quant, discount, price, ItemName, area, note}
export default function ItemTable({p, openDelModal, calculatePrice}){

    const {setCartValue} = useShop();
      const API_URL = import.meta.env.VITE_API_URL ?? "http://192.168.1.100:3001";

    function handleChange(uid, field, value ){
      setCartValue(prev => prev.map(x => x.uid === uid ? {...x, [field]: value } : x))
    }

    return(
         <tr className="border-b border-black align-middle" key={p.uid}>
                      {/* Picture */}
                      <td className="py-2 pr-2 align-middle">
                        <img
                          // src={notavail}
                          src={`${API_URL}/images/${p.ItemCode}.webp`}
                          onError={(e) => (e.currentTarget.src = notavail)}
                          alt="item"
                          className="w-full h-auto object-contain"
                        />
                      </td>

                      {/* Quantity */}
                      <td className="py-2 text-center align-middle">
                        <input type="number" min="1" className="text-center w-[50px] border-b p-2" defaultValue={Number(p.Quantity)}
                                onChange={(e)=> handleChange(p.uid, "Quantity", e.target.value )}
                        />
                      </td>

                      {/* Description */}
                      <td className="py-2">
                        <div className="font-semibold">{p.id_no}</div>
                        <div className="mt-2">
                          {p.ItemName}
                        </div>
                        <div className="mt-2">Area:  <input type="text" className="border-b w-full px-2" defaultValue={p.area}
                             onChange={(e)=> handleChange(p.uid, "area", e.target.value )}
                        />
                        </div>
                        {/* <div>Notes: <input type="text" className="border-b w-full" defaultValue={p.note} 
                                onChange={(e)=> handleChange(p.uid, "note", e.target.value )}
                        />
                        </div> */}
                        <div>Notes: 
                            <textarea name="" id=""className="w-full border p-2"
                             defaultValue={p.note} 
                              onChange={(e)=> handleChange(p.uid, "note", e.target.value )}
                            ></textarea>
                        </div>
                      </td>

                      {/* DISCOUNT */}
                      <td className="py-2 text-right align-middle">
                        <input type="number" min="0" max="100" className="text-center border-b w-[50px] p-2" defaultValue={Number(p.Discount)}
                        onChange={(e)=> handleChange(p.uid, "Discount", e.target.value )}
                        />
                      </td>

                      {/* SRP */}
                      <td className="py-2 text-right align-middle">
                        {p.price}
                      </td>

                      {/* Total */}
                      <td className="py-2 text-right align-middle">
                        {calculatePrice(p.Quantity, p.SRP, p.Discount).toFixed(2)}
                      </td>

                      {/* Actions */}
                      <td className="">
                        <div className="flex flex-col items-end gap-4">
                          <button
                            type="button"
                            className="text-red-200 hover:text-red-700"
                            onClick={()=> openDelModal(p.uid)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
    );
}