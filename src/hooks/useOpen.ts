/**
 * Returns a value that represents a component's open/closed state. Additionally returns `doOpen` and `doClose` functions that can be used to toggle the state.
 */
import { useEffect } from 'react';
import useBoolean from './useBoolean';

function useOpen(onOpen: () => void) {
    const [open, doOpen, doClose] = useBoolean();

    useEffect(() => {
        if (open) onOpen();
    }, [open]);

    return [open, doOpen, doClose] as const;
}

export default useOpen;
