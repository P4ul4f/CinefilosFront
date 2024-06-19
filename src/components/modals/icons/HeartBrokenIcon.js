// HeartBrokenIcon.js
import React from 'react';
import { FaHeartBroken } from 'react-icons/fa';

const HeartBrokenIcon = ({ size, color }) => {
    return <FaHeartBroken size={size} style={{ color: color || 'rgb(134, 21, 183)' }} />;
};

export default HeartBrokenIcon;
