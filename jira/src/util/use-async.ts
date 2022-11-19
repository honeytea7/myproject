import { useState } from 'react';
interface State<D>{
    error: Error | null;
    data: D | null;
    stat:'idle'|'loading'|'error'|'success'
}

const defaultInittalState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
 
}

export const useAsunc = <D>(initialState?: State<D>) => {
    const [state, setState] = useState<State<D>>({
        ...defaultInittalState,
        ...initialState
    })
}