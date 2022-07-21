import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './DefaultLayout.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function DefaultLayout(props: Props) {
  const { children } = props;
  return (
    <div className="wrapper-default-layout">
      <Header />
      <div className="container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
