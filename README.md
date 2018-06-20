useful-js
==========

&copy; 2018 SiLeader.

## Features
+ Support DOM operation.
  + Timer
  + Apply data
+ HTTP request
  + GET, POST, PUT, DELETE support
  + UsefulFetcher support

## License
Apache License 2.0

## Sample
### UsefulTimer
```javascript
const timer = new UsefulTimer(
        "x-link",
        (dom, a)=>{
            dom.innerHTML = a;
        },
        (dom)=>{
            const text = "" + dom.innerHTML;
            return text + " " + text;
        }
);
// run one time
timer.run();
// run 1000 ms interval
timer.startTimer(1000);

```

### UsefulFetcher and getGetFetcher
```javascript
const fetcher = new UsefulFetcher(
        (dom, a)=>{},
        (data)=>{return `${data["name"]}-${data["id"]}`;},
        getGetFetcher("https://github.com/api/v2/repos/show/SiLeader/useful-js")
);
// run one time
fetcher.run();
// run 1000 ms interval
fetcher.startTimer(1000);
```
