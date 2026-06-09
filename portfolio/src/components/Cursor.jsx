import React, { useEffect, useRef, useState } from 'react';

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Detect touch capability
    const checkTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    };
    
    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX - 4}px`;
        dotRef.current.style.top = `${e.clientY - 4}px`;
      }
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x - 16}px`;
        ringRef.current.style.top = `${ring.current.y - 16}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleEnter = (e) => {
      if (e.target.matches('a, button, [data-hover]')) {
        setIsHovering(true);
      }
    };
    const handleLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleEnter);
    document.addEventListener('mouseout', handleLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleEnter);
      document.removeEventListener('mouseout', handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          transform: isHovering ? 'scale(2)' : 'scale(1)',
          background: isHovering ? '#bf00ff' : '#00f5ff',
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          transform: isHovering ? 'scale(2)' : 'scale(1)',
          borderColor: isHovering ? 'rgba(191,0,255,0.5)' : 'rgba(0,245,255,0.5)',
        }}
      />
    </>
  );
};

export default Cursor;
