#API

- target(targetElement: Element) - sets target element
- dragStart(handler: (event: Event, state: any) => any) - sets dragStart handler
- drag(hander: (currentEvent: Event, dragStartEvent: Event, state: any) => any) - sets drag handler
- dragEnd(hander: (currentEvent: Event, dragStartEvent: Event, state: any) => any) - sets dragEnd handler
- listen() - adds event listeners to target element
- stop() - removes event listeners from target element
- persistentState(isPersistent: boolean) - sets state persistence flag, if it is true state saves between drags,
default value is false.

All methods of Dragger returns it's callee, so it makes chaining possible. Only target element should be
set before listening start, so all callbacks are optional. Calling setter methods in listen mode is not
recommended, if reassigning params is necessary, it's better to stop dragger before reassigning and invoke
listen method after it. Each drag handler receives state as last argument and it's return value is used
as nextState value. 

#Example:

```

const canvas = document.getElementById('box');
const circle = document.getElementById('ball');

const dragger = new Dragger()
    .target(canvas)
    .onDragStart(()=>{
        const originX = circle.getAttribute('x');
        const originY = circle.getAttribute('y');
        return {originX, originY};
    })
    .drag((e, {clientX, clientY}, state) =>{
        const dx = clientX - e.clientX;
        const dy = clientY - e.clientY;
        circle.setAttribute('x', state.originX + dx);
        circle.setAttribute('y', state.originY + dy);
        return state;
    })
    .listen();
```