interface VideoProps {
    src: string;
    controls?: boolean;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    poster?: string;
    width?: number;
    height?: number;
    className?: string;
}

const VideoPlayer: React.FC<VideoProps> = ({ src, controls = true, autoPlay = false, loop = false, muted = false, poster, width, height, className }) => {
    return <video src={src} controls={controls} autoPlay={autoPlay} loop={loop} muted={muted} poster={poster} width={width} height={height} className={className}></video>;
};

export default VideoPlayer;
