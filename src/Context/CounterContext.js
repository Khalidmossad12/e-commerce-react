const { createContext, useState } = require("react");

export let CounterContext = createContext()

export default function CounterContextProvider(props) {
    
    const [counter, setCounter] = useState(0);
    const [userName, setUserName] = useState('');

    function ChangeCounter() {
        setCounter(Math.random())
    }

    return <CounterContext.Provider  value={{counter , userName ,ChangeCounter }}>
        {props.children}
    </CounterContext.Provider>
}