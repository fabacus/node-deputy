'use strict'

const request = require('request');


class Deputy {
  constructor(url, token) {
    if (!url || !token) throw new Error('You must enter a url and access token');

    this.url = url;
    this.token = token;
    this.resources = [
      '/api/v1/resource/Address/',
      '/api/v1/resource/Category/',
      '/api/v1/resource/Company/',
      '/api/v1/resource/CompanyPeriod/',
      '/api/v1/resource/Contact/',
      '/api/v1/resource/Country/',
      '/api/v1/resource/CustomAppData/',
      '/api/v1/resource/CustomField/',
      '/api/v1/resource/CustomFieldData/',
      '/api/v1/resource/Employee/',
      '/api/v1/resource/EmployeeAgreement/',
      '/api/v1/resource/EmployeeAgreementHistory/',
      '/api/v1/resource/EmployeeAppraisal/',
      '/api/v1/resource/EmployeeAvailability/',
      '/api/v1/resource/EmployeeHistory/',
      '/api/v1/resource/EmployeePaycycle/',
      '/api/v1/resource/EmployeePaycycleReturn/',
      '/api/v1/resource/EmployeeRole/',
      '/api/v1/resource/EmployeeSalaryOpunitCosting/',
      '/api/v1/resource/EmployeeWorkplace/',
      '/api/v1/resource/EmployeeCondition/',
      '/api/v1/resource/EmployeeContract/',
      '/api/v1/resource/EmploymentContractLeaveRules/',
      '/api/v1/resource/Event/',
      '/api/v1/resource/Geo/',
      '/api/v1/resource/Journal/',
      '/api/v1/resource/Kiosk/',
      '/api/v1/resource/KpiBudget/',
      '/api/v1/resource/KpiEntry/',
      '/api/v1/resource/KpiShiftReport/',
      '/api/v1/resource/Leave/',
      '/api/v1/resource/LeavePayLine/',
      '/api/v1/resource/LeaveRules/',
      '/api/v1/resource/Memo/',
      '/api/v1/resource/Noticeboard/',
      '/api/v1/resource/OperationalUnit/',
      '/api/v1/resource/OpunitKpiMetricConfig/',
      '/api/v1/resource/PayPeriod/',
      '/api/v1/resource/PayRules/',
      '/api/v1/resource/Roster/',
      '/api/v1/resource/RosterOpen/',
      '/api/v1/resource/SalesData/',
      '/api/v1/resource/Schedule/',
      '/api/v1/resource/SmsLog/',
      '/api/v1/resource/State/',
      '/api/v1/resource/SystemUsageBalance/',
      '/api/v1/resource/SystemUsageTracking/',
      '/api/v1/resource/Task/',
      '/api/v1/resource/TaskGroup/',
      '/api/v1/resource/TaskGroupSetup/',
      '/api/v1/resource/TaskOpunitConfig/',
      '/api/v1/resource/TaskSetup/',
      '/api/v1/resource/Timesheet/',
      '/api/v1/resource/TimesheetPayReturn/'
    ];

    this._buildFunctions();
  }

  _buildFunctions() {

    for (let resource of this.resources) {

      this['get' + resource.split('/')[4]] = function(id) {
        return id ? this._getObject(resource + id) : this._getObject(resource);
      }

      // this['update' + resource.split('/')[4]] = function(updateObject, id) {
      //   return id ? this._updateObject(updateObject, resource + id) : throw new Error('missing id for update');
      // }

      // this['insert' + resource.split('/')[4]] = function(insertObject, id) {
      //   return id ? this._insertObject(insertObject, resource + id) : throw new Error('missing orderObject');
      // }

      this['getAll' + resource.split('/')[4]] = function(parameters) {
        parameters = parameters || {};
        parameters.format = parameters.format || 'json';
        parameters.limit = parameters.limit || 0;
        return this._getObject(resource, parameters);
      }
    }
  }

  // _insertObject(object, resourceUrl) {

  //   object.created_by = object.created_by || this.enterpriseUserUri;
  //   var callUrl = this.endpoint + resourceUrl;

  //   var args = {
  //     method: 'POST',
  //     url: callUrl,
  //     body: JSON.stringify(object),
  //     format: 'json',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "API-AUTHENTICATION": this.apiKey + ":" + this.apiSecret
  //     },

  //   }
  //   return new Promise((resolve, reject) => {
  //     request(args, function(error, response, body) {

  //       if (Buffer.isBuffer(body)) {
  //         reject(
  //           new Error('something went wrong with the API call \n Request method: POST \n URL: ' + args.url + '\n data: \n ' + body.toString())
  //         );
  //       }

  //       if ((typeof body) == 'string') {
  //         body = JSON.parse(body);
  //       }

  //     })

  //   });

  // }


  _getObject(resource_uri, parameters) {

    // parameters = parameters || { format: "json" };

    const callUrl = this.url + resource_uri;

    const args = {
      url: callUrl,
      // qs: parameters,
      method: 'GET',
      headers: {
        'Authorization': 'OAuth ' + this.token,
      }
    };

    return new Promise((resolve, reject) => {
      request(args, function(error, responses, body) {
        console.log(error, responses, body)

        if (error) {
          return reject(error)
        }
        resolve(body);
      });
    })
  }

  // _updateObject(object, resource_uri) {

  //   object.resource_uri = resource_uri || object.resource_uri;

  //   var callUrl = this.endpoint + object.resource_uri;

  //   //callUrl = "https://huntsman.revelup.com/resources/Customer/";

  //   var args = {
  //     url: callUrl,
  //     body: JSON.stringify(object),
  //     method: 'PATCH',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "API-AUTHENTICATION": this.apiKey + ":" + this.apiSecret
  //     }
  //   };


  //   return new Promise((resolve, reject) => {
  //     request(args, function(error, responses, body) {

  //       if ((typeof body) == 'string') {
  //         body = JSON.parse(body);
  //       }

  //     });
  //   })
  // }

}



module.exports = Deputy;
