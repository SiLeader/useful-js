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
        this.__timer = null;
    }

    run() {}

    startTimer(interval, force_start=true) {
        if(this.__timer) {
            if(!force_start) return;
            this.stopTimer();
        }
        this.__timer = setInterval(this.run, interval);
    }

    stopTimer() {
        if(!this.__timer)return;
        clearInterval(this.__timer);
        this.__timer = null;
    }
}

class UsefulTimer extends UsefulTimerBase {
    constructor(dom_class, func, arg_f=null) {
        super();

        this.__class = dom_class;
        this.__do_func = func;
        this.__arg_func = arg_f;
    }

    run() {
        const dom = document.getElementsByClassName(this.__class);
        for(const d of dom) {
            let args = [];
            if(this.__arg_func) args = this.__arg_func(d);
            this.__do_func(d, ...args);
        }
    }
}

class UsefulFetcher extends UsefulTimerBase {
    constructor(func, getQuery, fetch, parser=null) {
        super();

        this.__func = func;
        this.__query = getQuery;
        this.__fetch = fetch;
        this.__parser = parser;
        if(!parser) {
            this.__parser = (json)=>{return json;};
        }
    }

    _runImpl(data) {
        data = this.__parser(data);
        if(!data)return;

        for(const datum of data) {
            const query = this.__query(datum);
            const dom_list = document.querySelector(query);
            for(const dom of dom_list) {
                this.__func(dom, datum);
            }
        }
    }

    run() {
        this.__fetch(this._runImpl);
    }

}

