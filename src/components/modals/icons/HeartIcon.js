// HeartIcon.js
import React from 'react';
import { FaHeart } from 'react-icons/fa'; // Importa el ícono de corazón normal de react-icons

const HeartIcon = ({ size, color }) => {
    return <FaHeart size={size} style={{ color: color || 'rgb(134, 21, 183)' }} />;
};

export default HeartIcon;
