import React from "react";
import { X, CornerRightUp } from "lucide-react";

const faqs = [
  {
    question: "Lorem ipsum dolor sit amet?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In accumsan eros non fringilla faucibus. Sed scelerisque ultrices dui, vitae bibendum lorem bibendum ac. Duis eu nisi non orci fermentum commodo.",
  },
  { question: "Lorem ipsum dolor sit amet?" },
  { question: "Lorem ipsum dolor sit amet?" },
  { question: "Lorem ipsum dolor sit amet?" },
  { question: "Lorem ipsum dolor sit amet?" },
  { question: "Lorem ipsum dolor sit amet?" },
];

const NeedHelpModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-gradient-to-br from-[#2B2F86] to-[#273BE2] rounded-[20px] p-6 md:p-10 w-full max-w-lg text-white relative shadow-xl border border-white/20">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/80 hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold mb-2">Need help</h2>
          <p className="text-sm text-white/80">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
            accumsan eros non fringilla faucibus.
          </p>
        </div>

        {/* FAQs */}
        <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-1">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#3543F0]/20 border border-white/20 rounded-xl p-4 flex flex-col gap-2"
            >
              <div className="flex items-start gap-2">
                <CornerRightUp size={20} className="mt-1" />
                <p className="text-white">{faq.question}</p>
              </div>
              {faq.answer && (
                <p className="text-sm text-white/70 pl-6">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>

        {/* Footer buttons */}
        <div className="mt-6 flex flex-col md:flex-row justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full md:w-auto px-6 py-3 rounded-[20px] border border-white/40 text-white hover:bg-white/10 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => alert("Continue clicked")}
            className="w-full md:w-auto px-6 py-3 rounded-[20px] bg-[#3553FF] hover:bg-[#2f4bdd] transition text-white"
          >
            Understood, now continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default NeedHelpModal;
