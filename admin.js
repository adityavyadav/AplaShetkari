
"use strict";

// AplaShetkari Admin Panel JavaScript
// This file can be connected from admin.html.

const AplaAdmin = (() => {
    const CLOUD_NAME = "daaglsrnd";
    const UPLOAD_PRESET = "apla_shetkari_upload";

    const API_URL =
        "https://script.google.com/macros/s/AKfycbwXgKn5ybby9qqj996vsCceM7v2I93gQHw8ga3Ev3BRIpGG3f44NWxtfYZWP_l32BlS/exec";

    async function uploadProductImage(file) {
        if (!file) {
            return "";
        }

        if (!file.type.startsWith("image/")) {
            throw new Error("कृपया image file निवडा.");
        }

        if (file.size > 5 * 1024 * 1024) {
            throw new Error("फोटोचा आकार 5 MB पेक्षा कमी असावा.");
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (!response.ok || !data.secure_url) {
            throw new Error(
                data.error?.message || "Cloudinary upload अयशस्वी झाला."
            );
        }

        return data.secure_url;
    }

    async function saveProduct(product) {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            throw new Error("Google Apps Script request अयशस्वी झाली.");
        }

        const result = await response.json();

        if (!result || result.success !== true) {
            throw new Error(
                result?.message || "Product save झाल्याची खात्री मिळाली नाही."
            );
        }

        return result;
    }

    return {
        uploadProductImage,
        saveProduct
    };
})();

// Other scripts can use window.AplaAdmin.
window.AplaAdmin = AplaAdmin;
