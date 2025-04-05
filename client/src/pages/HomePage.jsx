import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  PDF to XML Converter
                </h1>
                <p className="mt-4 text-xl text-gray-500">
                  Convert your PDF documents to structured XML format with our easy-to-use tool.
                </p>
                <div className="mt-8">
                  <div className="inline-flex rounded-md shadow">
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Get Started
                    </Link>
                  </div>
                  <div className="ml-3 inline-flex rounded-md shadow">
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-10 lg:mt-0">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="px-6 py-8 bg-indigo-700 sm:p-10 sm:pb-6">
                    <div className="flex items-center justify-center">
                      <h3 className="text-2xl leading-8 font-extrabold text-white sm:text-3xl sm:leading-9">
                        Features
                      </h3>
                    </div>
                  </div>
                  <div className="px-6 pt-6 pb-8 bg-white sm:p-10">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-700">
                          Extract text, tables, images and document structure
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-700">
                          Store conversion history
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-700">
                          Download converted XML files
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
