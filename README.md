# react-hooks-tutorial

## react hooks 예제 10가지
## react hooks가 개발 된 이유
1. 클래스 컴포넌트는 로직들을 재사용하기 어렵다.
2. 구현한 Lifecycle 메소드들에 관련이 없는 로직들이 포함되곤 한다.
3. 클래스는 컴퓨터와 인간 모두에게 이해하기 어려운 개념이다.

## useState(초기값)

**현재 state 값과 state 업데이트 할 수 있는 함수를 반환 하며, 초기 State 값을 받는다.<br>
const [state, setState] = useState(initialState);**<br>

```js
const App = () => {
  /** useState */
  const [item, setItem] = useState(3);
  const inc = () => setItem(item + 1);
  const dec = () => setItem(item - 1);

  return (
    <div className="App">
      <h1>Hello {item}</h1>
      <button onClick={inc}>increment</button>
      <button onClick={dec}>decrement</button>
    </div>
  );
};
```

---

### useInput(초기값): 기본적으로 input을 업데이트함 (custom)

```js
const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    console.log(event.target); // 값이 바뀔 때 마다 출력
  }
  return { value, onChange };
};

const name = useInput("Mr. Jay");

<input placeholder="Name" value={name.value} onChange={name.onChange} />

shortcut-->

<input placeholder="Name" {...name} >
```

### add validator in useInput

```js
const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    let willUpdate = true;

    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

const maxLen = (value) => value.length <= 10;

const name = useInput("Mr. ", maxLen);
return (
  <div className="App">
    <h1>Hello</h1>
    <input placeholder="Name" {...name} />
  </div>
);
```

---
___

## useEffect(function, []:리스트에 있는 값일때만 값이 변하도록 활성화됨) like componentDidmount

### 컴포넌트가 렌더링 된 이후에(DOM 업데이트) 수행하고 컴포넌트 내부에 둔다. 렌더링 이후 매번 수행된다. 

```js
const sayHello = () => console.log("hello");
const [number, setNumber] = useState(0);
const [aNumber, setAnumber] = useState(0);

useEffect(sayHello, []); // basic
useEffect(sayHello, [number]);
// number를 클릭했을 때만 sayHello 실행
```

```html
<div className="App">
      <div>Hi</div>
      <button onClick={() => setNumber(number + 1)}>number: {number}</button>
      <button onClick={() => setAnumber(aNumber + 1)}>aNumber: {aNumber}</button>
    </div>
```

___

## useTitle: 문서의 제목을 업데이트 시켜주기

```js
const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  // title이 업데이트되면 updateTitle 호출
  
  return setTitle;
};

const App = () => {
  const titleUpdater = useTitle("Loading...");
  setTimeout(() => { titleUpdater("welcome home") }, 2000)
  return <div className="App"></div>;
};

```
Loading... -> welcome home
___

## useRef: 엘리먼트의 Reference (like getElementById)
```js
import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const inputref = useRef(); // like getElementById
  setTimeout(() => {
    console.log(inputref.current); // <input placeholder="la">
  }, 2000);
  return (
    <div className="App">
      <div>hi</div>
      <input ref={inputref} placeholder="la" />
    </div>
  );
};
```

___

## useClick: 클릭이벤트를 제어
```js

 // ref + 기능이 들어가있는 함수
const useClick = (onClick) => {
  // if (typeof onClick !== "function") {
  //   return;
  // }

  const element = useRef();
  useEffect(() => { // 컴포넌트가 마운트 되었을 때 (like componentDidMount) 실행
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    /**
     * componentWillUnMount 됐을 때 이벤트리스너 제거
     * component가 mount되지않았을 때 이벤트리스너가 배치되지 않게 하기위해서
     */
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []); // no defendencies
  return element;
};

const App = () => {
  const sayHello = () => console.log("say hello");
  const title = useClick(sayHello);
  return (
    <div className="App">
      <h1 ref={title}> Hi </h1> 
      {/* id 같이 ref를 부여함 */}
    </div>
  );
};

```

## confirm 만들기 (함수형 프로그래밍 예제 no hooks)
```js
const useConfirm = (message = "", onConfirm, onCancel) => {
  /** 유효성 검사 */
  if (!onConfirm && typeof callback !== "function") {
    return;
  }
  /** 유효성 검사 */
  if (onCancel && typeof onCancel !== "function") {
    return;
  }

  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  };
  return confirmAction;
};
const App = () => {
  const deleteWorld = () => console.log("Deleting the world......");
  const abort = () => console.log("Aborted");
  const confirmDelete = useConfirm("Are you sure?", deleteWorld, abort);
  return (
    <div className="App">
      <button onClick={confirmDelete}>Delete the world</button>
    </div>
  );
};
```

