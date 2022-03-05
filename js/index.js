const order = document.querySelector("form");
const article = document.querySelector(".article-container");

order.addEventListener("submit", parseForm);

function parseForm(event) {
    event.preventDefault();

    const form = new FormData(event.target);
    const value = Object.fromEntries(form.entries());
    article.innerHTML = printObject(value);
}

function printObject(object) {
    let objectToString = "";
    let orderInfo = [
        ["client-type", "Client type"],
        ["delivery-type", "Delivery type"],
        ["name", "Name"],
        ["sname", "Surname"],
        ["phone", "Phone"],
        ["email", "E-mail"],
        ["street", "Street"],
        ["postnr", "Postnr"],
        ["town", "Town"],
        ["login", "Login"],
        ["pass", "Password"],
        ["info", "Additional info"]];

    orderInfo.forEach(element => {
        objectToString += `<tr>
            <td class="field-name">
                ${element[1]}:
            </td>
            <td>
                ${printSummary(element[0].toString(), object)}
            </td>
        </tr>`;
    });

    return `
    <h1>Order summary</h1>
    <div><table class="summary">
        ${objectToString}
    </table></div>
    `;
}

function printSummary(element, object) {
    if (element !== "info" && element !== "pass") {
        return object[element];
    }
    else if (element === "pass") {
        return "**********";
    }
    else if (element === "info") {
        let specialField = object.info;
        while (specialField.search(/\n/) !== -1) {
            specialField = specialField.replace(/\n/, "<br>");
        }
        return specialField;
    }
}