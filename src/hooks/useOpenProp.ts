/**
 * Defines function that is triggered each time the given value is set to `true`.
 * The most common use case for this hook is to trigger a function on each component opening, as defined by component prop.
 */
import { useEffect } from 'react';

function useOpenProp(openProp: boolean | undefined, onOpen: () => void) {
    useEffect(() => {
        if (openProp) onOpen();
    }, [openProp]);
}

export default useOpenProp;
