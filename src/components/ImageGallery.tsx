import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LazyImage } from "@/components/optimization/LazyImage";
import ConsultationPopup from "@/components/ConsultationPopup";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import businessMeeting from "@/assets/business-meeting.jpg";
import commercialBuilding from "@/assets/commercial-building.jpg";
import businessHandshake from "@/assets/business-handshake.jpg";
import equipmentFinancing from "@/assets/equipment-financing.jpg";
import financialConsultation from "@/assets/financial-consultation.jpg";
import manufacturingFacility from "@/assets/manufacturing-facility.jpg";
import retailStorefront from "@/assets/retail-storefront.jpg";
import businessSigning from "@/assets/business-signing.jpg";
import smallBusinessOwnerLaptop from "@/assets/small-business-owner-laptop.jpg";
import loanApprovalCelebration from "@/assets/loan-approval-celebration.jpg";
import successfulRetailBusiness from "@/assets/successful-retail-business.jpg";
import financialAdvisorConsultation from "@/assets/financial-advisor-consultation.jpg";
import manufacturingSuccess from "@/assets/manufacturing-success.jpg";
import modernCommercialProperty from "@/assets/modern-commercial-property.jpg";
import techStartupWorkspace from "@/assets/tech-startup-workspace.jpg";

const ImageGallery = () => {
  const galleryItems = [
    {
      image: financialAdvisorConsultation,
      title: "Expert Consultation",
      description: "Our experienced loan officers work closely with you to understand your business needs and find the right financing solution."
    },
    {
      image: modernCommercialProperty,
      title: "Commercial Real Estate",
      description: "Financing solutions for office buildings, retail spaces, warehouses, and other commercial properties."
    },
    {
      image: loanApprovalCelebration,
      title: "Quick Approvals",
      description: "Streamlined application process with fast decision times to get your business the funding it needs when it needs it."
    },
    {
      image: manufacturingSuccess,
      title: "Manufacturing Success", 
      description: "Specialized financing solutions for manufacturing businesses looking to expand operations and upgrade equipment."
    },
    {
      image: successfulRetailBusiness,
      title: "Small Business Support",
      description: "Dedicated support for small and medium businesses with flexible terms and competitive rates."
    },
    {
      image: techStartupWorkspace,
      title: "Technology Innovation",
      description: "Supporting tech startups and innovative businesses with growth capital and equipment financing."
    },
    {
      image: smallBusinessOwnerLaptop,
      title: "Digital-First Experience",
      description: "Modern online application process with dedicated support throughout your financing journey."
    },
    {
      image: equipmentFinancing,
      title: "Equipment Financing",
      description: "Fund the machinery and equipment your business needs to grow and stay competitive in your industry."
    },
    {
      image: commercialBuilding,
      title: "Property Investment",
      description: "Commercial real estate loans for property acquisition, refinancing, and development projects."
    }
  ];

  // Carousel setup with autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  const toggleAutoplay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi || !isPlaying) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => clearInterval(autoplay);
  }, [emblaApi, isPlaying]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Your Success is Our Mission
          </h2>
          <p className="text-xl text-foreground max-w-2xl mx-auto">
            From initial consultation to loan closing, we're committed to providing the support and financing your business needs to thrive.
          </p>
        </div>

        {/* Elegant Carousel Section */}
        <div className="relative mb-12 bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/30 shadow-lg">
          {/* Navigation Controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
                className="h-10 w-10 rounded-full border-slate-300 hover:border-primary disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                disabled={nextBtnDisabled}
                className="h-10 w-10 rounded-full border-slate-300 hover:border-primary disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleAutoplay}
                className="h-10 w-10 rounded-full border-slate-300 hover:border-primary"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
            <div className="text-sm text-foreground/70">
              {isPlaying ? 'Auto-playing' : 'Paused'} • {galleryItems.length} success stories
            </div>
          </div>

          {/* Embla Carousel Container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {galleryItems.map((item, index) => (
                <div 
                  key={index} 
                  className="flex-none w-full md:w-1/2 lg:w-1/3 min-w-0"
                >
                  <Card className="group overflow-hidden border-2 border-slate-300 hover:border-primary shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white h-full">
                    <div className="relative h-56 overflow-hidden">
                      <LazyImage 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        priority={index < 3} // Load first 3 images immediately
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-xl font-bold mb-1 text-shadow">{item.title}</h3>
                      </div>
                      
                      {/* Elegant overlay badge */}
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                        Success Story
                      </div>
                    </div>
                    
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <p className="text-slate-600 leading-relaxed flex-grow">{item.description}</p>
                      
                      {/* Subtle accent line */}
                      <div className="w-12 h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full mt-4 group-hover:w-full transition-all duration-300"></div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: Math.ceil(galleryItems.length / 3) }).map((_, index) => (
              <button
                key={index}
                className="w-2 h-2 rounded-full bg-slate-300 hover:bg-primary transition-colors duration-200 data-[active=true]:bg-primary"
                onClick={() => emblaApi?.scrollTo(index * 3)}
              />
            ))}
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-slate-50 via-blue-50 to-slate-50 rounded-2xl p-8 max-w-4xl mx-auto border border-slate-200/50 shadow-lg">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready to Take Your Business to the Next Level?
            </h3>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Our team of financing experts is ready to help you explore your options and find the perfect loan solution for your business goals. Learn more about <Link to="/how-it-works" className="text-primary hover:underline font-medium">our streamlined application process</Link> or explore financing options recommended by the <a href="https://www.sba.gov/funding-programs/loans" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Small Business Administration</a>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300">
                <a href="https://preview--hbf-application.lovable.app/auth">
                  Start Your Application
                </a>
              </Button>
              <ConsultationPopup 
                trigger={
                  <Button size="lg" variant="outline" className="border-2 border-primary text-primary px-8 py-4 hover:bg-primary hover:text-white transition-colors duration-300">
                    Schedule Consultation
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;