'use strict'

const request = require('request');
const co = require('co');
const deputyApiUrl = '/api/v1/resource/';

class Deputy {
  constructor(url, token) {
    if (!url || !token) throw new Error('You must enter a url and access token');

    this.url = url;
    this.token = token;
  }

  call(method, path, body, params, meta) {
    const fullPath = this.url + deputyApiUrl + path + meta;
    params = params || '';

    if (method === 'POST') {
      if (meta === '/QUERY') {
        return this._getAll(method, fullPath, body, params);
      }
      //return this._post(method, fullPath, params, postBody, contentType, path, body);
    } else {
      throw new Error('In development');
    }
  }

  _getAll(method, fullPath, body, params) {
    return co(function*() {
      let lastCount = 0;
      let totalCount = 0;
      let result;
      let fullResult = [];
      body.start = totalCount;

      while (true) {
        result = yield this._request(method, fullPath, params, body);
        fullResult.push(...result);
        lastCount = result.length;

        if (!lastCount) break;

        totalCount += lastCount;
        body.start = totalCount;
        console.log(body)
      }
      return fullResult;
    }.bind(this));
  }

  _request(method, fullPath, params, body, batch) {
    let batchLog = batch ? `batch ${batch.batchNo} of ${batch.batchCount}` : '';
    batchLog += batch && batch.subBatchNo ? `, sub-batch ${batch.subBatchNo} of ${batch.subBatchCount}` : '';
    const log = `${method} ${fullPath}${params} ${batchLog}`;
    console.log(log);

    const args = {
      url: fullPath,
      method: method,
      headers: {
        'Authorization': 'OAuth ' + this.token,
        'Content-Type': 'application/json',
        'Unixtime-Convert-Format': 'C'
      },
      qs: params,
      json: true,
      body: body
    };

    return new Promise((resolve, reject) => {
      request(args, function(err, response, body) {
        if (err) return reject(err);
        console.log(response)
          // console.log(response)
        body = (typeof body === 'string') ? JSON.parse(body) : body;
        resolve(body);
      });
    });
  }

}

module.exports = Deputy;
