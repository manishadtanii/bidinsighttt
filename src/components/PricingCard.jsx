// components/PricingCard.jsx
import React from "react";

function PricingCard({ title, price, features, delay, icon, planDetails, isComingSoon }) {
  console.log(planDetails, "🔥 Plan details in card");
  return (
    <div className={`bg-blue text-white min-h-[46rem] p-6 rounded-3xl shadow-lg flex flex-col border border-white border-1 relative`} data-aos="fade-up" data-aos-delay={delay}>
      
      {/* Coming Soon Overlay */}
      {isComingSoon && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-80 rounded-3xl">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-2">Coming Soon</h2>
            <p className="text-lg text-gray-200">Stay tuned for updates!</p>
          </div>
        </div>
      )}

      <div className="mb-4 w-20 h-20">
        <img src={icon} className="w-full" alt="" />
      </div>
      <h3 className="text-[30px] font-h font-semibold text-start">{title}</h3>
      <div className="flex items-center gap-3">
        <div className="text-[50px] font-bold  font-h">${price}</div>
        <div className="">
          <img src="discount.png" className="w-[100%] max-w-[130px]" alt="" />
        </div>
      </div>
      {/* <p className="text-xl text-start mb-3 font-t">Lorem ipsum dolor sit amet</p> */}
      <button className={`bg-btn border border-white text-white p-4 font-inter font-medium rounded-2xl my-3 ${isComingSoon ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isComingSoon}>
        {/* <img src="price-btn.png" alt="" /> */}
        {isComingSoon ? "Coming Soon" : "UpGrade to Plus"}
      </button>
      {/* <div className="body-t font-t font-semibold my-2 text-start">
        Lorem ipsum dolor sit amet
      </div> */}
      <ul className="text-sm text-start">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-xl">
            <span className="text-white"><i class="far fa-check"></i></span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PricingCard;