import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function IndexIndicator({ positionChatBtn }) {
  const height = window.innerHeight;
  const width = window.innerWidth;
  // USE STATE
  const [positionAnimationFrame, setPositionAnimationFrame] = useState(null);
  const [isMobile, setIsMobile] = useState(null);
  const refAnimationFrame = useRef(null);

  //USE EFFECT

  // SET IF ITS MOBILE
  useEffect(() => {
    setIsMobile(width < 768 ? true : false);
  }, []);

  // SET THE POSITION OF THE ANIMATION FRAME
  useEffect(() => {
    setPositionAnimationFrame(
      refAnimationFrame.current.getBoundingClientRect()
    );
  }, [positionChatBtn]);

  // CONSTANTS
  const motionTransitionOptions = {
    duration: 2,
    ease: 'easeInOut',
    times: [0, 0.2, 0.5, 0.8, 1],
    repeat: Infinity,
    repeatDelay: 2,
  };

  const posIsMobileY =
    positionChatBtn.top - height + positionChatBtn.height / 2;
  const posIsNotMobileX =
    positionChatBtn.left - width + positionChatBtn.width / 2;
  const posIsNotMobileY = positionAnimationFrame
    ? positionChatBtn.top -
      positionAnimationFrame.top -
      positionChatBtn.height / 2
    : 0 - positionChatBtn.top;

  // RENDER
  return (
    <motion.div
      ref={refAnimationFrame}
      className="_bg-primary d-flex justify-content-center align-items-center"
      style={{ width: '100px', height: '100px', zIndex: -10 }}
      initial={{
        x: 0,
      }}
      animate={{
        opacity: [1, 0.9, 0, 0.9, 1],
        x: !isMobile ? [0, posIsNotMobileX, 0] : [0, 0],
        y: !isMobile ? [0, posIsNotMobileY, 0] : [0, -60, posIsMobileY, -60, 0],
        scale: [1, 2, 0.4, 2, 1],
        rotate: [0, 0, 270, 0, 0],
        borderRadius: ['20%', '30%', '50%', '30%', '20%'],
      }}
      transition={motionTransitionOptions}
      whileTap={{ opacity: 0 }}>
      <motion.span
        animate={{
          opacity: [1, 0.5, 0, 0.5, 1],
        }}
        transition={motionTransitionOptions}
        className="_text-xlarge _font-bold">
        {!isMobile ? '👈🏼' : '👆🏼'}
      </motion.span>
    </motion.div>
  );
}
