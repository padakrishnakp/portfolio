

import React from 'react';
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
