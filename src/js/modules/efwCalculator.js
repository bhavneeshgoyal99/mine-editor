export function initEFWCalculator(toolbarElement) {
  // Button बनाओ toolbar में
  const button = document.createElement("button");
  button.className = "toolbar-button";
  button.innerHTML = "EFW Calculator";
  toolbarElement.appendChild(button);

  // Button पर click event
  button.addEventListener("click", () => {
    showEFWPopup();
  });
}

function showEFWPopup() {
  // Popup container बनाओ
  const popup = document.createElement("div");
  popup.className = "efw-popup";
  popup.innerHTML = `
    <div style="color: black;" class="efw-popup-content">
      <h3>Estimated Fetal Weight (EFW) Calculator</h3>
      <label>AC (Abdominal Circumference, cm):</label>
      <input type="number" id="efw-ac" placeholder="e.g. 30" />
      
      <label>FL (Femur Length, cm):</label>
      <input type="number" id="efw-fl" placeholder="e.g. 7" />
      
      <label>HC (Head Circumference, cm):</label>
      <input type="number" id="efw-hc" placeholder="e.g. 32" />

      <button id="efw-calc-btn">Calculate</button>
      <button id="efw-close-btn">Close</button>
      <p id="efw-result" style="margin-top:10px; font-weight:bold;"></p>
    </div>
  `;

  document.body.appendChild(popup);

  // Styling (basic)
  const style = document.createElement("style");
  style.innerHTML = `
    .efw-popup {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex; justify-content: center; align-items: center;
      z-index: 9999;
    }
    .efw-popup-content {
      background: white; padding: 20px; border-radius: 8px;
      width: 300px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      display: flex; flex-direction: column; gap: 10px;
    }
    .efw-popup-content input {
      padding: 5px; font-size: 14px;
    }
    .efw-popup-content button {
      padding: 8px; cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  // Close popup
  popup.querySelector("#efw-close-btn").addEventListener("click", () => {
    popup.remove();
  });

  // Calculate logic
  popup.querySelector("#efw-calc-btn").addEventListener("click", () => {
    const AC = parseFloat(document.getElementById("efw-ac").value);
    const FL = parseFloat(document.getElementById("efw-fl").value);
    const HC = parseFloat(document.getElementById("efw-hc").value);

    if (isNaN(AC) || isNaN(FL) || isNaN(HC)) {
      alert("Please enter all values!");
      return;
    }

    const logEFW = (1.326 - (0.00326 * (AC * FL))) + (0.0107 * HC) + (0.0438 * AC) + (0.158 * FL);
    // const EFW = Math.pow(10, logEFW);
    const EFW = logEFW;

    document.getElementById("efw-result").innerText =
      "Estimated Fetal Weight: " + EFW.toFixed(2) + " grams";
  });
}
