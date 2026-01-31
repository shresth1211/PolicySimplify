// browse.js

function viewResult(schemeName) {
  // Dummy scheme data
  const schemes = {
    pm: {
      title: "PM Scholarship Scheme",
      eligibility: "College students",
      benefits: "₹30,000 – ₹50,000",
      documents: "Aadhaar, College ID",
      deadline: "30 March 2024"
    },
    merit: {
      title: "Merit-cum-Means Scholarship",
      eligibility: "Minority students",
      benefits: "₹25,000 per year",
      documents: "Income Certificate, Marksheet",
      deadline: "25 March 2024"
    }
  };

  localStorage.setItem(
    "resultData",
    JSON.stringify(schemes[schemeName])
  );

  window.location.href = "result.html";
}