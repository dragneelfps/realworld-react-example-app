
export class ApiError {
  constructor(status, body) {
    this.status = status
    this.body = body
  }
  toString() {
    return JSON.stringify({ status: this.status, body: this.body })
  }
}

export class UnAuthorizedError {
  toString() {
    return "Unauthorized"
  }
}