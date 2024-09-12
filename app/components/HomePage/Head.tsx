import { useState } from 'react';
import { useSession } from "next-auth/react";
import Head from 'next/head';

const HeadNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Head>
        <title>Online Paper Submission System</title>
        <meta name="description" content="Manage Your Conference with Online Paper Submission System (OPSS)" />
        <link rel="icon" href="/logo/favicon.png" type="image/png" />
    </Head>
  );
};

export default HeadNav;