// Define a custom error class named ApiError that extends the built-in Error class
class ApiError extends Error {
    // Constructor to initialize the ApiError instance
    constructor(
        statusCode, // HTTP status code for the error
        message = "Something went wrong", // Default error message if not provided
        errors = [], // Array to hold any additional error details
        stack = "" // Stack trace for the error, if provided
    ) {
        super(message); // Call the parent class (Error) constructor with the message
        this.statusCode = statusCode; // Assign the status code to the instance
        this.data = null; // Initialize a data property as null
        this.message = message; // Assign the error message to the instance
        this.success = false; // Set a success flag to false (indicating an error)
        this.errors = errors; // This line should probably be: this.errors = errors;

        // If a stack trace is provided, assign it to the instance
        if (stack) {
            this.stack = stack;
        } else {
            // If no stack trace is provided, capture the current stack trace
            Error.captureStackTrace(this, this.constructor);
        }
    }
}



export {ApiError}