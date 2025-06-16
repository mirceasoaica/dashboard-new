import { useRef } from "react";


const useWobbleAnimate = () => {
    const ref = useRef(null);
    const internalRef = useRef<any>(null);

    const wobble = () => {
        if(ref.current && !internalRef.current) {
            const element = ref.current as Element|null;

            element?.classList.add('animate-wobble');
            internalRef.current = setTimeout(() => {
                element?.classList.remove('animate-wobble');
                internalRef.current = null;
            }, 400);
        }
    }

    return {
        ref,
        wobble,
    }
}

export default useWobbleAnimate;