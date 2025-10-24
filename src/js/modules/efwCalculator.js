export function initEFWCalculator(toolbar) {
  toolbar.addButton({
    icon: '<span style="font-size:18px;">EFW Calculator</span>',
    title: 'EFW Calculator',
    // toolbar.appendChild(button);
    onClick: (editor) => {
      showEFWPopup();
    }
  });
}

function showEFWPopup() {
  // Popup container बनाओ
  const popup = document.createElement("div");
  popup.innerHTML = `
    <div style="
      position: fixed; 
      top: 0; 
      left: 0; 
      right: 0; 
      bottom: 0; 
      background: rgba(0,0,0,0.5); 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      z-index: 9999;
    ">
      <div style="
        background: white; 
        padding: 20px; 
        border-radius: 8px; 
        width: 320px; 
        box-shadow: 0 2px 10px rgba(0,0,0,0.2); 
        display: flex; 
        flex-direction: column; 
        gap: 10px; 
        color: black;
      ">
        <h3 style="font-size: 18px; text-align:center; font-weight: bold; margin-bottom: 10px;">
          Estimated Fetal Weight (EFW) Calculator
        </h3>

        <label style="font-size:14px;">AC (Abdominal Circumference, cm):</label>
        <input type="number" id="efw-ac" placeholder="e.g. 30" 
          style="padding:6px; font-size:14px; border:1px solid #ccc; border-radius:4px; height: auto; width: auto;" />

        <label style="font-size:14px;">FL (Femur Length, cm):</label>
        <input type="number" id="efw-fl" placeholder="e.g. 7" 
          style="padding:6px; font-size:14px; border:1px solid #ccc; border-radius:4px; height: auto; width: auto;" />

        <label style="font-size:14px;">HC (Head Circumference, cm):</label>
        <input type="number" id="efw-hc" placeholder="e.g. 32" 
          style="padding:6px; font-size:14px; border:1px solid #ccc; border-radius:4px; height: auto; width: auto;" />

        <button id="efw-calc-btn" 
          style="padding:8px; cursor:pointer; background:#007bff; color:white; border:none; border-radius:5px; font-weight:bold;">
          Calculate
        </button>

        <button id="efw-close-btn" 
          style="padding:8px; cursor:pointer; background:#6c757d; color:white; border:none; border-radius:5px;">
          Close
        </button>

        <p id="efw-result" style="margin-top:10px; font-weight:bold; text-align:center; font-size:15px;"></p>
      </div>
    </div>
  `;

  document.body.appendChild(popup);

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
    const EFW = logEFW;

    document.getElementById("efw-result").innerText =
      "Estimated Fetal Weight: " + EFW.toFixed(2) + " grams";
  });
}
