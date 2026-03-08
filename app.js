async function generateSlides() {

  const topic = document.getElementById("topic").value;

  const prompt = `Create 5 presentation slides about ${topic}.
For each slide include:
- Slide title
- 3 bullet points

Return the result in JSON format like this:
{
 "slides":[
   {"title":"", "points":["","",""]}
 ]
}`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_OPENROUTER_API_KEY"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  const text = data.choices[0].message.content;

  const slides = JSON.parse(text).slides;

  const container = document.getElementById("slides");
  container.innerHTML = "";

  slides.forEach(slide => {

    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${slide.title}</h3>
      <ul>
        ${slide.points.map(p => `<li>${p}</li>`).join("")}
      </ul>
      <hr>
    `;

    container.appendChild(div);

  });

}
