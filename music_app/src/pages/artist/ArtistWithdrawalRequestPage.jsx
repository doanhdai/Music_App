import { assets } from "./assets/assets"

const ArtistWidthdrawalRequestPage = () => {
  return (
    <div className="h-screen">
    <div className="">
      search
    </div>
    <div className="ml-5 inline-flex gap-5">
    <div className="p-3 rounded-2xl bg-[#121212]">
        <h4 className="text-[#A4A298]">Số tiền đã rút:</h4>
        <span className="inline-flex text-lg mt-2">
              <img className="w-4" src={assets.goldCointStatistic} />
              <span className="ml-2 ">500,000,000 VND</span>
        </span>
      </div>
      <div className="p-3 rounded-2xl bg-[#121212]">
        <h4 className="text-[#A4A298]">Số tiền có thể rút:</h4>
        <span className="inline-flex text-lg mt-2">
              <img className="w-4" src={assets.goldCointStatistic} />
              <span className="ml-2 ">500,000,000 VND</span>
        </span>
      </div>

    </div>
    
  </div>
  )
}
export default ArtistWidthdrawalRequestPage

const IncomeStatisticList = () => {


  return (
    <div className="mt-5 bg-[#121212]">
      <div className=" py-2 mx-5 grid grid-cols-5 sm:grid-cols-[1fr_2fr_2fr_2fr] pl-2 text-center text-sm text-[#A4A298] ">
        <p>STT</p>
        <p>Ten bai hat</p>
        <p>Doanh thu</p>
        <p>Trang thai</p>
      </div>
      <hr className="mx-5"/>

      {/* {baihat.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-5 sm:grid-cols-[1fr_2fr_2fr_2fr] py-2 mx-5 pl-2 text-white items-center hover:bg-[#ffffff2b]"
        >
        
          <p className="text-lg text-center">{index + 1}1</p>
          <p className="text-lg text-center">Sara perche</p>
          <p className="text-lg text-center">10000</p>
          <p className="text-lg text-center">
            {item.trang_thai === 1 ? "Cong khai" : "An"}
          </p>
        
        </div>
      ))} */}
      <div
         
          className="py-2 mx-5 grid grid-cols-5 sm:grid-cols-[1fr_2fr_2fr_2fr] pl-2 text-center hover:bg-[#ffffff2b]"
        >
    
          <p className="text-lg ">1</p>
          <p className="text-lg ">Sara perche</p>
          <p className="text-lg ">10000</p>
          <p className="text-lg ">
            Công khai
          </p>
        
        </div>
    </div>
  );
};