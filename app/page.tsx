'use client';
import React, { useEffect, useState } from 'react';
import Header from './components/HomePage/Header';
import Footer from './components/HomePage/Footer';
import HeadNav from './components/HomePage/Head';
import GetAllConference from './components/Conference/getAllConference';
import { SessionProvider } from 'next-auth/react';
import PartnerSlider from './components/PartnerSlider';

    export default function Home () {

        const scrollToSection = (id: string) => {
            const element = document.getElementById(id);
            if (element) {
            window.scrollTo({
                behavior: 'smooth',
                top: element.offsetTop,
            });
            }
        };

        const [showScroll, setShowScroll] = useState(false);

        useEffect(() => {
            if (typeof window !== 'undefined') {
              window.addEventListener('scroll', checkScrollTop);
              return () => window.removeEventListener('scroll', checkScrollTop);
            }
        }, []);

        const checkScrollTop = () => {
            if (typeof window !== 'undefined' && window.pageYOffset > 400) {
              setShowScroll(true);
            } else {
              setShowScroll(false);
            }
        };

        const scrollToTop = () => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setShowScroll(false);
            }
        };

        const openVideo = () => {
            const url = 'https://www.youtube.com/watch?v=J5U5of0jBog';
            if (typeof window !== 'undefined' && url) {
              window.open(url, '_blank');
            }
        };


    return (
        <SessionProvider>
        <div>
        
        <HeadNav />

        <Header />

        <main>
            <section className="bg-blue-950 text-white text-center py-10" id="top-section">
                <div className="mt-12 mb-12">
                    <h2 className="text-4xl font-bold mb-4">Simplify Your Conference Management with OPSS</h2>
                    <p className="mb-8">Streamline submissions and enhance efficiency with the Online Paper Submission System (OPSS)</p>
                    <div className="flex justify-center">
                        <button className="bg-orange-500 text-white py-2 px-6 rounded flex items-center transform transition duration-300 hover:scale-105" onClick={() => scrollToSection('conference')}>
                        Get Started
                        <svg className="ml-2" width="32px" height="32px" viewBox="-6 -6 36.00 36.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </g>
                        </svg>
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-20 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Discover the Simplicity of Our Process</h2>
            <p className="mb-8">Explore how easy it is to manage your conference with our step-by-step guide</p>
            <div className="flex justify-center">
            <button className="bg-orange-500 text-white py-2 px-6 rounded flex items-center transform transition duration-300 hover:scale-105" onClick={openVideo}>
                Watch Video <svg width="32px" height="32px" viewBox="-6 -6 36.00 36.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13.8876 9.9348C14.9625 10.8117 15.5 11.2501 15.5 12C15.5 12.7499 14.9625 13.1883 13.8876 14.0652C13.5909 14.3073 13.2966 14.5352 13.0261 14.7251C12.7888 14.8917 12.5201 15.064 12.2419 15.2332C11.1695 15.8853 10.6333 16.2114 10.1524 15.8504C9.6715 15.4894 9.62779 14.7336 9.54038 13.2222C9.51566 12.7947 9.5 12.3757 9.5 12C9.5 11.6243 9.51566 11.2053 9.54038 10.7778C9.62779 9.26636 9.6715 8.51061 10.1524 8.1496C10.6333 7.78859 11.1695 8.11466 12.2419 8.76679C12.5201 8.93597 12.7888 9.10831 13.0261 9.27492C13.2966 9.46483 13.5909 9.69274 13.8876 9.9348Z" stroke="#ffffff" strokeWidth="1.5"></path> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg></button>
            </div>
            </section>

            <section className="bg-blue-950 text-white py-20" id="conference">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Latest Conference</h2>
                    <GetAllConference />
                    <div className="flex justify-center">
                    <a href="/dashboard/availableconference"><button className="mt-8 bg-orange-500 text-white py-2 px-6 rounded flex items-center transform transition duration-300 hover:scale-105">
                        Explore More
                        <svg className="ml-2" width="32px" height="32px" viewBox="-6 -6 36.00 36.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </g>
                        </svg>
                    </button></a>
                    </div>
                </div>
            </section>
            
            <PartnerSlider />

            <section className="py-20 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Get in Touch with Us</h2>
            <p className="mb-8">We`re here to help. Reach out for any questions or support.</p>
            <form className="max-w-xl mx-auto">
                <input type="text" placeholder="Your name" className="w-full mb-4 p-2 border rounded" />
                <input type="email" placeholder="Your email" className="w-full mb-4 p-2 border rounded" />
                <textarea placeholder="Your message" className="w-full mb-4 p-2 border rounded" rows={4}></textarea>
                <div className="flex justify-center">
                <button className="bg-orange-500 text-white py-2 px-6 rounded flex items-center transform transition duration-300 hover:scale-105">
                    Send Message <svg fill="#ffffff" width="32px" height="32px" viewBox="-64 -64 384.00 384.00" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M228.646,34.7676a11.96514,11.96514,0,0,0-12.21778-2.0752L31.87109,105.19729a11.99915,11.99915,0,0,0,2.03467,22.93457L84,138.15139v61.833a11.8137,11.8137,0,0,0,7.40771,11.08593,12.17148,12.17148,0,0,0,4.66846.94434,11.83219,11.83219,0,0,0,8.40918-3.5459l28.59619-28.59619L175.2749,217.003a11.89844,11.89844,0,0,0,7.88819,3.00195,12.112,12.112,0,0,0,3.72265-.59082,11.89762,11.89762,0,0,0,8.01319-8.73925L232.5127,46.542A11.97177,11.97177,0,0,0,228.646,34.7676ZM32.2749,116.71877a3.86572,3.86572,0,0,1,2.522-4.07617L203.97217,46.18044,87.07227,130.60769,35.47461,120.28811A3.86618,3.86618,0,0,1,32.2749,116.71877Zm66.55322,86.09375A3.99976,3.99976,0,0,1,92,199.9844V143.72048l35.064,30.85669ZM224.71484,44.7549,187.10107,208.88772a4.0003,4.0003,0,0,1-6.5415,2.10937l-86.1543-75.8164,129.66309-93.645A3.80732,3.80732,0,0,1,224.71484,44.7549Z"></path> </g></svg></button>
                </div>
            </form>
            </section>
        </main>

            <Footer />

            {showScroll && (
                <button
                className="fixed bottom-6 right-8 bg-orange-500 opacity-50 text-white py-2 px-2 rounded flex items-center"
                onClick={scrollToTop}
                >
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 5V19M12 5L6 11M12 5L18 11" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </button>
            )}
        </div>
        </SessionProvider>
        );
    }