___

## usePreventLeave: window 닫을 때 저장하지 않음을 알리는 기능 (no hooks)
```js
const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };
  /** beforeUnload: window가 닫히기전에 function이 실행되는것을 허락함 */
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () =>
    window.removeEventListener("beforeunload", listener);

  return { enablePrevent, disablePrevent };
};

const App = () => {
  const { enablePrevent, disablePrevent } = usePreventLeave();
  return (
  <div className="App">
    <button onClick={enablePrevent}>Protect</button>
    <button onClick={disablePrevent}>UnProtect</button>
  </div>
  )
};

```

___

## useBeforeLeave: 페이지를 벗어날 때 notice (useEffect)
```js
const useBeforeLeave = (onBefore) => {
  // if (typeof onBefore !== "function") {
  //   return;
  // }

  const handle = (event) => {
    const { clientY } = event;
    if (clientY <= 0) { // 마우스를 위쪽으로 벗어나면 작동
      onBefore();
    }
  };

  useEffect(() => {
    document.addEventListener("mouseleave", handle);
    return () => document.removeEventListener("mouseleave", handle);
  }, []); // 한번만 이벤트리스너가 추가되도록 [] 추가
};

const App = () => {
  const begForLife = () => console.log("please dont leave...");
  useBeforeLeave(begForLife);
  return (
    <div className="App">
      <h1>hi</h1>
    </div>
  );
};
```

___

## useFadeIn: 애니메이션 추가
```js

const useFadeIn = (duration = 1, delay = 0) => {
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      const { current } = element;
      current.style.opacity = 1;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
    }
  }, []);
  return { ref: element, style: { opacity: 0 } };
};

const App = () => {
  const fadeInH1 = useFadeIn(1, 2);
  const fadeInP = useFadeIn(3, 5);
  return (
    <div className="App">
      <h1 {...fadeInH1}>hi</h1>
      <p {...fadeInP}> lalalalalala</p>
    </div>
  );
};

```

___

## useNetwork: navigator가 online또는 offline이 되는것을 막아주기

```js

const useNetwork = (onChange) => {
  const [status, setStatue] = useState(navigator.onLine);
  const handleChange = () => {
    if (typeof onChange === "function") {
      onChange(navigator.onLine);
    }
    setStatue(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);

    window.removeEventListener("online", handleChange);
    window.removeEventListener("offline", handleChange);
  }, []);
  return status;
};

const App = () => {
  const handleNeyworkChange = (online) => {
    console.log(online ? "We Just went Online" : "We are offline");
  };
  const onLine = useNetwork(handleNeyworkChange);
  return (
    <div className="App">
      <h1>{onLine ? "Online" : "Offline"}</h1>
    </div>
  );
};

```

___

## useNotification: 알람을 실행해주는 기능
```js
const useNotification = (title, options) => {
  // if (!("Notification" in window)) {
  //   return;
  // }
  const fireNotif = () => {
    if (Notification.permission !== "granted") {
      // notification 권한요청
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") { // 허용했을 때
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      new Notification(title, options);
    }
  };
  return fireNotif;
};

const App = () => {
  const triggerNotif = useNotification("can I steel your kimchi?", {
    body: "i love js",
  });
  return (
    <div className="App">
      <button onClick={triggerNotif}>hello</button>
    </div>
  );
};
```

___

## useAxios: axios 통신 기능

```js
in useAxios.js

import defaultAxios from "axios";
import { useState, useEffect } from "react";

const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null
  });

  useEffect(() => {
    axiosInstance(opts)
      .then((data) => {
        setState({
          ...state,
          loading: false,
          data
        });
      })
      .catch((error) => {
        setState({
          ...state,
          loading: false,
          error
        });
      });
  });
  return state;
};


in index.js

import useAxios from "./useAxios.js";

const App = () => {
  const { loading, data, error } = useAxios({
    url:
      "https://cors-anywhere.herokuapp.com/https://yts.am/api/v2/list_movies.json"
  });
  console.log(
    `Loading: ${loading}\n 
    Error: ${error}\n  
    data: ${JSON.stringify(data)}`
  );
  return (
    <div className="App">
      <h1>hello</h1>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);


export default useAxios;


```