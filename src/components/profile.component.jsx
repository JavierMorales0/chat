import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// IMPORT CSS FILE
import '../assets/styles/profile.component.css';

export default function ProfileComponent() {
  // USE STATE TO GET IF ITS OPEN
  const [isOpen, setIsOpen] = useState(false);

  // CONST FROM localStorage
  const avatar = localStorage.getItem('mome:imageUrl');
  const username = localStorage.getItem('mome:username');
  const email = localStorage.getItem('mome:email');

  //RENDER
  return (
    <motion.div
      layout
      data-isopen={isOpen}
      initial={{ borderRadius: 50 }}
      transition={{
        duration: 0.5,
      }}
      className="parent"
      onClick={() => setIsOpen(!isOpen)}>
      <motion.div
        layout
        className="child"
        transition={{
          ease: 'easeInOut',
        }}>
        <motion.img
          layout
          src={avatar}
          referrerPolicy="no-referrer"
          className="child-img "></motion.img>
        <motion.div
          layout
          transition={{
            duration: 0.5,
          }}
          className="child-div">
          <motion.p
            layout
            transition={{
              ease: 'easeInOut',
              duration: 0.3,
            }}
            className="_text-small _font-bold m-0">
            {username}
          </motion.p>
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="_text-xxsmall">
                {email}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
