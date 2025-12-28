// Auto-add slashes as the user types (dd/mm/yyyy format)
document.getElementById("i").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, ""); // allow only digits
  if (value.length > 8) value = value.slice(0, 8);

  let formatted = value;
  if (value.length >= 3 && value.length <= 4)
    formatted = value.slice(0, 2) + "/" + value.slice(2);
  else if (value.length >= 5 && value.length <= 6)
    formatted = value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4);
  else if (value.length >= 7)
    formatted = value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4, 8);

  e.target.value = formatted;
});

// Trigger calculation when pressing "Enter"
document.getElementById("i").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    fun();
  }
});

// Age calculation logic
function fun() {
  const input = document.getElementById("i").value.trim();
  const h = document.getElementById("h");
  const h2 = document.getElementById("h2");
  const extra = document.getElementById("extra");

  const pattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!pattern.test(input)) {
    alert("Please enter your DOB in dd/mm/yyyy format.");
    return;
  }

  const [day, month, year] = input.split("/").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  if (birthDate > today) {
    alert("Birth date cannot be in the future!");
    return;
  }

  let ageY = today.getFullYear() - birthDate.getFullYear();
  let ageM = today.getMonth() - birthDate.getMonth();
  let ageD = today.getDate() - birthDate.getDate();

  if (ageD < 0) {
    ageM--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    ageD += prevMonth.getDate();
  }

  if (ageM < 0) {
    ageY--;
    ageM += 12;
  }

  // Day of the week
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = days[birthDate.getDay()];

  // Display results
  h.innerHTML = `You are <span class='text-success fw-bold'>${ageY}</span> years, <span class='text-info fw-bold'>${ageM}</span> months, and <span class='text-warning fw-bold'>${ageD}</span> days old.`;
  h2.innerText = "You were born on a " + dayName;

  // Next birthday info
  const nextBirthday = new Date(today.getFullYear(), month - 1, day);
  if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);
  const diffDays = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
  extra.innerText = `Your next birthday is in ${diffDays} days 🎉`;

  // Age category alert
  if (ageY >= 18) alert("You are an Adult!");
  else if (ageY >= 13) alert("You are a Teenager!");
  else alert("You are a Child!");
}
