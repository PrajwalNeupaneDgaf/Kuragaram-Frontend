import { motion } from 'motion/react'
import React from 'react'
import Layout from '../Layouts/Layout'

const Waiting = () => {
  return (
    <Layout>
        <div className='h-[100vh] w-full flex justify-center items-center'>
            <motion.div
            className="absolute w-24 h-24 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <div>
            Waiting To Accept ...
        </div>
        </div>
    </Layout>
  )
}

export default Waiting