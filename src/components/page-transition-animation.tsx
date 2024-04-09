import { motion } from "framer-motion";

export default function PageTransitionAnimation() {
  return (
    <>
      <motion.div
        className="fixed bottom-0 right-full top-0 z-50 flex h-full w-screen items-center justify-center bg-accent"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        exit={{ x: ["0%", "100%"], width: ["0%", "100%"] }}
      >
        <div className="h-24 w-24 sm:h-32 sm:w-32">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 10 10"
            className="fill-background"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.78711 3.17969L5 0.841797L9.74609 10H7.22656L3.78711 3.17969ZM4.6543 6.29688L2.77344 10H0.253906L3.42969 3.87109L4.6543 6.29688Z" />
          </svg>
        </div>
      </motion.div>
      <motion.div
        className="fixed bottom-0 right-full top-0 z-50 flex h-full w-screen items-center justify-center bg-accent"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
      >
        <div className="h-24 w-24 sm:h-32 sm:w-32">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 10 10"
            className="fill-background"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.78711 3.17969L5 0.841797L9.74609 10H7.22656L3.78711 3.17969ZM4.6543 6.29688L2.77344 10H0.253906L3.42969 3.87109L4.6543 6.29688Z" />
          </svg>
        </div>
      </motion.div>
    </>
  );
}
