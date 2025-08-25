"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseNestedJson = (data) => {
    if (typeof data === 'string') {
        try {
            return JSON.parse(data); // Parse JSON strings
        }
        catch (_a) {
            return data; // Return as is if parsing fails
        }
    }
    else if (typeof data === 'object' && data !== null) {
        // Recursively parse nested objects or arrays
        for (const key in data) {
            data[key] = parseNestedJson(data[key]);
        }
        return data;
    }
    else {
        return data; // Return as is for other data types
    }
};
exports.default = parseNestedJson;
