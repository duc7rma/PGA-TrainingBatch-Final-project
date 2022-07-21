// import classNames from 'classnames';
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

// const cx = classNames.bind(styles);

function Header() {
  const [isToggle, setIsToggle] = useState(false);

  return (
    <header className="wrapper-header">
      <div className="body-header">
        <FontAwesomeIcon style={{ color: 'white' }} icon={faBars} onClick={() => setIsToggle(!isToggle)} />
        <a className="name-web" href="https://www.facebook.com/d.rmaa7/">
          Gear Focus Admin
        </a>
        <FontAwesomeIcon style={{ color: 'white' }} icon={faBell} />
        <div className="user">
          <FontAwesomeIcon style={{ color: 'white' }} icon={faUser} />
        </div>
      </div>
    </header>
  );
}

export default Header;
