import { useState } from 'react';

export const TestComponent = () => {
    const [count, setCount] = useState(0);
    return <div>{count}</div>;
};
