# react-hooks-tutorial

## react hooks 예제 10가지

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

> number 버튼을 클릭했을 때만 sayHello() 실행


