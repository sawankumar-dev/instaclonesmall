class ApiResponse {
    constructor(statusCode, message, data=null) {
        this.success = statusCode < 300 ? true : false;
        this.message = message;
        this.data = data
    }
}
export default ApiResponse;