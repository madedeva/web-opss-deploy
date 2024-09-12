import { useEffect, useState } from 'react';

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

const getFormattedDate = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('en-US', { month: 'long' });
    const year = dateObj.getFullYear();
    const suffix = getOrdinalSuffix(day);
    return `${month} ${day}${suffix}, ${year}`;
};

const GetAllConference = () => {
    const [conferences, setConferences] = useState([]);

    useEffect(() => {
        const fetchConferences = async () => {
            try {
                const response = await fetch('/api/allconferences');
                const data = await response.json();
                setConferences(data);
            } catch (error) {
                console.error('Failed to fetch conferences', error);
            }
        };

        fetchConferences();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-500">
            {conferences.map((conference: any) => (
                <a
                    key={conference.id}
                    href={`/conference-detail/${conference.slug}`}
                    className="bg-white p-4 rounded block hover:bg-gray-100 transition duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                    <img
                        src={conference.banner ? `/uploads/banner/${conference.banner}` : getRandomImageUrl()}
                        alt={conference.name}
                        className="rounded w-full"
                    />
                    <p className="mt-4">{conference.name}</p>
                    <hr className="mt-4 mb-4" />
                    <div className="text-sm text-left">
                        <p className="mt-2 flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar mr-2" viewBox="0 0 16 16">
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                            </svg>
                            {getFormattedDate(conference.startDate)}
                        </p>
                        <p className="mt-2 flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-arrow-up-fill mr-2" viewBox="0 0 16 16">
                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M6.354 9.854a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 8.707V12.5a.5.5 0 0 1-1 0V8.707z" />
                            </svg>
                            {getFormattedDate(conference.submission_deadlineEnd)}
                        </p>
                        <p className="mt-2 flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill mr-2" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                            </svg>
                            {conference.city}, {conference.country}
                        </p>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default GetAllConference;
