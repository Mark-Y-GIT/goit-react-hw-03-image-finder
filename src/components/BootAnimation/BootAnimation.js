import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Audio } from 'react-loader-spinner';
import s from './BootAnimation.module.css';

export default function BootAnimation() {
  return (
    <div className={s.BootAnimation}>
      <Audio height="100" width="100" color="#3f51b5" ariaLabel="loading" />
    </div>
  );
}
