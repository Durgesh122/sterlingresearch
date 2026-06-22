import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Rajesh Kumar",
    city: "Mumbai",
    service: "Equity Cash",
    rating: 5,
    text: "Sterling Research has been a game-changer for my trading. Their research calls are very accurate with proper entry-exit levels. I have been a member for 2 years and very satisfied.",
    profit: "+₹45,000 in 3 months"
  },
  {
    name: "Priya Sharma",
    city: "Delhi",
    service: "Nifty & BankNifty",
    rating: 5,
    text: "Excellent service! The team is very professional and always available on WhatsApp for support. The BankNifty calls have been very profitable for me.",
    profit: "+₹32,000 in 2 months"
  },
  {
    name: "Suresh Patel",
    city: "Ahmedabad",
    service: "Commodity MCX",
    rating: 5,
    text: "Best commodity research service I have tried. Gold and Silver calls are spot-on. Very transparent fee structure with no hidden charges. Highly recommended!",
    profit: "+₹28,000 in 1 month"
  },
  {
    name: "Anita Verma",
    city: "Pune",
    service: "Stock Futures",
    rating: 5,
    text: "I was new to futures trading and Sterling Research guided me step by step. Their risk management advice is excellent. Very happy with the overall service.",
    profit: "+₹55,000 in 4 months"
  },
  {
    name: "Vikram Singh",
    city: "Jaipur",
    service: "HNI Services",
    rating: 5,
    text: "Premium quality service at a very reasonable price. SEBI registered so I trust them completely. The dedicated relationship manager is very helpful.",
    profit: "+₹1,20,000 in 6 months"
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-16 bg-gradient-to-br from-[#1e5631] to-[#245338] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f0a500]/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#f0a500]/10 border border-[#f0a500]/20 rounded-full text-[#f0b429] text-xs font-bold uppercase tracking-wider mb-4"
          >
            Client Testimonials
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white mb-3"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-base"
          >
            Clients trust Sterling Research for disciplined market research support
          </motion.p>
        </div>

        {/* Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 relative"
            >
              <Quote className="w-10 h-10 text-[#f0a500]/30 mb-4" />
              
              <p className="text-white/90 text-lg leading-relaxed mb-6 italic">
                "{testimonials[current].text}"
              </p>

              {/* Profit Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e5631]/10 border border-[#cfe3d8] rounded-full text-[#1e5631] text-sm font-bold mb-6">
                <Star className="w-4 h-4 fill-current" />
                {testimonials[current].profit}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[current].name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-bold text-base">{testimonials[current].name}</div>
                    <div className="text-white/70 text-sm">{testimonials[current].city} · {testimonials[current].service}</div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#f0b429] fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-all hover:border-[#fde68a]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-[#f0b429] w-6" : "bg-white/20 w-2 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-all hover:border-[#fde68a]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
