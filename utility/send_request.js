class send_request {
  /**
   * @author Ankush Khotpal
   * @description Creates a new SendMsg instance
   * @param {string} rquest method for SMSW.co.in
   * @param {string} url end path for SMSW.co.in
   * @param {string} params for request for SMSW.co.in
   *
   */
  static sendRequest(method, path, params, callback) {
    if (typeof params === "function") {
      callback = params;
      params = {};
    }
    // Return promise if no callback is passed and promises available
    else if (callback === undefined && this.allow_promise) {
      promise = true;
    }

    let options = {
      method: method,
      url: SendMsg.getBaseURL() + path,
    };

    if (method === "get") {
      options.qs = params;
    }

    // Pass form data if post
    if (method === "post") {
      let formKey = "form";

      if (typeof params.media !== "undefined") {
        formKey = "formData";
      }
      options[formKey] = params;
    }

    request(options, function (error, response, data) {
      // request error
      if (error) {
        return callback(error, data);
      }

      // JSON parse error or empty strings
      try {
        // An empty string is a valid response
        if (data === "") {
          data = {};
        } else {
          data = JSON.parse(data);
        }
      } catch (parseError) {
        return callback(
          new Error(
            "JSON parseError with HTTP Status: " +
              response.statusCode +
              " " +
              response.statusMessage
          ),
          data
        );
      }

      // response object errors
      // This should return an error object not an array of errors
      if (data.errors !== undefined) {
        return callback(data.errors, data);
      }

      // status code errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        return callback(
          new Error(
            "HTTP Error: " + response.statusCode + " " + response.statusMessage
          ),
          data
        );
      }
      // no errors
      callback(null, data);
    });
  }
}

module.exports = send_request;
