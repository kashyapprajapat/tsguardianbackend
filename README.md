# 🚀 TS Guardian Backend

TS Guardian Backend is an AI-powered TypeScript code analysis tool that detects errors, suggests improvements, and provides best practices for TypeScript development.

## 📌 Features
- 🔎 **Code Analysis**: Identifies syntax errors, type mismatches, and runtime issues.
- 🛠 **Optimization Suggestions**: Recommends improvements for readability, maintainability, and performance.
- 🚀 **Best Practices**: Ensures TypeScript code follows modern standards.
- 🔒 **Security Checks**: Highlights potential security risks and edge cases.

---

## 🛠 Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/kashyapprajapat/tsguardianbackend.git
cd tsguardianbackend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Create an .env File
Rename .sample.env to .env and add your API key:
```sh
GEMINI_API_KEY=your_api_key_here
PORT=7777
```

### 4️⃣ Run the Application
Development Mode (with hot reload)
```sh
npm run dev
```

### Production Mode
```sh
npm start
```

---

🐳 Running with Docker
1️⃣ Build the Docker Image
```sh
docker build -t tsguardian-backend .
```

2️⃣ Run the Docker Container
```sh
docker run -p 7777:7777 --env-file .env tsguardian-backend
```

---

### 📡 API Endpoints
## 🏠 Home Route
# GET /
Displays an HTML page with API details.

## 🧠 Analyze Code
# POST /analyze-code
Request Body (JSON)
```sh
{
  "code": "const a: number = 'hello';"
}
```

---
### 🤝 Contributing
1️⃣ Fork the repo
2️⃣ Create a new branch (git checkout -b feature-name)
3️⃣ Commit changes (git commit -m "Added feature")
4️⃣ Push the branch (git push origin feature-name)
5️⃣ Open a pull request

## Thank you. ☕🧋