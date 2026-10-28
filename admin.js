
<!DOCTYPE html>
<html lang="mr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel | आपला शेतकरी</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            background: #f1f8ef;
            padding: 20px;
            color: #26352a;
        }

        .admin-login,
        .dashboard {
            width: 520px;
            max-width: 100%;
            margin: 35px auto;
            background: white;
            padding: 28px;
            border-radius: 16px;
            box-shadow: 0 6px 22px rgba(0, 0, 0, 0.1);
        }

        .dashboard {
            display: none;
        }

        h1 {
            color: #198754;
            text-align: center;
            margin-bottom: 22px;
            font-size: 27px;
        }

        .subtitle {
            text-align: center;
            color: #68766b;
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin: 16px 0 7px;
            font-weight: bold;
        }

        input, select, textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #ccd7ce;
            border-radius: 8px;
            font-size: 16px;
            background: white;
        }

        button {
            width: 100%;
            padding: 13px;
            margin-top: 18px;
            background: #198754;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
        }

        button:hover {
            background: #146c43;
        }

        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .logout {
            background: #64756a;
        }

        #imagePreview {
            display: none;
            width: 200px;
            max-width: 100%;
            max-height: 200px;
            object-fit: contain;
            margin: 15px auto;
            border-radius: 10px;
        }

        #message {
            display: none;
            padding: 12px;
            margin-top: 16px;
            border-radius: 8px;
            overflow-wrap: anywhere;
        }

        .success {
            display: block !important;
            background: #d4edda;
            color: #155724;
        }

        .error {
            display: block !important;
            background: #f8d7da;
            color: #721c24;
        }

        .info {
            display: block !important;
            background: #cfe2ff;
            color: #084298;
        }

        .note {
            font-size: 13px;
            color: #68766b;
            line-height: 1.5;
            margin-top: 12px;
        }
    </style>
</head>

<body>

    <!-- ADMIN LOGIN -->
    <section class="admin-login" id="loginBox">
        <h1>🔐 Admin Login</h1>
        <p class="subtitle">आपला शेतकरी — Admin Panel</p>

        <form id="loginForm">
            <label for="username">Username</label>
            <input
                type="text"
                id="username"
                placeholder="Username"
                autocomplete="username"
                required
            >

            <label for="password">Password</label>
            <input
                type="password"
                id="password"
                placeholder="Password"
                autocomplete="current-password"
                required
            >

            <button type="submit">Login</button>
        </form>

        <p class="note">
            सूचना: हा साधा JavaScript login आहे. सार्वजनिक वेबसाइटसाठी
            सुरक्षित server-side authentication आवश्यक आहे.
        </p>
    </section>

    <!-- ADMIN DASHBOARD -->
    <section class="dashboard" id="dashboard">
        <h1>🌾 Admin Dashboard</h1>
        <p class="subtitle">Product ची माहिती भरा</p>

        <form id="productForm">

            <label for="productName">Product Name</label>
            <input
                type="text"
                id="productName"
                placeholder="उदा. टोमॅटो"
                required
            >

            <label for="productPrice">Price (₹)</label>
            <input
                type="number"
                id="productPrice"
                min="0"
                step="0.01"
                placeholder="उदा. 20"
                required
            >

            <label for="productStatus">Status</label>
            <select id="productStatus">
                <option value="Available">Available</option>
                <option value="Out Of Stock">Out Of Stock</option>
            </select>

            <label for="headline">Running Headline</label>
            <textarea
                id="headline"
                rows="3"
                placeholder="आज टोमॅटो, भेंडी आणि मिरची उपलब्ध आहे"
            ></textarea>

            <label for="productImage">Product Photo</label>
            <input
                type="file"
                id="productImage"
                accept="image/*"
            >

            <img id="imagePreview" alt="Product preview">

            <p class="note">
                नवीन फोटो निवडल्यास तो Cloudinary वर upload होईल.
                फोटो न निवडल्यास image URL रिकामी पाठवली जाईल.
            </p>

            <button type="submit" id="saveButton">
                Save Product
            </button>

            <button type="button" class="logout" id="logoutButton">
                Logout
            </button>
        </form>

        <div id="message" role="status" aria-live="polite"></div>
    </section>

