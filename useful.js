//  Copyright 2018 SiLeader.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

"use strict";


class UsefulTimerBase {
    constructor() {
        this.timer = null;
    }

    run() {}

    startTimer(interval, forcestart=true) {
        if(this.timer) {
            if(!forcestart) return;
            this.stopTimer();
        }
        this.timer = setInterval(()=>{this.run();}, interval);
    }

    stopTimer() {
        if(!this.timer)return;
        clearInterval(this.timer);
        this.timer = null;
    }
}

class UsefulTimer extends UsefulTimerBase {
    constructor(clazz, func, argf=null) {
        super();

        this.dom = clazz;
        this.dofunc = func;
        this.argfunc = argf;
    }

    run() {
        const dom = document.getElementsByClassName(this.dom);
        for(const d of dom) {
            let args = [];
            if(this.argfunc) args = this.argfunc(d);
            if(typeof args !== typeof []) args = [args];
            this.dofunc(d, ...args);
        }
    }
}

class UsefulFetcher extends UsefulTimerBase {
    constructor(func, getQuery, fetch, parser=null) {
        super();

        this.func = func;
        this.query = getQuery;
        this.fetch = fetch;
        this.parser = parser;
        if(!parser) {
            this.parser = (json)=>{return json;};
        }
    }

    runImpl(data) {
        data = this.parser(data);
        if(!data)return;

        for(const datum of data) {
            const query = this.query(datum);
            const domlist = document.querySelector(query);
            for(const dom of domlist) {
                this.func(dom, datum);
            }
        }
    }

    run() {
        this.fetch((data)=>{this.runImpl(data);});
    }

}

