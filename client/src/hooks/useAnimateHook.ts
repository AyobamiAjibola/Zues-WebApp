import { useInView } from 'react-intersection-observer';

export default function useAnimatedSection () {
    const [ref, inView] = useInView({
      triggerOnce: true, // Only trigger the animation once
      //threshold: 0.5, // Adjust this value to control when the animation starts
    });
  
    return [ref, inView];
};