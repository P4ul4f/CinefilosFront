import React from 'react'
import ReactPlayer from 'react-player';
import './Trailer.css';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

const Trailer = () => {
    let { ytTrailerId } = useParams();

    return (
        <div className='react-player-container'>
            {ytTrailerId ? (
                <YouTube videoId={ytTrailerId} opts={{ width: '100%', height: '100%' }} />
            ) : (
                <p>No se encontró el ID del trailer</p>
            )}
        </div>
    );
}

export default Trailer;