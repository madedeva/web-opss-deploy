'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import HeadNav from '../components/HomePage/Head';
import Header from '../components/HomePage/Header';
import Footer from '../components/HomePage/Footer';

export default function AboutUs() {
  return (
    <SessionProvider>
      <div>
        <HeadNav />

        <Header />

        <main>
          <section className="bg-blue-950 text-white text-center py-20">
            <div className="container mx-auto max-w-4xl">
              <h1 className="text-4xl font-bold mb-6">About Us</h1>
              <p className="mb-12">
              Welcome to OPSS - Online Paper Submission System. Our platform is designed to simplify the process of managing academic papers and conferences. With a focus on innovation, we bring cutting-edge technology to enhance your experience. Our goal is to provide a seamless and efficient solution for all your paper submission needs. Experience the perfect blend of simplicity and functionality with OPSS.
              </p>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="mb-8">
                    To streamline and enhance the conference management experience through cutting-edge technology and unparalleled support.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="mb-8">
                    To be the leading platform for conference management, known for our user-friendly interface and exceptional service.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-100 py-12">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Meet Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded text-center">
                  <img
                    src="/images/deva.png"
                    alt="Team Member"
                    className="rounded-full mx-auto mb-3"
                    width="100"
                    height="100"
                  />
                  <h3 className="text-md font-bold mb-1">I Made Deva Kerti Wijaya</h3>
                  <p className="text-sm">Mahasiswa Bimbingan</p>
                </div>
                <div className="bg-white p-4 rounded text-center">
                  <img
                    src="/images/user.png"
                    alt="Team Member"
                    className="rounded-full mx-auto mb-3"
                    width="100"
                    height="100"
                  />
                  <h3 className="text-md font-bold mb-1">Ida Bagus Nyoman Pascima, S.Pd., M.Cs.</h3>
                  <p className="text-sm">Dosen Pembimbing I</p>
                </div>
                <div className="bg-white p-4 rounded text-center">
                  <img
                    src="/images/user.png"
                    alt="Team Member"
                    className="rounded-full mx-auto mb-3"
                    width="100"
                    height="100"
                  />
                  <h3 className="text-md font-bold mb-1">I Gede Bendesa Subawa, S.Pd., M.Kom.</h3>
                  <p className="text-sm">Dosen Pembimbing II</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </SessionProvider>
  );
}
