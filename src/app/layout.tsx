import React from 'react';
import './globals.css'
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const DynamicLayout = dynamic(
  () => import('./dynamic_layout'),
  { ssr: false }
)

export default DynamicLayout;