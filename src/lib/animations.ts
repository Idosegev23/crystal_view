export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 60
  },
  animate: {
    opacity: 1,
    y: 0
  },
  transition: {
    duration: 0.8,
    ease: "easeOut"
  }
};

export const fadeInLeft = {
  initial: {
    opacity: 0,
    x: -60
  },
  animate: {
    opacity: 1,
    x: 0
  },
  transition: {
    duration: 0.8,
    ease: "easeOut"
  }
};

export const fadeInRight = {
  initial: {
    opacity: 0,
    x: 60
  },
  animate: {
    opacity: 1,
    x: 0
  },
  transition: {
    duration: 0.8,
    ease: "easeOut"
  }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const staggerItem = {
  initial: {
    opacity: 0,
    y: 40
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const hoverScale = {
  whileHover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  whileTap: {
    scale: 0.95
  }
};

export const parallaxY = {
  initial: {
    y: 0
  },
  animate: {
    y: -50,
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
};