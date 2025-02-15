import React from 'react'
import { motion } from "motion/react"

const LoadingScreen = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black">
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Glowing Ring */}
      <motion.div
        className="absolute w-24 h-24 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />

      {/* Glowing Text */}
      <motion.h1
        className="text-4xl font-bold text-blue-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Loading...
      </motion.h1>
    </motion.div>
  </div>
  )
}

export default LoadingScreen