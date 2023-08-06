export const apiFetchData = (address, method, body) => {
  return new Promise((resolve, reject) => {
    let headers = {
      TicketKey: "", //SessionState.ticketKey,
    };

    if (method === "GET") {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    } else if (method === "POST") {
      headers["Content-Type"] = "application/json";
    }

    let request = {
      method: method,
      headers: headers,
      mode: "cors",
      cache: "default",
      //credentials: "include",
    };

    if (body) {
      request.body = JSON.stringify(body);
    }

    let rootAddress = "https://localhost:7142";
    fetch(`${rootAddress}/${address}`, request)
      .then((res) => {
        if (res.ok) {
          res
            .json()
            .then((jsonData) => {
              resolve(jsonData);
            })
            .catch((err) => {
              reject(err);
            });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
