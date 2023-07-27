import { forEach } from "lodash";

export function submitAsForm({
  url,
  data,
  method = "post",
  target = "_blank",
}: {
  url: string;
  data?: any;
  method?: string;
  target?: string;
}): void {
  const form = document.createElement("form");
  form.setAttribute("action", url);
  form.setAttribute("method", method);
  form.style.display = "none";
  form.setAttribute("target", target);

  forEach(data, function (value, key) {
    createInput(form, key, value);
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

function createInput(form: HTMLFormElement, key: string, value: any): void {
  const input = document.createElement("input");
  input.setAttribute("type", "hidden");
  input.setAttribute("name", key);
  input.value = value;
  form.appendChild(input);
}
