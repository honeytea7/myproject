import React, { useCallback, useState } from 'react'

export default function useUndo<T>(initialPresent: T) {
    const [state, setState] = useState<{
        past: T[],
        present: T,
        future: T[]
    }>({
        past: [],
        present: initialPresent,
        future: []
    })



    const canUndo = state.past.length !== 0
    const canRedo = state.future.length !== 0
    

    const undo = useCallback(() => {
        return setState((currentState) => {
            const { past, future, present } = currentState
            if (past.length === 0) return currentState
          const newpresent = past[past.length - 1]
          const newPast = past.slice(0, past.length - 1)
          const newfuture = [present, ...future]
            
            return {
                past: newPast,
                future: newfuture,
                present:newpresent
            }
            
        })
    }, [])
    


    const redo = useCallback(() => {
        setState(currentState => {
            if (currentState.future.length === 0) return 
            const { future, past, present } = currentState
           const newpresent=future[0]
           const newfuture = future.splice(1)
            const newPast = [...past, present]
            return {
                past: newPast,
                present: newpresent,
                future:newfuture
            }
        })
    },[])

    const set = useCallback((newPresent: T) => {
        setState((currentState) => {
            const { future, past, present } = currentState
            if (newPresent === present) {
                return currentState
            }

            return {
                present: newPresent,
                past: [...past, present],
                future:[]
            }
        })
    },[])


    const reset = useCallback((newPresent:T) => {
        setState(() => {
            return {
                past: [],
                present:newPresent ,
                future:[]
        }
    })
    }, [])
    
return[state,{set,reset,undo,redo,canUndo,canRedo}]

    
} 

