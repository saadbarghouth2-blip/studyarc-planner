import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MotionWrapper({children, location}){
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={location.pathname} initial={{opacity:0, y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:0.36}}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
