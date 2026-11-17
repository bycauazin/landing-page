"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./social-video.module.css";

// Vídeo do post "Sobre mim". Coloque o arquivo em /public com o nome abaixo.
const VIDEO_SRC = "/video-instagram.mp4";
const POSTER_SRC = "/foto-instagram.jpg";
const SPEEDS = [0.5, 1, 1.25, 1.5, 2];
const SEEK_STEP = 10;
const HIDE_DELAY = 2600;

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
};
const formatSpeed = (speed) => `${String(speed).replace(".", ",")}×`;

const Icon = ({ children }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

export default function SocialVideo() {
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const hideTimer = useRef(null);
  const userPaused = useRef(false);

  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [speedOpen, setSpeedOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const scheduleHide = useCallback(() => {
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (!videoRef.current?.paused) { setVisible(false); setSpeedOpen(false); }
    }, HIDE_DELAY);
  }, []);

  const showControls = useCallback(() => { setVisible(true); scheduleHide(); }, [scheduleHide]);

  // Só toca quando o post está visível na tela, e respeita quem pausou manualmente.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    // O vídeo pode carregar os metadados antes do React ligar os eventos: lê o estado atual direto.
    if (video.readyState >= 1) setDuration(video.duration);
    setCurrent(video.currentTime);
    setMuted(video.muted);
    if (!video.paused) setPlaying(true);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { if (!userPaused.current) video.play().catch(() => {}); }
      else video.pause();
    }, { threshold: 0.35 });
    observer.observe(video);
    return () => { observer.disconnect(); clearTimeout(hideTimer.current); };
  }, [failed]);

  if (failed) {
    return <Image src={POSTER_SRC} alt="Cauã criando conteúdo para redes sociais" fill sizes="(max-width: 760px) 100vw, 430px" />;
  }

  const video = () => videoRef.current;

  const togglePlay = () => {
    const v = video();
    if (!v) return;
    if (v.paused) { userPaused.current = false; v.play().catch(() => {}); }
    else { userPaused.current = true; v.pause(); }
    showControls();
  };
  const seekBy = (delta) => {
    const v = video();
    if (!v) return;
    v.currentTime = Math.min(Math.max(v.currentTime + delta, 0), v.duration || 0);
    showControls();
  };
  const seekTo = (value) => {
    const v = video();
    if (!v) return;
    v.currentTime = Number(value);
    setCurrent(Number(value));
    showControls();
  };
  const toggleMute = () => {
    const v = video();
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused && !v.muted) { userPaused.current = false; v.play().catch(() => {}); }
    showControls();
  };
  const chooseSpeed = (value) => {
    const v = video();
    if (v) v.playbackRate = value;
    setSpeed(value);
    setSpeedOpen(false);
    showControls();
  };
  const toggleFullscreen = () => {
    const wrapper = wrapperRef.current;
    const v = video();
    if (document.fullscreenElement) { document.exitFullscreen?.(); return; }
    if (wrapper?.requestFullscreen) wrapper.requestFullscreen().catch(() => {});
    else v?.webkitEnterFullscreen?.(); // iPhone
  };

  // Mouse: clicar no vídeo pausa/toca. Toque: o 1º toque só mostra os controles.
  const handleSurface = (event) => {
    if (event.pointerType === "mouse" || visible) togglePlay();
    else showControls();
  };

  const onKeyDown = (event) => {
    if (event.target.tagName === "INPUT") return;
    const keys = { " ": togglePlay, k: togglePlay, ArrowLeft: () => seekBy(-SEEK_STEP), ArrowRight: () => seekBy(SEEK_STEP), m: toggleMute, f: toggleFullscreen };
    const action = keys[event.key];
    if (action) { event.preventDefault(); action(); }
  };

  const progress = duration ? (current / duration) * 100 : 0;
  const controlsShown = visible || !playing;

  return (
    <div
      ref={wrapperRef}
      className={styles.player}
      data-controls={controlsShown ? "shown" : "hidden"}
      onPointerMove={(event) => { if (event.pointerType === "mouse") showControls(); }}
      onPointerLeave={() => { if (playing) { setVisible(false); setSpeedOpen(false); } }}
      onFocus={showControls}
      onKeyDown={onKeyDown}
    >
      <video
        ref={videoRef}
        className={styles.video}
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        muted
        loop
        playsInline
        disablePictureInPicture
        controlsList="nodownload noplaybackrate nofullscreen"
        preload="metadata"
        aria-label="Vídeo de Cauã criando conteúdo para redes sociais"
        onError={() => setFailed(true)}
        onPlay={() => { setPlaying(true); scheduleHide(); }}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
      />

      <button className={styles.surface} type="button" tabIndex={-1} aria-hidden="true" onPointerUp={handleSurface} />

      {!playing && (
        <button className={styles.bigPlay} type="button" onClick={togglePlay} aria-label="Reproduzir vídeo">
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
        </button>
      )}

      {/* Quando os controles estão escondidos, só o botão de som fica visível. */}
      <button className={styles.quickMute} type="button" onClick={toggleMute} aria-label={muted ? "Ativar som" : "Desativar som"} tabIndex={controlsShown ? -1 : 0}>
        <Icon><path d="M11 5 6 9H2v6h4l5 4V5z" />{muted ? <path d="m22 9-6 6M16 9l6 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />}</Icon>
      </button>

      <div className={styles.controls} aria-hidden={!controlsShown}>
        <input
          className={styles.progress}
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={current}
          onChange={(event) => seekTo(event.target.value)}
          style={{ "--progress": `${progress}%` }}
          aria-label="Posição do vídeo"
          aria-valuetext={`${formatTime(current)} de ${formatTime(duration)}`}
          tabIndex={controlsShown ? 0 : -1}
        />
        <div className={styles.bar}>
          <button type="button" onClick={togglePlay} aria-label={playing ? "Pausar" : "Reproduzir"} tabIndex={controlsShown ? 0 : -1}>
            {playing
              ? <Icon><path d="M9 5v14M15 5v14" /></Icon>
              : <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>}
          </button>
          <button type="button" onClick={() => seekBy(-SEEK_STEP)} aria-label="Voltar 10 segundos" tabIndex={controlsShown ? 0 : -1}>
            <Icon><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></Icon><span className={styles.stepLabel}>10</span>
          </button>
          <button type="button" onClick={() => seekBy(SEEK_STEP)} aria-label="Avançar 10 segundos" tabIndex={controlsShown ? 0 : -1}>
            <Icon><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v5h-5" /></Icon><span className={styles.stepLabel}>10</span>
          </button>
          <span className={styles.time}>{formatTime(current)} <span>/ {formatTime(duration)}</span></span>

          <div className={styles.speedWrap}>
            <button className={styles.speedButton} type="button" onClick={() => { setSpeedOpen(!speedOpen); showControls(); }} aria-haspopup="true" aria-expanded={speedOpen} aria-label={`Velocidade: ${formatSpeed(speed)}`} tabIndex={controlsShown ? 0 : -1}>
              {formatSpeed(speed)}
            </button>
            {speedOpen && (
              <ul className={styles.speedMenu} role="menu" aria-label="Velocidade de reprodução">
                {SPEEDS.map((value) => (
                  <li key={value} role="none">
                    <button type="button" role="menuitemradio" aria-checked={value === speed} className={value === speed ? styles.speedActive : ""} onClick={() => chooseSpeed(value)}>
                      {value === 1 ? "Normal" : formatSpeed(value)}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button type="button" onClick={toggleMute} aria-label={muted ? "Ativar som" : "Desativar som"} tabIndex={controlsShown ? 0 : -1}>
            <Icon><path d="M11 5 6 9H2v6h4l5 4V5z" />{muted ? <path d="m22 9-6 6M16 9l6 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />}</Icon>
          </button>
          <button type="button" onClick={toggleFullscreen} aria-label="Tela cheia" tabIndex={controlsShown ? 0 : -1}>
            <Icon><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></Icon>
          </button>
        </div>
      </div>
    </div>
  );
}
