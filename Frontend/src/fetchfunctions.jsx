export async function fetchChat(message) {
  try {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    console.log(JSON.stringify({ message }));

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.response);
    return data.response || "No response from server."; // fallback if empty
  } catch (error) {
    console.error("Error fetching chat:", error);
    return "Sorry, I couldn't fetch a response."; // return a default message for UI
  }
}