<script>
"use strict";

/* LOGIN DETAILS */
const USERNAME = "aplashetkari";
const PASSWORD = "Farm@2026";

/* CLOUDINARY SETTINGS */
const CLOUD_NAME = "daaglsrnd";
const UPLOAD_PRESET = "apla_shetkari_upload";

/* GOOGLE APPS SCRIPT URL */
const API_URL =
    "https://script.google.com/macros/s/AKfycbwXgKn5ybby9qqj996vsCceM7v2I93gQHw8ga3Ev3BRIpGG3f44NWxtfYZWP_l32BlS/exec";

const loginBox = document.getElementById("loginBox");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("loginForm");
const productForm = document.getElementById("productForm");
const imageInput = document.getElementById("productImage");
const imagePreview = document.getElementById("imagePreview");
const saveButton = document.getElementById("saveButton");
const messageBox = document.getElementById("message");

/* SHOW MESSAGE */
function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.className = type;
}

/* LOGIN */
loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value;

    if (user === USERNAME && pass === PASSWORD) {
        loginBox.style.display = "none";
        dashboard.style.display = "block";
        messageBox.textContent = "";
        messageBox.className = "";
    } else {
        alert("Username किंवा Password चुकीचा आहे.");
    }
});

/* LOGOUT */
document.getElementById("logoutButton").addEventListener("click", function() {
    dashboard.style.display = "none";
    loginBox.style.display = "block";

    loginForm.reset();
    productForm.reset();

    imagePreview.removeAttribute("src");
    imagePreview.style.display = "none";

    messageBox.textContent = "";
    messageBox.className = "";
});

/* IMAGE PREVIEW */
imageInput.addEventListener("change", function() {
    const file = this.files[0];

    imagePreview.style.display = "none";
    imagePreview.removeAttribute("src");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        this.value = "";
        showMessage("कृपया image file निवडा.", "error");
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        this.value = "";
        showMessage("फोटोचा आकार 5 MB पेक्षा कमी असावा.", "error");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        imagePreview.src = event.target.result;
        imagePreview.style.display = "block";
    };

    reader.onerror = function() {
        showMessage("फोटो preview करता आला नाही.", "error");
    };

    reader.readAsDataURL(file);
});

/* UPLOAD IMAGE TO CLOUDINARY */
async function uploadImage() {
    const file = imageInput.files[0];

    if (!file) {
        return "";
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

/* SAVE PRODUCT */
productForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const priceText = document.getElementById("productPrice").value;
    const price = Number(priceText);
    const status = document.getElementById("productStatus").value;
    const headline = document.getElementById("headline").value.trim();

    if (!name) {
        showMessage("Product Name भरणे आवश्यक आहे.", "error");
        return;
    }

    if (priceText === "" || !Number.isFinite(price) || price < 0) {
        showMessage("कृपया योग्य Price टाक.", "error");
        return;
    }

    saveButton.disabled = true;
    saveButton.textContent = "Saving...";

    showMessage("माहिती Save होत आहे. कृपया थांब...", "info");

    try {
        const imageUrl = await uploadImage();

        const product = {
            name: name,
            price: price,
            status: status,
            headline: headline,
            image: imageUrl
        };

        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            throw new Error("Apps Script HTTP status: " + response.status);
        }

        const result = await response.json();

        if (result && result.success === true) {
            showMessage(
                "Save request यशस्वी झाली! Google Sheet मध्ये नोंद तपास.",
                "success"
            );

            productForm.reset();
            imagePreview.removeAttribute("src");
            imagePreview.style.display = "none";
        } else {
            showMessage(
                "Save अयशस्वी: " +
                (result?.message || "Apps Script ने यशस्वी response दिला नाही."),
                "error"
            );
        }

    } catch (error) {
        console.error("Product save error:", error);

        showMessage(
            "Save करताना अडचण आली: " +
            (error.message || "Unknown error") +
            ". Google Apps Script चा Code.gs तपासावा लागेल.",
            "error"
        );

    } finally {
        saveButton.disabled = false;
        saveButton.textContent = "Save Product";
    }
});
</script>

</body>
</html>
