const input = document.getElementById("search-input");
const button = document.getElementById("search-button");

const nameEl = document.getElementById("creature-name");
const idEl = document.getElementById("creature-id");
const weightEl = document.getElementById("weight");
const heightEl = document.getElementById("height");
const typesEl = document.getElementById("types");
const hpEl = document.getElementById("hp");
const atkEl = document.getElementById("attack");
const defEl = document.getElementById("defense");
const satkEl = document.getElementById("special-attack");
const sdefEl = document.getElementById("special-defense");
const spdEl = document.getElementById("speed");

button.addEventListener("click", async () => {
  const q = input.value.trim();
  if (!q) return;

  try {
    const res = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${q.toLowerCase()}`);
    if (!res.ok) throw new Error();

    const data = await res.json();


    nameEl.textContent = data.name.toUpperCase();
    idEl.textContent = `#${data.id}`;
    weightEl.textContent = `Weight: ${data.weight}`;
    heightEl.textContent = `Height: ${data.height}`;

    
    typesEl.innerHTML = "";
    data.types.forEach(typeObj => {
      const t = typeObj.name.toUpperCase();
      const span = document.createElement("span");
      span.className = "type";
      span.textContent = t;
      typesEl.appendChild(span);
    });

   
    const stat = name => data.stats.find(s => s.name === name).base_stat;
    hpEl.textContent = stat("hp");
    atkEl.textContent = stat("attack");
    defEl.textContent = stat("defense");
    satkEl.textContent = stat("special-attack");
    sdefEl.textContent = stat("special-defense");
    spdEl.textContent = stat("speed");

  } catch {
    alert("Creature not found");
    [nameEl, idEl, weightEl, heightEl, hpEl, atkEl, defEl, satkEl, sdefEl, spdEl].forEach(el => el.textContent = "");
    typesEl.innerHTML = "";
  }
});
