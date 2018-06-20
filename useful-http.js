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

function __responseFunction(req, callback) {
    return ()=>{
        if(req.readyState === 4) {
            if(req.status === 200 || req.status === 201) {
                if(callback) {
                    let resText = req.responseText;
                    if(/application\/json/i.match(req.getResponseHeader("Content-Type"))) {
                        resText = JSON.parse(resText);
                    }
                    callback(false, resText);
                }
            }else{
                if(callback) callback(true, null);
            }
        }
    };
}

function __httpBase(method, callback, url, body=null, header={}) {
    const req = new XMLHttpRequest();

    req.onreadystatechange = __responseFunction(req, callback);
    req.open(method, url, true);
    for(const h in header) {
        req.setRequestHeader(h, header[h]);
    }
    req.send(body);
}

function GET(url, callback, header={}) {
    __httpBase("GET", callback, url, null, header);
}

function POST(url, body, callback, header={"Content-Type": "application/json"}) {
    __httpBase("POST", callback, url, body, header);
}

function PUT(url, body, callback, header={"Content-Type": "application/json"}) {
    __httpBase("PUT", callback, url, body, header);
}

function DELETE(url, callback, header={}) {
    __httpBase("DELETE", callback, url, null, header);
}

function getGetFetcher(url, header={}) {
    return (callback)=>{
        GET(
            url,
            (err, data)=>{
                if(err)return;
                callback(data);
            },
            header
        );
    };
}

function getPostFetcher(url, body, header={}) {
    return (callback)=>{
        POST(
            url,
            body,
            (err, data)=>{
                if(err)return;
                callback(data);
            },
            header
        );
    };
}

function getPostFetcher(url, body, header={}) {
    return (callback)=>{
        PUT(
            url,
            body,
            (err, data)=>{
                if(err)return;
                callback(data);
            },
            header
        );
    };
}

function getGetFetcher(url, header={}) {
    return (callback)=>{
        DELETE(
            url,
            (err, data)=>{
                if(err)return;
                callback(data);
            },
            header
        );
    };
}
