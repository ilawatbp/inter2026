import { House, Save, BrushCleaning, Printer } from "lucide-react";
import { useShop } from "../../context/ShopContext"
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

export default function CartNav({ setCartView, cartView, printRef }) {

  const navigate = useNavigate();
  const [openDiscountModal, setOpenDiscountModal] = useState();
  const discountValue = useRef();

  const { cartValue, quoteDetails, setCartValue, setQuoteDetails, defaultQuoteDetails, setQuoteNum, quoteStatus, setQuoteStatus } = useShop();
  console.log(quoteDetails)

  //POST http://localhost:3001/api/qinfo

  async function submitQuote() {
    const payload = {
      qn: quoteDetails.qn,       // header auth/client info
      qinfo: quoteDetails.qinfo, // quote info
      items: cartValue        // array of items
    };

    try {
      const res = await fetch("http://192.168.1.100:3001/api/insertQ", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Insert failed");
      }

      // ✅ success
      setQuoteNum(data.QNO);
      console.log("Inserted QNO:", data.QNO);
      console.log("Inserted items:", data.insertedItems);
      alert(`Saved! QNO: ${data.QNO}`);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }


  function clearAll() {
    setCartValue([]);
    setQuoteDetails(structuredClone(defaultQuoteDetails));

    localStorage.setItem("cartValue", JSON.stringify([]));
    localStorage.setItem("quoteDetails", JSON.stringify(defaultQuoteDetails));

    window.location.reload();
  }

  const handleOpenDiscout = () => {
    setOpenDiscountModal(true);
  };

  function handleDiscount() {
    setCartValue((prev) =>
      prev.map((item) => ({
        ...item, Discount: discountValue.current.value
      }))
    )
    setOpenDiscountModal(false)
  }

  const lastSavedQno = "last"


  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: lastSavedQno ? `Quotation-${lastSavedQno}` : "Quotation",
    pageStyle: `
      @page { size: letter; margin: 12mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    `,
  });



  return (
    <>
      <nav className="bg-[#3b4044] shadow-md text-white">
        <div className="mx-auto max-w-6xl px-4 md:px-10 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-2">
            <House
              onClick={() => {
                if (quoteStatus === "locked") {
                  navigate(`/`);
                  clearAll();
                } else {
                  navigate(`/`);
                }
              }}
              strokeWidth={1.5} className="hover:text-green-500 scale-110 " />

            {quoteStatus !== "locked" && (
              <>
                <button type="button" className="rounded-full px-4 py-2 hover:bg-green-500 transition">
                  Service Form
                </button>

                <button type="button" className="rounded-full px-4 py-2 hover:bg-green-500 transition"
                  onClick={() => setCartView(cartView === "form" ? "history" : "form")}
                >
                  {cartView == "form" ? "Quotation History" : "Quotation Form"}
                </button>
                {cartView == "form" && (
                  <button type="button" className="rounded-full px-4 py-2 hover:bg-green-500 transition"
                    onClick={handleOpenDiscout}
                  >
                    Discount All
                  </button>
                )}

              </>
            )}
          </div>

          <div className="flex items-center gap-2 ">
            {/* RIGHT */}
            {quoteStatus !== "locked" && cartView == "form" && (
              <>
                <BrushCleaning onClick={clearAll} strokeWidth={1.5} />
                <Save
                  onClick={async () => {
                    try {
                      const data = await submitQuote();
                      setQuoteStatus("locked")

                    } catch (err) {
                      alert(err.message)
                    }
                  }}
                  strokeWidth={1.5} />
              </>
            )}
             {quoteStatus === "locked" && cartView == "form" && (
              <Printer onClick={handlePrint} strokeWidth={1.5}></Printer>
            )}




          </div>
        </div>
      </nav>
      <Modal open={openDiscountModal} onClose={() => setOpenDiscountModal(false)}>
        <div className="flex flex-col">
          Discount
          <input type="number" className="w-full h-10 rounded-2xl border border-black px-4 mt-4" ref={discountValue} />
          <button className="bg-green-500 w-36 h-8 rounded-2xl ml-auto text-white mt-4" onClick={handleDiscount}>Ok</button>
        </div>
      </Modal>
    </>
  )
}







// setQuoteDetails
// {
//   "qinfo": {
//     "Attn": "",
//     "Comp": "",
//     "Desig": "",
//     "Loc": "",
//     "Proj": "",
//     "Qdate": "",
//     "del_charge": "0",
//     "designationOfUser": "",
//     "frName": "",
//     "ins_charge": "0",
//     "leadTime": "",
//     "prepby": "",
//     "validUntil": "",
//     "warranty": ""
//   },
//   "qn": {
//     "Discount": "Y",
//     "authDesig": "",
//     "authName": "",
//     "cliBusNameSign": "-",
//     "cliDesig": "",
//     "cliName": "",
//     "deptuser": "URP",
//     "iduser": "37",
//     "ilawBusNameSign": "-"
//   }
// }
