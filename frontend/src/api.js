const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

export async function apiLogin(email, password) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
}

export async function apiSubmitForm(formData) {
  const res = await fetch(`${API_BASE_URL}/api/forms/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Form submission failed");
  }
  return data;
}

export async function apiUploadFiles(files) {
  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append("files", file);
  });

  const res = await fetch(`${API_BASE_URL}/api/files/upload`, {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "File upload failed");
  }
  return data;
}

export async function apiGetDelayedMessage(delayMs = 3000) {
  const res = await fetch(
    `${API_BASE_URL}/api/challenges/delayed-message?delayMs=${delayMs}`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Delayed endpoint error");
  }
  return data;
}

export async function apiGetFlakyResult() {
  const res = await fetch(`${API_BASE_URL}/api/challenges/flaky`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Flaky endpoint error");
  }
  return data;
}

export async function apiProtectedFormSubmit(token, payload) {
  const res = await fetch(`${API_BASE_URL}/api/forms/protected-submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || ""}`
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Protected form submission failed");
  }
  return data;
}
