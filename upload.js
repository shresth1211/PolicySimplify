// upload.js

async function uploadPDF() {
  const fileInput = document.getElementById("pdf");

  if (!fileInput.files.length) {
    alert("Please select a PDF file first");
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]); // MUST be "file"

  try {
    const response = await fetch("http://127.0.0.1:5000/upload-pdf", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Something went wrong");
      return;
    }

    // Save backend result (REAL DATA)
    localStorage.setItem("resultData", JSON.stringify(data));

    // Redirect to result page
    window.location.href = "result.html";

  } catch (error) {
    console.error("Upload failed:", error);
    alert("Backend not reachable. Is the server running?");
  }
}
