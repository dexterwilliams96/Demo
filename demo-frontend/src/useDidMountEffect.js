import { useEffect, useRef } from 'react';

const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    // eslint-disable-next-line
    }, deps);
}

export default useDidMountEffect;

//https://stackoverflow.com/questions/53253940/make-react-useeffect-hook-not-run-on-initial-render