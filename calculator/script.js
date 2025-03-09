document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll("input[type='button']");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      const value = button.value;

      switch (action) {
        case "clear":
          display.value = "0";
          break;

        case "delete":
          display.value = display.value.slice(0, -1) || "0";
          break;

        case "calculate":
          try {
            display.value = new Function("return " + display.value)();
          } catch {
            display.value = "Error";
          }
          break;

        default:
          switch (value) {
            case "+":
            case "-":
            case "*":
            case "/":
              if (display.value === "" || ["+", "-", "*", "/"].includes(display.value.slice(-1))) {
                return;
              }
              display.value += value;
              break;

            case ".":
              const parts = display.value.split(/[\+\-\*\/]/);
              if (parts[parts.length - 1].includes(".")) return;
              display.value += value;
              break;

            default:
              display.value = display.value === "0" ? value : display.value + value;
          }
      }
    });
  });
});
