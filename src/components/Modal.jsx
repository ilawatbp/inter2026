import { useRef } from "react";
import { useShop } from "../context/ShopContext";
import { v4 as uuidv4 } from "uuid";
export default function Modal({ propshow, selectedItem }) {

  const {setCartValue} = useShop();

  function handleSubmit(item) {
    setCartValue((prev) => [
      ...prev,
      {
        uid: uuidv4(),
        ItemCode: `${item.ItemCode}`,
        Quantity: quantValue.current.value,
        Discount: discountValue.current.value,
        ItemName:`${item.ItemName}`,
        SRP: `${item.Price}`,
        Area: `${areaValue.current.value}`,
        Rem: `${noteValue.current.value}`,
      },
    ]);

    propshow();
    quantValue.current.value = 1;
    discountValue.current.value = 0;
    areaValue.current.value = '';
    noteValue.current.value = '';
  }

  const quantValue = useRef();
  const discountValue = useRef();
  const areaValue = useRef();
  const noteValue = useRef();

  return (
    <div
      className="fixed inset-0 bg-black/80 flex justify-center items-center p-4 sm:p-6"
      onClick={() => propshow(false)}
    >
      <div
        className="bg-white w-full sm:w-[90%] lg:w-[70%] 2xl:w-[60%] max-w-3xl rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4">
          <div className="flex-1 flex flex-col justify-start gap-2 sm:gap-3">
            <div className="break-words">{selectedItem.ItemCode}</div>
            <div className="break-words">{selectedItem.ItemName}</div>
            <div className="break-words">{selectedItem.Price} Php</div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="w-full sm:w-24">
              <p>QUANTITY</p>
            </div>
            <input
              type="number" min="1"
              className="h-10 w-full sm:w-1/2 rounded-2xl px-4 shadow-md bg-white border border-[#dfdfdf]"
              ref={quantValue}
              defaultValue={1}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="w-full sm:w-24">
              <p>DISCOUNT</p>
            </div>
            <input
              type="number" min="0" max="100"
              className="h-10 w-full sm:w-1/2 rounded-2xl px-4 shadow-md bg-white border border-[#dfdfdf]"
              ref={discountValue}
              defaultValue={0}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="w-full sm:w-24">
              <p>AREA</p>
            </div>
            <input
              type="text"
              className="h-10 w-full sm:w-1/2 rounded-2xl px-4 shadow-md bg-white border border-[#dfdfdf]"
              ref={areaValue}
              defaultValue=''
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="w-full sm:w-24">
              <p>NOTE</p>
            </div>
            <textarea name="" id="" rows="4" 
            className="p-2 w-full sm:w-1/2 rounded-2xl px-4 shadow-md bg-white border border-[#dfdfdf]"
            ref={noteValue}
            defaultValue=''
            ></textarea>

            <button
              className="mt-auto h-10 w-full sm:w-auto bg-[#3cb54c] rounded-2xl px-6 shadow-xl sm:ml-auto text-white"
              onClick={() => handleSubmit(selectedItem)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
