'use client';
import React, { useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import HeadNav from '../../components/HomePage/Head';
import Header from '../../components/HomePage/Header';
import Footer from '../../components/HomePage/Footer';
import { Conference } from '@prisma/client';
import { DocumentArrowDownIcon, PencilSquareIcon, InformationCircleIcon, CalendarIcon, ChatBubbleBottomCenterTextIcon, CreditCardIcon, PhoneIcon } from '@heroicons/react/24/solid';

const imageUrls = [
  "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVnZSUyMGNhbXB1c3xlbnwwfHwwfHx8MA%3D%3D",
];

const getRandomImageUrl = () => {
  return imageUrls[Math.floor(Math.random() * imageUrls.length)];
};

const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
  }
};

const getFormattedDate = (date: Date | string | undefined): string => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('en-US', { month: 'long' });
  const year = dateObj.getFullYear();
  const suffix = getOrdinalSuffix(day);
  return `${month} ${day}${suffix}, ${year}`;
};

const ConferenceDetail = ({params}: {params: {slug: string}}) => {

  const [loading, setLoading ] = useState(false);
  const [conference, setConference] = useState<Conference>();

    const fetchPapers = async () => {
        try {
            const response = await fetch(`/api/slug-conferences/${params.slug}`);
            if (response.ok) {
                const data = await response.json();
                setConference(data);
            } else {
                console.error('Failed to fetch papers:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching papers:', error);
        }
    };

    useEffect(() => {
    
        fetchPapers();
    }, []);

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

  return (
    <SessionProvider>
      <div>
        <HeadNav />

        <Header />

        <main>
          <section className="bg-gray-100 text-gray-700">
            <img
              src={conference?.banner ? `/uploads/banner/${conference.banner}` : getRandomImageUrl()}
              alt={conference?.name}
              className="rounded w-full max-h-64 object-cover"
            />
          </section>

          <section className="bg-cover bg-center bg-white text-center items-center py-16">
            <div className="container mx-auto max-w-4xl">
              <h1 className="text-4xl font-bold text-gray-700">{conference?.name} ({conference?.acronym})</h1>
              <p className="text-2xl mt-4 text-gray-400">{conference?.institution && conference.institution.toUpperCase()}</p>
              <p className="text-2xl mt-4 text-gray-400">{conference?.city && conference.city.toUpperCase()}, {conference?.country && conference.country.toUpperCase()}</p>
            </div>
          </section>

          <section className="py-20 bg-gray-100 text-gray-700">
            <div className="container mx-auto text-center max-w-4xl">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
                <InformationCircleIcon className="h-12 w-12 mr-2 text-gray-600" />
                Conference Description
              </h2>
              <hr className="w-1/5 mx-auto my-4" />
              {conference?.description}
            </div>
          </section>

          <section className="py-20 bg-white text-gray-700">
            <div className="container mx-auto text-center max-w-4xl">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
                <CalendarIcon className="h-12 w-12 mr-2 text-gray-600" />
                Important Dates
              </h2>
              <hr className="w-1/5 mx-auto my-4" />
              <span>Conference Date: <p className='font-bold mb-4'>{getFormattedDate(conference?.startDate)} - {getFormattedDate(conference?.endDate)}</p></span>
              <span>Full Paper Submission: <p className='font-bold'>{getFormattedDate(conference?.submission_deadlineStart)} - {getFormattedDate(conference?.submission_deadlineEnd)}</p></span>
            </div>
          </section>

          <section className="py-20 bg-gray-100 text-gray-700">
            <div className="container mx-auto text-center max-w-4xl">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
                <ChatBubbleBottomCenterTextIcon className="h-12 w-12 mr-2 text-gray-600" />
                Available Topics
              </h2>
              <hr className="w-1/5 mx-auto my-4" />
              <span>Topics: <p className='font-bold mb-4'>{conference?.topic}</p></span>
            </div>
          </section>

          <section className="py-20 bg-white text-gray-700">
            <div className="container mx-auto text-center max-w-4xl">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
                <CreditCardIcon className="h-12 w-12 mr-2" />
                Payment Information
              </h2>
              <hr className="w-1/5 mx-auto my-4" />
              <p className="max-w-2xl mx-auto">{conference?.payment_info}</p>
            </div>
          </section>

          <section className="py-20 bg-gray-100 text-gray-700">
            <div className="container mx-auto flex flex-col items-center text-center ">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
                <PhoneIcon className="h-12 w-12 mr-2" />
                Contact Information
              </h2>
              <hr className="w-1/5 mx-auto mb-4" />
              <span className="mb-4">Organizer Email Contact: <p className='font-bold'>{conference?.email}</p></span>
              <span className="mb-4">Conference Address: <p className='font-bold'>{conference?.address}</p></span>
              <p className="mb-4">
                <button 
                  onClick={() => window.location.href = "/uploads/paper_template/" + conference?.paper_template}
                  className="bg-blue-950 text-white py-2 px-4 rounded flex items-center hover:bg-ora"
                >
                  <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                  Download Paper Template
                </button>
              </p>
              
              <p>
                <button 
                  onClick={() => window.location.href = "/dashboard/create-submission/" + conference?.slug}
                  className="bg-green-600 text-white py-2 px-4 rounded flex items-center hover:bg-green-700"
                >
                  <PencilSquareIcon className="h-5 w-5 mr-2" />
                  Submit Paper
                </button>
              </p>
            </div>
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
};

export default ConferenceDetail;
